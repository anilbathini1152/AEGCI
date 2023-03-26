const mongoose=require('mongoose')

const issueSchema=new mongoose.Schema({
    description:{
        type:String,
        required:true
    },
    authority:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"User",
        required:true
    },
    raisedBy:{
        type:String,
    },
    createdAt:{
        type:Date,
        immutable:true,
        default: ()=> Date.now() 
    },
    priority:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model("Issue",issueSchema)