if (process.env.NODE_ENV !== "production") {
    const dotenv = await import('dotenv');
    dotenv.config({quiet:true});
}

// console.log(process.env.SECRET);
// console.log(process.env.API_KEY);

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url'; 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
app.set('query parser', 'extended');
import mongoose from 'mongoose'
import ejsMate from 'ejs-mate'
import methodOverride from "method-override";
import ExpressError from './utils/ExpressError.js';
import session, { Cookie } from 'express-session';
import flash from 'connect-flash'
import passport from 'passport';
import LocalStrategy from 'passport-local';
import User from './models/usermodel.js'
import Listing from './models/trekhiveschema.js';
import sanitizeV5 from './utils/mongoSanitizeV5.js';
import helmet from 'helmet';

import listingsRoutes from './routes/listings.js'
import reviewsRoutes from './routes/reviews.js'
import userRoutes from './routes/user.js'

 
import MongoStore from 'connect-mongo';

const dbUrl= process.env.DB_URL
// const dbUrl= "mongodb://127.0.0.1:27017/trekhive-v2"
//updated DB_URL

const MONGO_URI = dbUrl || "mongodb://127.0.0.1:27017/trekhive-v2" ;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 5000, 
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    throw error; 
  }
};
await connectDB();

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err.message);
});

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection:', reason);
});


app.engine("ejs", ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(helmet({ contentSecurityPolicy: { directives: { defaultSrc: ["'self'"], scriptSrc: ["'self'", "'unsafe-inline'", "https://cdn.maptiler.com"], scriptSrcAttr: ["'unsafe-inline'"], 
   styleSrc: ["'self'", "'unsafe-inline'", "https://cdn.maptiler.com"], imgSrc: ["'self'", "data:", "blob:", "https://res.cloudinary.com", "https://encrypted-tbn0.gstatic.com", "https://api.maptiler.com", "https://*.maptiler.com", "https://img.icons8.com"], 
   connectSrc: ["'self'", "https://api.maptiler.com", "https://*.maptiler.com"], fontSrc: ["'self'", "data:", "https://*.maptiler.com"], workerSrc: ["'self'", "blob:"], objectSrc: ["'none'"],
   baseUri: ["'self'"], frameAncestors: ["'self'"] } } }));
   
app.use(express.static(path.join(__dirname, 'public')));
   
app.use(sanitizeV5({ replaceWith: '_' }));

app.use(express.urlencoded({ extended: true }));       
app.use(methodOverride("_method")); 

const store = MongoStore.create({
    mongoUrl: process.env.DB_URL,
    touchAfter: 24 * 60 * 60,
    crypto: {
        secret:process.env.MONGOSTORE_SECRET
    }
});

const sessionConfig= {
  store,
  name:'th.sid',
  secret: process.env.SESSION_SECRET || 'fallbacksecret',
  resave:false,
  saveUninitialized:true,
  rolling:true,   // Refresh the cookie expiration on each request
  cookie:{
    httpOnly:true,  // Prevent JavaScript from accessing the cookie
    // expires:new Date(Date.now()+7*24*60*60*1000),  
    // secure:true,
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
  // console.log(req.query)   //check working of express-mongo-sanitize
  res.locals.currentUser = req.user || null; // Make the currently authenticated user available in all views (templates), includes user object ( username , id , email etc...)
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
app.get('/', (req, res) => {
  res.redirect('/home');
});
app.get('/home',async(req,res)=>{
  const listings= await Listing.find({})
 res.render('places/home',{listings})
})
app.use('/listing',listingsRoutes);
app.use('/listing/:id/reviews',reviewsRoutes)



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
  res.status(status).render('places/error',{err});
})

export default app;