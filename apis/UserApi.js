const exp = require("express");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const userApiRoute = exp.Router();
userApiRoute.use(exp.json())


userApiRoute.post("/login", async (req, res) => {
    let dbobj = req.app.locals.databaseusersObj;
    data = await dbobj.findOne({ username: req.body.username })
    if (data === null) {
        res.send({ message: "No user with the given credentials" })
    }
    else{
        let result= await bcrypt.compare(req.body.pwd,data.pwd);
        if(result==true){
            let signedtoken=await jwt.sign({username:req.body.username},"abcd",{expiresIn:200})

            res.send({message:"User login Successfull",jwt:signedtoken,userObj:data})
        }
        else{
            res.send({message:"Enter correct username and password"})
        }
    }
    

})

userApiRoute.post("/register", async(req, res) => {
    let dbobj = req.app.locals.databaseusersObj;
    io=req.body;
    data=await dbobj.findOne({ username: req.body.username });
    if (data !== null) {
        res.send({ message: "User already exists..." })
    }
    else {
        pwd=await bcrypt.hash(req.body.pwd,5)
        req.body.pwd=pwd;
        data=await dbobj.insertOne(req.body);
        res.send({ message: "User Registration successfull" });
    }
})


module.exports = userApiRoute;