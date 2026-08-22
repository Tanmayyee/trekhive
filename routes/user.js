import express from 'express'
const router=express.Router()
import User from '../models/usermodel.js'

router.get('/register',(req,res)=>{
    res.render('auth/register')
})

export default router