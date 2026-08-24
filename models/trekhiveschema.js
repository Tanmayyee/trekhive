import mongoose from "mongoose"; 
import Review from "./reviewmodel.js";

const listingSchema= new mongoose.Schema({
    title:{
        type:String
    },
    price:{
        type:Number
    },
    location:{
        type:String
    },
    description:{
        type:String
    },
    image:[{
        url:String,
        filename:String
    }],
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    reviews:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Review'
    }]
})

listingSchema.post('findOneAndDelete',async function(doc){
    if(doc){
        await Review.deleteMany({
            _id:{
                $in:doc.reviews
            }
        })
    }
})

const Listing= mongoose.model('Listing',listingSchema)

export default Listing;