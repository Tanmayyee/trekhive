import express from 'express';
import path from 'path';
const app = express();
import mongoose from 'mongoose'
import ejsMate from 'ejs-mate'
import methodOverride from "method-override";
import ExpressError from './utils/ExpressError.js';
import listings from './routes/listings.js'
import reviews from './routes/reviews.js'

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

app.use('/listing',listings);

app.use('/listing/:id/reviews',reviews)

app.get('/', (req, res) => {
    res.render('places/home');
});


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