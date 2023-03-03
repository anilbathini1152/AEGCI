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


module.exports=adminApiRoute;