import Listing from '../models/trekhiveschema.js';

export const index= async(req,res)=>{
 const listings= await Listing.find({})
 res.render('places/index',{listings})
}

export const renderNewForm= async(req,res)=>{           //new should come before /:id
  res.render('places/new')
}

export const createTrek= async(req,res)=>{
  // res.send(req.body)                           //testing
  // req.body.listing contains the listing object created from form fields named like listing[title], listing[location], etc.
  if(!req.files || req.files.length===0){
    req.flash('error','You must upload at least one image!')
    return res.redirect('/listing/new');
  }
  const newListing= new Listing(req.body.listing) 
  newListing.image= req.files.map(f=>({url:f.path, filename:f.filename}))
  newListing.author= req.user._id    
  await newListing.save() 
  // console.log(newListing)
  req.flash('success', 'Trek created successfully'); 
  res.redirect(`/listing/${newListing._id}`)
}

export const myTreks = async(req,res)=>{
  const myTreks= await Listing.find({author:req.user._id});
  res.render('places/mytreks',{myTreks})
}

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

export const updateTrek= async(req,res)=>{
  // res.send("workeddd")
  const {id}= req.params
  const updatedListing= await Listing.findByIdAndUpdate(id,{...req.body.listing},{ runValidators: true, returnDocument: "after" })  // Spread operator (...) creates a new object containing all properties from req.body.listing. This lets us pass the listing fields directly to findByIdAndUpdate().
  
   // Throws a 404 error just in case the trek was deleted by someone else exactly when you clicked "update".
   if (!updatedListing) {
     req.flash('error', 'Trek not found.');
     return res.redirect('/listing');
     // throw new ExpressError('Trek not found', 404);
    }

   if (req.files && req.files.length > 0) {
      const newimgs = req.files.map(f => ({ url: f.path, filename: f.filename }));
      updatedListing.image.push(...newimgs);
    
      await updatedListing.save();
    }
  req.flash('success', 'Trek updated successfully.'); 
  res.redirect(`/listing/${updatedListing._id}`)  
}


export const deleteTrek= async(req,res)=>{
  const {id}=req.params;
  const deleted= await Listing.findByIdAndDelete(id)
  
  if(!deleted){
    req.flash('error','Trek not found.')
  }
  req.flash('success', 'Trek deleted successfully.'); 
  const redirectUrl = req.query.redirect || '/listing';
  res.redirect(redirectUrl)
}