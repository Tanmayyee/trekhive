import express from 'express'
// import Listing from '../models/trekhiveschema.js';
// import ExpressError from '../utils/ExpressError.js';
const router=express.Router();
import { isLoggedIn, listingValidation ,isAuthor} from '../middleware.js';
import {index, renderNewForm, createTrek, myTreks, renderShowPage, renderEditForm, updateTrek, deleteTrek} from '../controllers/listingcontroller.js'
import multer from 'multer'
import { storage } from '../cloudinary/index.js';
const upload = multer({ storage:storage,
    limits: {
        fileSize: 10 * 1024 * 1024, // 10 MB in bytes
        files: 5
 }});

router.route('/')
    .get(index)
    .post(isLoggedIn,upload.array('listing[image]',5),listingValidation, createTrek)
    // .post(upload.array('listing[image]'),(req,res)=>{
    //     console.log(req.body,req.files);
    //     res.send('worked!!!')
    // })
    // listingValidation middleware checks the form data before creating a new listing.

router.get('/new',isLoggedIn,renderNewForm)

router.get('/mytreks',isLoggedIn, myTreks)

router.route('/:id')
    .get(renderShowPage)
    .put(isLoggedIn,isAuthor,upload.array('listing[image]',5),listingValidation,updateTrek)
    .delete(isLoggedIn,isAuthor,deleteTrek)

router.get('/:id/edit',isLoggedIn,isAuthor, renderEditForm)

export default router;