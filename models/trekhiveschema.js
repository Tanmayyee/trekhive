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
    }
})

const Trekhive= mongoose.model('Trekhive',trekhiveSchema)

export default Trekhive;