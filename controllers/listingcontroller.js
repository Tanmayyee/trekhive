import Listing from '../models/trekhiveschema.js';
import { cloudinary } from '../cloudinary/index.js';

import * as maptilerClient from "@maptiler/client";

export const index= async(req,res)=>{
 const listings= await Listing.find({})
 res.render('places/index',{listings})
}

export const renderNewForm= async(req,res)=>{           //new should come before /:id
  res.render('places/new')
}

//--------------------------------------------------------------------------------------------------------------------------

export const createTrek= async(req,res)=>{
  // res.send(req.body)                           //testing
  // req.body.listing contains the listing object created from form fields named like listing[title], listing[location], etc.

  maptilerClient.config.apiKey = process.env.MAPTILER_API_KEY;

  const geoData = await maptilerClient.geocoding.forward(req.body.listing.location, { limit: 1 });
  //  console.log(geoData);
   if (!geoData.features?.length) {
       req.flash('error', 'Could not geocode that location. Please try again and enter a valid location.');
       return res.redirect('/listing/new');
   }
  const newListing= new Listing(req.body.listing) 
  newListing.geometry = geoData.features[0].geometry;
  newListing.location = geoData.features[0].place_name;
  newListing.image= req.files.map(f=>({url:f.path, filename:f.filename}))
  newListing.author= req.user._id    
  await newListing.save() 
  // console.log(newListing)
  req.flash('success', 'Trek created successfully'); 
  res.redirect(`/listing/${newListing._id}`)
}

//--------------------------------------------------------------------------------------------------------------------------

export const myTreks = async(req,res)=>{
  const myTreks= await Listing.find({author:req.user._id});
  res.render('places/mytreks',{myTreks})
}

//--------------------------------------------------------------------------------------------------------------------------

export const renderShowPage= async(req,res)=>{
  const listing = await Listing.findById(req.params.id)
  .populate({path:'reviews',populate:{path:'author'}}).populate('author')//nested populate  // Populate the reviews array with actual review documents by using stored Review ObjectIds to fetch and replace them with full review data from the database  
  // Throws error if someone types a URL for a trek that doesn't exist.
  if(!listing){
    req.flash('error', 'Trek not found.');
    return res.redirect('/listing');
    // throw new ExpressError('Trek not found',404)
  }
  res.render('places/show',{listing})
}

//--------------------------------------------------------------------------------------------------------------------------

export const renderEditForm = async(req,res)=>{
  const listing= await Listing.findById(req.params.id)
  
  // Throws an error so the router doesn't try to load an edit form for a trek that has already been deleted.
  if(!listing){
    req.flash('error', 'Trek not found.');
    return res.redirect('/listing');
    // throw new ExpressError('Trek not found',404)
  }
  res.render('places/edit',{listing})
}

//--------------------------------------------------------------------------------------------------------------------------

export const updateTrek = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);

  const deletedCount = req.body.deleteImages ? req.body.deleteImages.length : 0;
  const remainingImagesCount = listing.image.length - deletedCount;

  if (req.files && (remainingImagesCount + req.files.length > 5)) {
      req.flash('error', `Max 5 images allowed. You have ${remainingImagesCount} images and tried to add ${req.files.length} more.`);
      return res.redirect(`/listing/${id}/edit`);
  }

  //MapTiler Geocoding
  maptilerClient.config.apiKey = process.env.MAPTILER_API_KEY;
  const geoData = await maptilerClient.geocoding.forward(req.body.listing.location, { limit: 1 });
  if (!geoData.features?.length) {
      req.flash('error', 'Could not geocode that location. Please try again and enter a valid location.');
      return res.redirect(`/listing/${id}/edit`);
  }

  const updatedListing = await Listing.findByIdAndUpdate(id, { ...req.body.listing }, { runValidators: true, returnDocument: "after" });
  updatedListing.geometry = geoData.features[0].geometry;
  updatedListing.location = geoData.features[0].place_name;

  if (req.body.deleteImages && req.body.deleteImages.length > 0) {
      for (let filename of req.body.deleteImages) {
          await cloudinary.uploader.destroy(filename);
      }
      await updatedListing.updateOne({ $pull: { image: { filename: { $in: req.body.deleteImages } } } });
  }

  if (req.files && req.files.length > 0) {
      const newimgs = req.files.map(f => ({ url: f.path, filename: f.filename }));
      updatedListing.image.push(...newimgs);
  }

  await updatedListing.save();

  req.flash('success', 'Trek updated successfully.'); 
  res.redirect(`/listing/${updatedListing._id}`);
}

//--------------------------------------------------------------------------------------------------------------------------

export const deleteTrek= async(req,res)=>{
  const {id}=req.params;
  const listing = await Listing.findById(id);
  if(!listing){
    req.flash('error','Trek not found.')
    return res.redirect('/listing')
  }

  if (listing.image && listing.image.length > 0) {
      for (let img of listing.image) {
          await cloudinary.uploader.destroy(img.filename);
      }
  }

  await Listing.findByIdAndDelete(id)
  
  req.flash('success', 'Trek deleted successfully.'); 
  const redirectUrl = req.query.redirect || '/listing';
  res.redirect(redirectUrl)
}