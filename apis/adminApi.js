const exp = require("express");
const adminApiRoute = exp.Router();
const bcrypt=require("bcrypt");
adminApiRoute.use(exp.json())
const ObjectId=require("mongodb").ObjectId
const verifyToken=require("../middlewares/tokenVerification")
const mongoose=require("mongoose")
const User=require("../mongo Models/user")


adminApiRoute.get("/users",verifyToken, async(req, res,next) => {
    try{
        const users=await User.find({}).lean();
        res.send({data:users,message:'success',code:200,success:true})
    }
    catch(err){
        next(err)
    }
})

adminApiRoute.post("/add-user",verifyToken, async(req, res,next) => {
    try{
        data=await User.find({ userName: req.body.userName });
        console.log(data)
        if (data.length > 0) {
            res.send({ message: "User already exists...", code:404,success:false})
        }
        else {
    
            req.body.password=await bcrypt.hash(req.body.password,5);
            data=await User.create(req.body);
            res.send({ message: "User Registration successfull",code:202,success:true});
        }
    }
    catch(err){
        next(err);
    }
})

adminApiRoute.put("/updateuser",verifyToken, async (req, res,next) => {
    try{
    let uid =new mongoose.Types.ObjectId(req.body._id);
    console.log(uid)
    data=await User.findOne({ _id: uid })
    delete req.body._id
    if (data == null)
        res.send({ message: "User not found" ,code:404, success:false})
    else {
        // req.body.password=await bcrypt.hash(req.body.password,5);
        console.log({...req.body})
        await User.updateOne({ _id: uid }, {$set: { 
            ...req.body
         } });
        let user=await User.find({_id:new mongoose.Types.ObjectId(uid)}).lean()
        console.log(user)
        res.send({ message: "User updated successfully",code:202,success:true })
        }
    }
    catch(err){
        next(err)
    }
    })

    adminApiRoute.delete("/deleteuser/",verifyToken, async (req, res,next) => {
        try{
            
            let id = new mongoose.Types.ObjectId(req.query.userId)
            data = await User.findOne({ _id: id })
            if (data == null) res.send({ message: "User not exist" })
            else{
                await User.deleteOne({ _id: id })
                res.send({ message: "User deleted successfully" })
            }
            }
            catch(err){
                next(err)
            }
        })


module.exports=adminApiRoute;