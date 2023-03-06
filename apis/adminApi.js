const exp = require("express");
const adminApiRoute = exp.Router();
adminApiRoute.use(exp.json())
const verifyToken=require("../middlewares/tokenVerification")

adminApiRoute.get("/users",verifyToken, async(req, res,next) => {
    try{
        let dbobj = req.app.locals.databaseusersObj.collection('users');
        const users=await dbobj.find();
        res.send({data:users,message:'success',code:200,success:true})
    }
    catch(err){
        next(err)
    }
})

adminApiRoute.post("/add-user", async(req, res,next) => {
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


module.exports=adminApiRoute;