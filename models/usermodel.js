import mongoose from 'mongoose'
import passportLocalMongoose from 'passport-local-mongoose'

const userSchema= new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    }
})

// Adds authentication features like username, password hashing, salt, and login methods to the schema
userSchema.plugin(passportLocalMongoose.default);   

const User= mongoose.model('User',userSchema);

export default User;