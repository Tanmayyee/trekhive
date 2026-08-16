import express from 'express';
import path from 'path';
const app = express();
import mongoose from 'mongoose'
import Listing from './models/trekhiveschema.js';
import Review from './models/reviewmodel.js';
import ejsMate from 'ejs-mate'
import methodOverride from "method-override";
import ExpressError from './utils/ExpressError.js';
import { listingValidationSchema, reviewValidationSchema } from './utils/validationSchema.js';

const MONGO_URI = "mongodb://127.0.0.1:27017/trekhive";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1); // Stops the server if the database fails to connect.
  }
};
await connectDB();


app.engine("ejs", ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(import.meta.dirname, '/views'));

app.use(express.static(path.join(import.meta.dirname, "public")));

app.use(express.urlencoded({ extended: true }));       
app.use(methodOverride("_method")); 

//validation middleware -----------------------------------------
// Checks the form data before allowing the request to continue.
//joi validation schema -> listingvalidationschema present in ./utils/validation
const listingValidation=(req,res,next)=>{
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

const reviewValidation=(req,res,next)=>{
  const {error}=reviewValidationSchema.validate(req.body,{abortEarly:false})
  if(error){
    const err=error.details.map(el=>el.message.replace(/"/g, '').replace(/review\./g, '')).join(' | ')
    throw new ExpressError(err,400)
  }else{
    next()
  }
}

app.get('/', (req, res) => {
    res.render('places/home');
});

// =========================== to check model working or not =============================
// app.get('/trekhivedb',async(req,res)=>{
//   const check =new Listing({title:"hello checking",price:23})
//   await check.save()
//   res.send(check)
// })

app.get('/listing',async(req,res)=>{
 const listings= await Listing.find({})
 res.render('places/index',{listings})
})

app.get('/listing/new',async(req,res)=>{           //new should come before /:id
  res.render('places/new')
})

// listingValidation middleware checks the form data before creating a new listing.
app.post('/listing',listingValidation,async(req,res)=>{
  // res.send(req.body)                           //for testing

  // req.body.listing contains the listing object created from form fields named like listing[title], listing[location], etc.
  const newListing= new Listing(req.body.listing)     
  await newListing.save()
  res.redirect(`/listing/${newListing._id}`)
})

app.get('/listing/:id',async(req,res)=>{
  const listing = await Listing.findById(req.params.id).populate('reviews') // Populate the reviews array with actual review documents by using stored Review ObjectIds to fetch and replace them with full review data from the database  
  // Throws error if someone types a URL for a trek that doesn't exist.
  if(!listing){
    throw new ExpressError('Trek not found',404)
  }
  res.render('places/show',{listing})
})

app.get('/listing/:id/edit',async(req,res)=>{
  const listing= await Listing.findById(req.params.id)
  
  // Throws an error so the app doesn't try to load an edit form for a trek that has already been deleted.
  if(!listing){
    throw new ExpressError('Trek not found',404)
  }
  res.render('places/edit',{listing})
})


// listingValidation middleware checks the form data before updating.
app.put('/listing/:id',listingValidation,async(req,res)=>{
  // res.send("workeddd")
  const {id}= req.params
  const updatedListing= await Listing.findByIdAndUpdate(id,{...req.body.listing},{ runValidators: true, returnDocument: "after" })  // Spread operator (...) creates a new object containing all properties from req.body.listing. This lets us pass the listing fields directly to findByIdAndUpdate().
  
   // Throws a 404 error just in case the trek was deleted by someone else exactly when you clicked "update".
   if (!updatedListing) {
        throw new ExpressError('Trek not found', 404);
    }
  res.redirect(`/listing/${updatedListing._id}`)  
})

app.delete('/listing/:id',async(req,res)=>{
  const {id}=req.params;
  const deleted= await Listing.findByIdAndDelete(id)
  
  if(!deleted){
    throw new ExpressError('Trek not found',404)
  }
  res.redirect('/listing')
})

// review submission route
app.post('/listing/:id/reviews',reviewValidation,async(req,res)=>{
     const foundListing= await Listing.findById(req.params.id)
     if(!foundListing){
      throw new ExpressError('Trek not found',404)
     }
     const newReview= new Review(req.body.review)      //inside form - review[body] , review[rating]
     foundListing.reviews.push(newReview);
     await newReview.save()
     await foundListing.save()
    //  res.send(foundListing) //to check 
    res.redirect(`/listing/${foundListing._id}`)
})

//for paths/routes other than previosly defined(above) paths
app.all('/{*path}',(req,res)=>{
  throw new ExpressError('Page not found',404)
})


//error handling middleware or global error
app.use((err,req,res,next)=>{

  if (!err.message){
    err.message='Oh No, Something went wrong.'
  }

  // Occurs when the ObjectId is invalid, such as having an incorrect length or invalid characters.
  if (err.name === 'CastError') {
      err.message = 'Page not found! The link to this trek is invalid or broken.';
      err.status = 404;
  }

  const {status=500}= err;
  res.status(status).render('./places/error',{err});
})

app.listen(3000, () => {
    console.log('Trekhive server is running on port 3000!');
});