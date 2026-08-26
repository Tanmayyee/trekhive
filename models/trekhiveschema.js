import mongoose from "mongoose"; 
import Review from "./reviewmodel.js";

const opts = { toJSON: { virtuals: true } };

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
    geometry: {
        type: {
           type: String,
           enum: ['Point'],
           required: true
       },
        coordinates: {
           type: [Number],
           required: true
       }
    },
    description:{
        type:String
    },
    image: {
        type: [
            {
                url: String,
                filename: String
            }
        ],
        validate: {
            validator: function(v) {
                return v && v.length > 0; 
            },
            message: 'A trek must have at least one image!'
        }
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    reviews:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Review'
    }],

}, opts)

listingSchema.virtual('properties.popUpMarkup').get(function () {
    return `
    <div style="font-family: inherit; padding: 2px;">
        <a href="/listing/${this._id}" style="color: #2563eb; text-decoration: none; font-weight: 600;" onmouseover="this.style.textDecoration='underline'" onmouseout="this.style.textDecoration='none'">
            ${this.title}
        </a>
        <p style="margin: 4px 0 0 0; color: #475569; font-size: 13px;">
            ${this.description ? this.description.substring(0, 30) + '...' : ''}
        </p>
    </div>`
});

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