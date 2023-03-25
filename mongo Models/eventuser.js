const mongoose=require('mongoose')
const user = require('./user')

const eventUserSchema=new mongoose.Schema({ 
    user:{
        type:mongoose.SchemaTypes.ObjectId,
        required:true
    },
    event:{
        type:mongoose.SchemaTypes.ObjectId,
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
    }
})

module.exports = mongoose.model("EventUser",eventUserSchema)