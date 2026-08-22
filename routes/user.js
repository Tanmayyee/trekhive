import express from 'express'
const router=express.Router()
import User from '../models/usermodel.js'
import passport from 'passport';
import ExpressError from '../utils/ExpressError.js';
import { userValidationSchema } from '../utils/validationSchema.js';

const userValidation=(req,res,next)=>{
  const {error}=userValidationSchema.validate(req.body)
  if(error){
    const err=error.details.map(el=>el.message).join(' | ')
    // throw new ExpressError(err,400)
    req.flash('error',err)
    res.redirect('/register')
  }else{
    next()
  }
}

router.get('/register',(req,res)=>{
    res.render('auth/register')
})

// Joi validates the incoming user data before it is saved to the database. or joi handles invalid input.
// try...catch handles errors that occur during user registration, such as duplicate username/email.

router.post('/register',userValidation,async(req,res)=>{
    // res.send(req.body)
    try{
         const {username,password,email}= req.body
         const user=new User({email,username})
         const registeredUser= await User.register(user,password)
         // console.log(registeredUser)
         req.flash('success','welcome!')
         res.redirect('/listing')
    }catch(e){
        req.flash('error',e.message)
        res.redirect('/register')
    }
   
})

router.get('/login',(req,res)=>{
    res.render('auth/login')
})

router.post('/login', passport.authenticate('local', {failureFlash:true, failureRedirect:'/login'} ),(req,res)=>{
    req.flash('success','welcome back!')
    res.redirect('/listing')
})

export default router