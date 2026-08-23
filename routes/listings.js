import express from 'express'
import Listing from '../models/trekhiveschema.js';
// import ExpressError from '../utils/ExpressError.js';
const router=express.Router();
import { isLoggedIn, listingValidation ,isAuthor} from '../middleware.js';


router.get('/',async(req,res)=>{
 const listings= await Listing.find({})
 res.render('places/index',{listings})
})

router.get('/new',isLoggedIn,async(req,res)=>{           //new should come before /:id
  res.render('places/new')
})

// listingValidation middleware checks the form data before creating a new listing.
router.post('/',isLoggedIn,listingValidation,async(req,res)=>{
  // res.send(req.body)                           //for testing

  // req.body.listing contains the listing object created from form fields named like listing[title], listing[location], etc.
  const newListing= new Listing(req.body.listing) 
  newListing.author= req.user._id    
  await newListing.save()
  req.flash('success', 'Trek created successfully'); 
  res.redirect(`/listing/${newListing._id}`)
})

router.get('/mytreks',isLoggedIn,async(req,res)=>{
  const myTreks= await Listing.find({author:req.user._id});
  res.render('places/mytreks',{myTreks})
})

router.get('/:id',async(req,res)=>{
  const listing = await Listing.findById(req.params.id)
  .populate({path:'reviews',populate:{path:'author'}}).populate('author')//nested populate  // Populate the reviews array with actual review documents by using stored Review ObjectIds to fetch and replace them with full review data from the database  
  // Throws error if someone types a URL for a trek that doesn't exist.
  if(!listing){
    req.flash('error', 'Trek not found.');
    return res.redirect('/listing');
    // throw new ExpressError('Trek not found',404)
  }
  res.render('places/show',{listing})
})

router.get('/:id/edit',isLoggedIn,isAuthor,async(req,res)=>{
  const listing= await Listing.findById(req.params.id)
  
  // Throws an error so the router doesn't try to load an edit form for a trek that has already been deleted.
  if(!listing){
    req.flash('error', 'Trek not found.');
    return res.redirect('/listing');
    // throw new ExpressError('Trek not found',404)
  }
  res.render('places/edit',{listing})
})


// listingValidation middleware checks the form data before updating.
router.put('/:id',isLoggedIn,isAuthor,listingValidation,async(req,res)=>{
  // res.send("workeddd")
  const {id}= req.params
  const updatedListing= await Listing.findByIdAndUpdate(id,{...req.body.listing},{ runValidators: true, returnDocument: "after" })  // Spread operator (...) creates a new object containing all properties from req.body.listing. This lets us pass the listing fields directly to findByIdAndUpdate().
  
   // Throws a 404 error just in case the trek was deleted by someone else exactly when you clicked "update".
   if (!updatedListing) {
     req.flash('error', 'Trek not found.');
     return res.redirect('/listing');
     // throw new ExpressError('Trek not found', 404);
    }
  req.flash('success', 'Trek updated successfully.'); 
  res.redirect(`/listing/${updatedListing._id}`)  
})

router.delete('/:id',isLoggedIn,isAuthor,async(req,res)=>{
  const {id}=req.params;
  const deleted= await Listing.findByIdAndDelete(id)
  
  if(!deleted){
    req.flash('error','Trek not found.')
  }
  req.flash('success', 'Trek deleted successfully.'); 
  res.redirect('/listing')
})


export default router;