import mongoose from "mongoose"; 

const trekhiveSchema= new mongoose.Schema({
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
    }
})

const Listing= mongoose.model('Listing',trekhiveSchema)

export default Listing;