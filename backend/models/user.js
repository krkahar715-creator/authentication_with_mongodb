import mongoose from "mongoose";

const userSchema  = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true,
        uppercase:true
    },
    lastName:{
        type:String,
        required:true,
        uppercase:true,
        trim:true
    },
    // age:{
    //     type:Number,
    //     required:false,
    //     min:0,

    // },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        minLength:6,
        trim:true
    },
    userName:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    profileImage:{
        type:String,
        default:""
    }
    },
    {timestamps:true});

 const User = mongoose.model("User",userSchema)
export default User;
