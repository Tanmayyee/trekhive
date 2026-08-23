import express from 'express'
const router=express.Router({mergeParams:true});   // to use params , or id in this case
import Listing from '../models/trekhiveschema.js';
import Review from '../models/reviewmodel.js';
import ExpressError from '../utils/ExpressError.js';
import { isLoggedIn,reviewValidation } from '../middleware.js';


// review submission route
router.post('/',isLoggedIn,reviewValidation,async(req,res)=>{
     const foundListing= await Listing.findById(req.params.id)
     if(!foundListing){
      req.flash('error', 'Trek not found.');
      return res.redirect('/listing');
      // throw new ExpressError('Trek not found',404)
     }
     const newReview= new Review(req.body.review)      //inside form - review[body] , review[rating]
     foundListing.reviews.push(newReview);
     await newReview.save()
     await foundListing.save()
    //  res.send(foundListing) //to check 
    req.flash('success', 'Review submitted successfully.');
    res.redirect(`/listing/${foundListing._id}`)
})

router.delete('/:reviewId',isLoggedIn,async(req,res)=>{
  const {id,reviewId}= req.params
  await Listing.findByIdAndUpdate(id,{$pull: {reviews:reviewId}})   //mongo - pull operator - removes elements from an array that match a specified condition.
  await Review.findByIdAndDelete(reviewId)
  req.flash('success', 'Review deleted successfully.'); 
  res.redirect(`/listing/${id}`)
  // res.send('working ')
})

export default router;

