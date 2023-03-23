const exp = require("express");
const adminApiRoute = exp.Router();
const bcrypt=require("bcrypt");
adminApiRoute.use(exp.json())
const ObjectId=require("mongodb").ObjectId
const verifyToken=require("../middlewares/tokenVerification")
const mongoose=require("mongoose")

adminApiRoute.get("/users",verifyToken, async(req, res,next) => {
    try{
        let dbobj = req.app.locals.databaseusersObj.collection('users');
        const users=await dbobj.find({}).toArray();
        res.send({data:users,message:'success',code:200,success:true})
    }
    catch(err){
        next(err)
    }
})

adminApiRoute.post("/add-user",verifyToken, async(req, res,next) => {
    try{
        let dbobj = req.app.locals.databaseusersObj;
        data=await dbobj.collection('users').findOne({ userName: req.body.userName });
        
        if (data !== null) {
            res.send({ message: "User already exists...", code:404,success:false})
        }
        else {
    
            req.body.password=await bcrypt.hash(req.body.password,5);
            data=await dbobj.collection('users').insertOne(req.body);
            res.send({ message: "User Registration successfull",code:202,success:true});
        }
    }
    catch(err){
        next(err);
    }
})

adminApiRoute.put("/updateuser",verifyToken, async (req, res,next) => {
    try{
    let dbobj = req.app.locals.databaseusersObj.collection('users');
    let uid =new mongoose.Types.ObjectId(req.body._id);
    console.log(uid)
    data=await dbobj.findOne({ _id: uid })
    delete req.body._id
    if (data == null)
        res.send({ message: "User not found" ,code:404, success:false})
    else {
        // req.body.password=await bcrypt.hash(req.body.password,5);
        console.log({...req.body})
        await dbobj.updateOne({ _id: uid }, {$set: { 
            ...req.body
         } });
        let user=await dbobj.find({_id:new mongoose.Types.ObjectId(uid)}).toArray()
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
            let dbobj = req.app.locals.databaseusersObj.collection('users');
            
            let id = new mongoose.Types.ObjectId(req.query.userId)
            data = await dbobj.findOne({ _id: id })
            if (data == null) res.send({ message: "User not exist" })
            else{
                await dbobj.deleteOne({ _id: id })
                res.send({ message: "User deleted successfully" })
            }
            }
            catch(err){
                next(err)
            }
        })


module.exports=adminApiRoute;