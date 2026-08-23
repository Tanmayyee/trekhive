import {listingValidationSchema,reviewValidationSchema,userValidationSchema} from './utils/validationSchema.js';
import ExpressError from './utils/ExpressError.js';
import Listing from './models/trekhiveschema.js'

export const isLoggedIn=(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.returnTo= req.originalUrl
        req.flash('error','You must be signed in first!')
        return res.redirect('/login')
    }
    next()
}

export const storeReturnTo = (req, res, next) => {
    if (req.session.returnTo) {
        res.locals.returnTo = req.session.returnTo;
    }
    next();
}

export const isAuthor= async(req,res,next)=>{
    const {id}=req.params;
    const listing = await Listing.findById(id)
    if(!listing.author.equals(req.user._id)){
        req.flash('error','You do not have permission to do that!')
        return res.redirect(`/listing/${id}`)
    }
    next()
}

//validation middleware -----------------------------------------
// Checks the form data before allowing the request to continue.
//joi validation schema -> listingvalidationschema present in ./utils/validation
export const listingValidation=(req,res,next)=>{
  const {error}=listingValidationSchema.validate(req.body,{abortEarly:false});
  if(error){
    // 1. .replace(/"/g, '') removes all the ugly quotation marks
    // 2. .replace(/listing\./g, '') removes the word "listing."
    const err=error.details.map(el=>el.message.replace(/"/g, '').replace(/listing\./g, '')).join(' | ')
    throw new ExpressError(err, 400)
  }else{
    next()
  }
}

export const reviewValidation=(req,res,next)=>{
  const {error}=reviewValidationSchema.validate(req.body,{abortEarly:false})
  if(error){
    const err=error.details.map(el=>el.message.replace(/"/g, '').replace(/review\./g, '')).join(' | ')
    throw new ExpressError(err,400)
  }else{
    next()
  }
}

export const userValidation=(req,res,next)=>{
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