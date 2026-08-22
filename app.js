import express from 'express';
import path from 'path';
const app = express();
import mongoose from 'mongoose'
import ejsMate from 'ejs-mate'
import methodOverride from "method-override";
import ExpressError from './utils/ExpressError.js';
import session, { Cookie } from 'express-session';
import flash from 'connect-flash'
import passport from 'passport';
import LocalStrategy from 'passport-local';
import User from './models/usermodel.js'

import listingsRoutes from './routes/listings.js'
import reviewsRoutes from './routes/reviews.js'
import userRoutes from './routes/user.js'

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

const sessionConfig= {
  secret:'thisshouldbeabettersecret',
  resave:false,
  saveUninitialized:true,
  rolling:true,   // Refresh the cookie expiration on each request
  cookie:{
    httpOnly:true,  // Prevent JavaScript from accessing the cookie
    // expires:new Date(Date.now()+7*24*60*60*1000),  
    maxAge:7*24*60*60*1000 
  }
}
app.use(session(sessionConfig))

app.use(flash())

app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use((req,res,next)=>{
  res.locals.currentUser= req.user; // Make the currently authenticated user available in all views (templates), includes user object ( username , id , email etc...)
  res.locals.success= req.flash('success');
  res.locals.error= req.flash('error')
  next();
})

// to check working of passport->

// app.get('/fakeuser',async(req,res)=>{
//   const u= new User({email:'samplee@gmail.com',username:'tanmayy'})
//   const newUser= await User.register(u,'mypassword')   //method provide by passport 
//   res.send(newUser)
// })


app.use('/',userRoutes)
app.use('/listing',listingsRoutes);
app.use('/listing/:id/reviews',reviewsRoutes)

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