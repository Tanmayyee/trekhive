import mongoose from "mongoose";
import cities from "./cities.js";
import { places,descriptors } from "./seedHelpers.js"

import Listing from '../models/trekhiveschema.js';  //model

const MONGO_URI = "mongodb://127.0.0.1:27017/trekhive-v2";

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
console.log("seeds")

const randomTitle= array => array[Math.floor(Math.random()*array.length)]
const randomPrice= Math.floor(Math.random()*20000)

const seedDb = async () => {
    //SAFEGUARD: 
    console.log("🛑 WARNING: Seeding is disabled for data safety. Exiting script...");
    process.exit(0); 

    try {
        await Listing.deleteMany({});

        for (let i = 0; i < 100; i++) {
            const randomCity = Math.floor(Math.random() * cities.length);

            const camp = new Listing({
                author: '6a8aa4f04d20e85d7ebd7409',
                location: `${cities[randomCity].city}, ${cities[randomCity].state}`,
                title: `${randomTitle(places)} ${randomTitle(descriptors)}`,
                image: `https://loremflickr.com/400/400/nature,mountain`,
                price: `${randomPrice}`,
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
            });

            await camp.save();
        }
    } catch (error) {
        console.error(`Seeding error: ${error.message}`);
    } finally {
        await mongoose.connection.close();
    }
};


// seedDb()


//closing mongoose connection - 
// Because your seedDB() script is a one-time script. Its job is:

// Connect to MongoDB
// Delete old data
// Insert the new seed data
// Close the MongoDB connection
// Exit the Node.js process

// Seed database with 100 random listings.
// Running this script again deletes the existing listings and creates 100 new ones.
// Otherwise, the existing data stays unchanged in MongoDB.