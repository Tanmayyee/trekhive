import mongoose from "mongoose";
import cities from "./cities";
import { places,descriptors } from "./seedHelpers";

import Trekhive from './models/trekhiveschema.js';  //model

const MONGO_URI = "mongodb://127.0.0.1:27017/trekhive";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};
await connectDB();

const randomTitle= array => array[Math.floor(Math.random()*array.length)]

const seedDb= async()=>{
    await Trekhive.deleteMany({})
    for(let i=0; i<=100; i++){

        const randomCity= Math.floor(Math.random()*cities.length)
        
      const camp=  new Trekhive({
            location:`${cities[randomCity].city}, ${cities[randomCity].state}`,
            title:`${randomTitle(places)} ${randomTitle(descriptors)}`
        })
        await camp.save();
    }
}

seedDb()