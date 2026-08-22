import express from 'express'
const router=express.Router()
import User from '../models/usermodel.js'

router.get('/register',(req,res)=>{
    res.render('register')
})

export default router