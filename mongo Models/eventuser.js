const mongoose=require('mongoose')
const user = require('./user')

const eventUserSchema=new mongoose.Schema({ 
    user:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"User",
        required:true
    },
    event:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"Event",
        required:true
    },
    state:{
        type:String,
        default:"Under Process"
    },
    enroledAt:{
        type:Date,
        immutable:true,
        default:()=>Date.now()
    },
    finishedAt:{
        type:Date,
    },
    verifiedAt:{
        type:Date,
    },
    url:{
        type:String
    }
})

module.exports = mongoose.model("EventUser",eventUserSchema)