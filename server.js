
const exp=require("express");
const { moveCursor } = require("readline");
const path=require("path")
const mc=require("mongodb").MongoClient;
const verifyToken=require("./middlewares/tokenVerification")

const app=exp();
const dburl="mongodb://localhost:27017";

app.use( exp.static(path.join(__dirname,"dist/aegci")))

mc.connect(dburl,{useNewUrlParser:true,useUnifiedTopology:true}).
then((cli)=>{
    app.locals.databaseusersObj=cli.db("AEGCI")
    console.log("Succcessfully connected to db")
}).catch((err)=>{
    console.log("Error Occured",err) 
})






const userApiRoute=require("./apis/UserApi");
app.use("",userApiRoute);

app.use((err,req,res,next)=>{
    res.send({message:"Error Occured",reason:err.message})
})

const port=5000;
app.listen(port,()=>{
    console.log(`server listening on ${port}`);
})

