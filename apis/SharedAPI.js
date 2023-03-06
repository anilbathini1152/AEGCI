const exp = require("express");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const sharedApiRoute = exp.Router();
sharedApiRoute.use(exp.json())

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
        let dbobj = req.app.locals.databaseusersObj.collection('users');
        data = await dbobj.findOne({ username: req.body.username })
        
        console.log(req.body)
        if (data === null) {
            res.send({ message: "No user with the given credentials" })
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

sharedApiRoute.post("/register", async(req, res,next) => {
    try{
        let dbobj = req.app.locals.databaseusersObj;
        io=req.body;
        data=await dbobj.collection('users').findOne({ username: req.body.username });
        if (data !== null) {
            res.send({ message: "User already exists..." })
        }
        else {
            console.log(req.body.password)
            req.body.password=await bcrypt.hash(req.body.password,5);
            data=await dbobj.collection('users').insertOne(req.body);
            res.send({ message: "User Registration successfull",code:202,success:true});
        }
    }
    catch(err){
        next(err);
    }
})


module.exports = sharedApiRoute;