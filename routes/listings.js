import express from 'express'
import Listing from '../models/trekhiveschema.js';
import ExpressError from '../utils/ExpressError.js';
const router=express.Router();
import { listingValidationSchema } from '../utils/validationSchema.js';


//validation middleware -----------------------------------------
// Checks the form data before allowing the request to continue.
//joi validation schema -> listingvalidationschema present in ./utils/validation
const listingValidation=(req,res,next)=>{
  const {error}=listingValidationSchema.validate(req.body,{abortEarly:false});
  if(error){
    // 1. .replace(/"/g, '') removes all the ugly quotation marks
    // 2. .replace(/listing\./g, '') removes the word "listing."
    const err=error.details.map(el=>el.message.replace(/"/g, '').replace(/listing\./g, '')).join(' | ')
    throw new ExpressError(err, 400)
  }else{
    next()
  }
}


router.get('/',async(req,res)=>{
 const listings= await Listing.find({})
 res.render('places/index',{listings})
})

router.get('/new',async(req,res)=>{           //new should come before /:id
  res.render('places/new')
})

// listingValidation middleware checks the form data before creating a new listing.
router.post('/',listingValidation,async(req,res)=>{
  // res.send(req.body)                           //for testing

  // req.body.listing contains the listing object created from form fields named like listing[title], listing[location], etc.
  const newListing= new Listing(req.body.listing)     
  await newListing.save()
  req.flash('success', 'Awesome! Successfully added a new trek!'); 
  res.redirect(`/listing/${newListing._id}`)
})

router.get('/:id',async(req,res)=>{
  const listing = await Listing.findById(req.params.id).populate('reviews') // Populate the reviews array with actual review documents by using stored Review ObjectIds to fetch and replace them with full review data from the database  
  // Throws error if someone types a URL for a trek that doesn't exist.
  if(!listing){
    throw new ExpressError('Trek not found',404)
  }
  res.render('places/show',{listing})
})

router.get('/:id/edit',async(req,res)=>{
  const listing= await Listing.findById(req.params.id)
  
  // Throws an error so the router doesn't try to load an edit form for a trek that has already been deleted.
  if(!listing){
    throw new ExpressError('Trek not found',404)
  }
  res.render('places/edit',{listing})
})


// listingValidation middleware checks the form data before updating.
router.put('/:id',listingValidation,async(req,res)=>{
  // res.send("workeddd")
  const {id}= req.params
  const updatedListing= await Listing.findByIdAndUpdate(id,{...req.body.listing},{ runValidators: true, returnDocument: "after" })  // Spread operator (...) creates a new object containing all properties from req.body.listing. This lets us pass the listing fields directly to findByIdAndUpdate().
  
   // Throws a 404 error just in case the trek was deleted by someone else exactly when you clicked "update".
   if (!updatedListing) {
        throw new ExpressError('Trek not found', 404);
    }
  req.flash('success', 'Trek details updated successfully!'); 
  res.redirect(`/listing/${updatedListing._id}`)  
})

router.delete('/:id',async(req,res)=>{
  const {id}=req.params;
  const deleted= await Listing.findByIdAndDelete(id)
  
  if(!deleted){
    throw new ExpressError('Trek not found',404)
  }
  req.flash('success', 'Trek deleted successfully.'); 
  res.redirect('/listing')
})


export default router;