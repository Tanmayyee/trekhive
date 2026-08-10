import express from 'express';
import path from 'path';
const app = express();
import mongoose from 'mongoose'
import Trekhive from './models/trekhiveschema.js';

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

app.set('view engine', 'ejs');
app.set('views', path.join(import.meta.dirname, '/views'));

app.use(express.static(path.join(import.meta.dirname, "public")));

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/trekhivedb',async(req,res)=>{
  const check =new Trekhive({title:"hello checking",price:23})
  await check.save()
  res.send(check)
})

app.listen(3000, () => {
    console.log('Trekhive server is running on port 3000!');
});