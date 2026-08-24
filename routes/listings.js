import express from 'express'
// import Listing from '../models/trekhiveschema.js';
// import ExpressError from '../utils/ExpressError.js';
const router=express.Router();
import { isLoggedIn, listingValidation ,isAuthor} from '../middleware.js';
import {index, renderNewForm, createTrek, myTreks, renderShowPage, renderEditForm, updateTrek, deleteTrek} from '../controllers/listingcontroller.js'


router.get('/',index)

router.get('/new',isLoggedIn,renderNewForm)

// listingValidation middleware checks the form data before creating a new listing.
router.post('/',isLoggedIn,listingValidation, createTrek)

router.get('/mytreks',isLoggedIn, myTreks)

router.get('/:id', renderShowPage)

router.get('/:id/edit',isLoggedIn,isAuthor, renderEditForm)

// listingValidation middleware checks the form data before updating.
router.put('/:id',isLoggedIn,isAuthor,listingValidation,updateTrek)

router.delete('/:id',isLoggedIn,isAuthor,deleteTrek)


export default router;