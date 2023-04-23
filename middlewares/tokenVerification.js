const jwt=require("jsonwebtoken");
const verifyToken=(req,res,next)=>{
    try{
        let tokenWithBearer=req.headers['authorization']
        if(tokenWithBearer==undefined){
            res.send({message:"Unauthorized access",code:1004,success:false})
        }
        if(tokenWithBearer.startsWith("Bearer ")){
            let token=tokenWithBearer.slice(7,tokenWithBearer.length)
            jwt.verify(token,"abcd",(err,dec)=>{
                if(err){
                    return res.send({message:"Session Expired.. Login to continue",code:1002,success:false})
                }
                else{
                    next();
                }
            })
        }
    }
    catch(err){
        next(err)
    }
}
module.exports=verifyToken;