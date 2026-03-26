const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,"username is required"],
        unique:[true, "username is unique"]
    },
    email:{
        type:String,
        required:[true,"email is required"],
        unique:[true , "emial should be unique"]
    },
    password:{
        type:String,
        required:[true , " password is required"]
    }
    
})
const userModel = mongoose.model("users",userSchema)
module.exports = userModel