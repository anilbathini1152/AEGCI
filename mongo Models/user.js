

const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
    },
    userName:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true
    },
    mobileNo:{
        type:Number,
    },
    gender:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }

})

module.exports = mongoose.model("User",userSchema)