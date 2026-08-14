import express from 'express';
import path from 'path';
const app = express();
import mongoose from 'mongoose'
import Listing from './models/trekhiveschema.js';
import ejsMate from 'ejs-mate'
import methodOverride from "method-override";
import ExpressError from './utils/ExpressError.js';

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

app.post('/listing',async(req,res)=>{
  // res.send(req.body)                           //for testing
  
  // Throws an error if the user submits an empty form, preventing an empty database entry.
  if(!req.body.listing){
    throw new ExpressError('Invalid trek data',400)
  }  
  // req.body.listing contains the listing object created from form fields named like listing[title], listing[location], etc.
  const newListing= new Listing(req.body.listing)     
  await newListing.save()
  res.redirect(`/listing/${newListing._id}`)
})

app.get('/listing/:id',async(req,res)=>{
  const listing= await Listing.findById(req.params.id)
  
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

app.put('/listing/:id',async(req,res)=>{
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
  
  // Throws a 404 error to let the app know it can't delete something that is already missing from the database.
  if(!deleted){
    throw new ExpressError('Trek not found',404)
  }
  res.redirect('/listing')
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