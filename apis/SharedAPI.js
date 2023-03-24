const exp = require("express");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const sharedApiRoute = exp.Router();
sharedApiRoute.use(exp.json())
const mongoose=require('mongoose')
const User=require('../mongo Models/user')




// sharedApiRoute.get("/authenticate"),(req,res,next)=>{
//     try{
//         res.send({message:"Authenticated Successfull",success:true,code:200})
//     }
//     catch(err){
//         next(err)
//     }
// }

sharedApiRoute.post("/login", async (req, res,next) => {
    try{
        console.log("akjsfkja")
        data = await User.findOne({ userName: req.body.username })
        
        console.log(req.body)
        if (data === null) {
            res.send({ message: "No user with the given credentials",code:404,success:false })
        }
        else{
            let result= await bcrypt.compare(req.body.password,data.password);
            if(result==true){
                let signedtoken=await jwt.sign({username:req.body.username},"abcd",{expiresIn:"2h"})
    
                res.send({message:"User login Successfull",jwt:signedtoken,userObj:data,success:true,code:202})
            }
            else{
                res.send({message:"Enter correct username and password",code:404,success:false})
            }
        }
    }
    catch(err){
        next(err); 
    }
})



module.exports = sharedApiRoute;