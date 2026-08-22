import express from 'express'
const router=express.Router()
import User from '../models/usermodel.js'

router.get('/register',(req,res)=>{
    res.render('auth/register')
})

router.post('/register',async(req,res)=>{
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