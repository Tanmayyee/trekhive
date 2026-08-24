import express from 'express'
const router=express.Router({mergeParams:true});   // to use params , or id in this case
// import Listing from '../models/trekhiveschema.js';
// import Review from '../models/reviewmodel.js';
// import ExpressError from '../utils/ExpressError.js';
import { isLoggedIn,reviewValidation,isReviewAuthor } from '../middleware.js';
import { createReviews, deleteReviews } from '../controllers/reviewscontroller.js';


// review submission route
router.post('/',isLoggedIn,reviewValidation,createReviews)

router.delete('/:reviewId',isLoggedIn,isReviewAuthor,deleteReviews)

export default router;

