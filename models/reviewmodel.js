import mongoose from "mongoose"

const reviewSchema= new mongoose.Schema({
    body:{
        type:String
    },
    rating:{
        type:String
    }
})

const Review= mongoose.model('Review',reviewSchema)

export default Review;