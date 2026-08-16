import mongoose from "mongoose"; 

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
    image:{
        type:String
    },
    reviews:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Review'
    }]
})

const Listing= mongoose.model('Listing',listingSchema)

export default Listing;