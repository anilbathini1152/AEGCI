
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
const Issue = require("./mongo Models/issue")

const { SerialPort } = require('serialport');

// const dbObj=require('./apis/dbConnection')
const port=5000;

//Build Location of Frontend
app.use( exp.static(path.join(__dirname,"dist/aegci")))


//Db Connetion and setup
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



//CronJob

const UltraSonicJob = new cron.CronJob('* * * * *',  function() {
    console.log("Running Cron Job ")
   
    console.log("Opening Sensor Port UltraSonic")
    let USport = new SerialPort({
            path: 'COM3',
            baudRate: 9600,
            dataBits: 8,
            stopBits: 1,
            parity: 'none',
            });
            
    
     USport.on('data', async (data) => {
        const temp = data.toString().trim();
        console.log("Sensor Data : ");
        console.log(temp);
        console.log("Closing Sensor Port UltraSonic")
        USport.close()
        if(temp==="1"){
            try {
                let params = {
                    description: "Dustbin Is Full", 
                    authority: new mongoose.Types.ObjectId("641fcf18432e60cf91a4a3b4"),
                    raisedBy: new mongoose.Types.ObjectId("6427a826834549d0a556510b"),
                    priority:"medium",
                }
                
                const data=await Issue.create(params)
                // console.log(data)
                console.log("Issue Added from ultreasonic sensor")
            }
            catch (err) {
                console.log(err.message)
            }
        }
      });
});

const HumidityJob = new cron.CronJob('* * * * *',  function() {
    console.log("Running Cron Job ")
   
    console.log("Opening Sensor Port Humidity")
    let USport = new SerialPort({
            path: 'COM3',
            baudRate: 115200,
            dataBits: 8,
            stopBits: 1,
            parity: 'none',
            });            
    
     USport.on('data', (data) => {
        const temp = data.toString().trim().split(",");
        console.log("Sensor Data : ");
        console.log(temp);
        console.log("Closing Sensor Port Humidity")
        USport.close()
      });
});

// UltraSonicJob.start()
// HumidityJob.start()










//Shared Api integration
const sharedApiRoute=require("./apis/SharedAPI");
app.use("",sharedApiRoute);

//Admin Api integration
const adminApiRoute=require("./apis/adminApi");
app.use("/admin",adminApiRoute);

//Authority Api integration
const authorityApiRoute=require("./apis/authorityApi");
app.use("/authority",authorityApiRoute);

//Stuudent Api integration
const studentApiRoute=require("./apis/studentApi");
app.use("/student",studentApiRoute);

//For Other routes other than the given  routes
app.use('/*',proxy('http://localhost:'+port+'/*'))

//Error handling route
app.use((err,req,res,next)=>{
    res.send({message:err.message,code:404,success:false})
})


//Server starting code
app.listen(port,()=>{
    console.log(`server listening on ${port}`);
})




  