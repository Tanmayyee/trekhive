import express from 'express'
const router=express.Router()
import User from '../models/usermodel.js'
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

export default router