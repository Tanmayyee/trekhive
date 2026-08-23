import express from 'express'
const router=express.Router()
import User from '../models/usermodel.js'
import passport from 'passport';
import ExpressError from '../utils/ExpressError.js';
import { storeReturnTo,userValidation } from '../middleware.js';

router.get('/register',(req,res)=>{
    res.render('auth/register')
})

// Joi validates the incoming user data before it is saved to the database. or joi handles invalid input.
// try...catch handles errors that occur during user registration, such as duplicate username/email.

router.post('/register',userValidation,async(req,res,next)=>{
    // res.send(req.body)
    try{
         const {username,password,email}= req.body
         const user=new User({email,username})
         const registeredUser= await User.register(user,password)
         // console.log(registeredUser)
         req.login(registeredUser,err=>{
            if(err){
                return next(err)
            }else{
                req.flash('success','Account created successfully.')
                res.redirect('/listing')
            }
         })
    }catch(e){
        req.flash('error',e.message)
        res.redirect('/register')
    }
   
})

router.get('/login',(req,res)=>{
    if (req.query.returnTo) {          //If the user clicked "Log in to Review" from a show page, save that exact URL to the session,otherwise storeReturnTo works in post route
        req.session.returnTo = req.query.returnTo; 
    }
    res.render('auth/login')
})

router.post('/login',storeReturnTo, passport.authenticate('local', {failureFlash:true, failureRedirect:'/login'} ),(req,res)=>{
    req.flash('success','Signed in successfully.')
    const redirectUrl= res.locals.returnTo || '/listing'
    res.redirect(redirectUrl)
})

router.get('/logout',(req,res,next)=>{
    req.logout(function(err){
        if(err){
            return next(err);
        }
         req.flash('success',"Signed out securely.")
         res.redirect('/listing')
    });
})

export default router