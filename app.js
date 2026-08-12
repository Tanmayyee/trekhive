import express from 'express';
import path from 'path';
const app = express();
import mongoose from 'mongoose'
import Listing from './models/trekhiveschema.js';
import ejsMate from 'ejs-mate'
import methodOverride from "method-override";


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
    res.render('home');
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

  // req.body.listing contains the listing object created from form fields named like listing[title], listing[location], etc.
  const newListing= new Listing(req.body.listing)       
  await newListing.save()
  res.redirect(`/listing/${newListing._id}`)
})

app.get('/listing/:id',async(req,res)=>{
  const listing= await Listing.findById(req.params.id)
  res.render('places/show',{listing})
})

app.get('/listing/:id/edit',async(req,res)=>{
  const listing= await Listing.findById(req.params.id)
  res.render('places/edit',{listing})
})

app.put('/listing/:id',async(req,res)=>{
  // res.send("workeddd")
  const {id}= req.params
  const updatedListing= await Listing.findByIdAndUpdate(id,{...req.body.listing},{ runValidators: true, returnDocument: "after" })  // Spread operator (...) creates a new object containing all properties from req.body.listing. This lets us pass the listing fields directly to findByIdAndUpdate().
  res.redirect(`/listing/${updatedListing._id}`)  
})

app.delete('/listing/:id',async(req,res)=>{
  const {id}=req.params;
  await Listing.findByIdAndDelete(id)
  res.redirect('/listing')
})


app.listen(3000, () => {
    console.log('Trekhive server is running on port 3000!');
});