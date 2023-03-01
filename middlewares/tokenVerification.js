const verifyToken=(req,res,next)=>{
    let tokenWithBearer=req.headers['authorization']
    if(tokenWithBearer==undefined){
        res.send({message:"Unauthorized access"})
    }
    if(tokenWithBearer.startsWith("Bearer ")){
        let token=tokenWithBearer.slice(7,tokenWithBearer.length)
        JsonWebTokenError.verify(token,"abcd",(err,dec)=>{
            if(err){
                return res.send({message:"Session Expires.. Login to continue"})
            }
            else{
                next();
            }
        })
    }
}
module.exports=verifyToken;