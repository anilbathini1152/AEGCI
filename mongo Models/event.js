

const mongoose=require('mongoose')
const user = require('./user')

const eventSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    type:{
        type:String,
    },
    place:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    amount:{
        type:Number,
        default:0
    },
    organiser:{
        type:mongoose.SchemaTypes.ObjectId,
        required:true
    },
    createdAt:{
        type:Date,
        immutable:true,
        default: ()=> Date.now() 
    },
    score:{
        type:Number,
        default:0
    }

})

module.exports = mongoose.model("Event",eventSchema)