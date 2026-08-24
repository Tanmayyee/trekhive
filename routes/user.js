import express from 'express'
const router=express.Router()
// import User from '../models/usermodel.js'
import passport from 'passport';
import ExpressError from '../utils/ExpressError.js';
import { storeReturnTo,userValidation } from '../middleware.js';
import { createNewUser, login, logout, renderLogin, renderRegisterForm } from '../controllers/usercontroller.js';

router.route('/register')
    .get(renderRegisterForm)
    .post(userValidation,createNewUser)

// Joi validates the incoming user data before it is saved to the database. or joi handles invalid input.
// try...catch handles errors that occur during user registration, such as duplicate username/email.

router.route('/login')
    .get(renderLogin)
    .post(storeReturnTo, passport.authenticate('local', {failureFlash:true, failureRedirect:'/login'} ),login)

router.get('/logout', logout)

export default router