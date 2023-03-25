
const exp=require("express");
const { moveCursor } = require("readline");
const path=require("path")
const mc=require("mongodb").MongoClient;
const verifyToken=require("./middlewares/tokenVerification")
const app=exp();
const dburl="mongodb://localhost:27017/AEGCI";
const proxy=require('express-http-proxy')
const mongoose=require('mongoose')
const cron = require('cron');
const { spawn } = require('child_process');

// const dbObj=require('./apis/dbConnection')
const port=5000;

app.use( exp.static(path.join(__dirname,"dist/aegci")))



const connnectToDb=async ()=>{
    try{
        await mongoose.connect(dburl,{useNewUrlParser:true,useUnifiedTopology:true})
        console.log("Succcessfully connected to db")
    }
    catch(err){
        console.log("Error Occured",err) 
    }
}

connnectToDb()

const job = new cron.CronJob('* * * * *', function() {
    
});

job.start()










const sharedApiRoute=require("./apis/SharedAPI");
app.use("",sharedApiRoute);

const adminApiRoute=require("./apis/adminApi");
app.use("/admin",adminApiRoute);

app.use('/*',proxy('http://localhost:'+port+'/*'))

app.use((err,req,res,next)=>{
    res.send({message:err.message,code:404,success:false})
})

app.listen(port,()=>{
    console.log(`server listening on ${port}`);
})




  