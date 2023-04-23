require('dotenv').config()
const exp=require("express");
const { moveCursor } = require("readline");
const path=require("path")
const ExcelJS = require('exceljs');
const mc=require("mongodb").MongoClient;
const verifyToken=require("./middlewares/tokenVerification")
const app=exp();
const dburl="mongodb://localhost:27017/AEGCI";
const proxy=require('express-http-proxy')
const mongoose=require('mongoose')
const cron = require('cron');
const Issue = require("./mongo Models/issue")
const cors = require('cors');

const { SerialPort } = require('serialport');
const IP=process.env.CURRENT_IP;

// const dbObj=require('./apis/dbConnection')
const port=5000;

//Build Location of Frontend
app.use( exp.static(path.join(__dirname,"dist/aegci")))
app.use(cors())

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

// const UltraSonicJob = new cron.CronJob('* * * * *',  function() {
    // console.log("Running Cron Job ")
   
    // console.log("Opening Sensor Port UltraSonic")
    // let USport = new SerialPort({
    //         path: 'COM3',
    //         baudRate: 9600,
    //         dataBits: 8,
    //         stopBits: 1,
    //         parity: 'none',
    //         });
            
    
    //  USport.on('data', async (data) => {
    //     const temp = data.toString().trim();
    //     console.log("Sensor Data : ");
    //     console.log(temp);
    //     console.log("Closing Sensor Port UltraSonic")
    //     USport.close()
    //     if(temp==="1"){
    //         try {
    //             let params = {
    //                 description: "Dustbin Is Full", 
    //                 authority: new mongoose.Types.ObjectId("641fcf18432e60cf91a4a3b4"),
    //                 raisedBy: new mongoose.Types.ObjectId("6427a826834549d0a556510b"),
    //                 priority:"medium",
    //             }
                
    //             const data=await Issue.create(params)
    //             // console.log(data)
    //             console.log("Issue Added from ultreasonic sensor")
    //         }
    //         catch (err) {
    //             console.log(err.message)
    //         }
    //     }
    //   });
// });

// const HumidityJob = new cron.CronJob('* * * * *',  function() {
//     console.log("Running Cron Job ")
   
//     console.log("Opening Sensor Port Humidity")
//     let USport = new SerialPort({
//             path: 'COM3',
//             baudRate: 115200,
//             dataBits: 8,
//             stopBits: 1,
//             parity: 'none',
//             });            
    
//      USport.on('data', (data) => {
//         const temp = data.toString().trim().split(",");
//         console.log("Sensor Data : ");
//         console.log(temp);
//         console.log("Closing Sensor Port Humidity")
//         USport.close()
//       });
// });

// UltraSonicJob.start()
// HumidityJob.start()

const dhtPath = path.join(__dirname, '/apis/excelSheets', 'dht.xlsx');
const ultraSonicPath = path.join(__dirname, '/apis/excelSheets', 'ultraSonic.xlsx');

//Humidity CronJob
const humidityJob = new cron.CronJob('* * * * *',  function() {
    const workbook = new ExcelJS.Workbook();
    workbook.xlsx.readFile(dhtPath)
    .then(async () => {
        const worksheet = workbook.getWorksheet(1);
        const lastRow = worksheet.lastRow;
        console.log(`Last row number: ${lastRow.number}`);
        let humidity=lastRow.getCell(4).value
        console.log(humidity)
        let desc="";
        if(humidity<30 || humidity>=50){
            if(humidity<30){
                desc="Humidity Below Optimal Range (<30)"
            }
            else if(humidity>=50){
                desc="Humidity Above Optimal Range (>50)"
            }
            let params = {
                    description: desc, 
                    authority: new mongoose.Types.ObjectId("641fcf18432e60cf91a4a3b4"),
                    raisedBy: new mongoose.Types.ObjectId("643be45fbeff205c8d3bb050"),
                    priority:"medium",
                }
            const data=await Issue.create(params)
            console.log("Issue created by humidity")
        }        
    })
    .catch((err) => {
        console.log(`Error reading Excel file: ${err}`);
    });
});

humidityJob.start()


//Temperature Cron Job
const temperatureJob = new cron.CronJob('* * * * *',  function() {
    const workbook = new ExcelJS.Workbook();
    workbook.xlsx.readFile(dhtPath)
    .then(async () => {
        const worksheet = workbook.getWorksheet(1);
        const lastRow = worksheet.lastRow;
        console.log(`Last row number: ${lastRow.number}`);
        let temperature=lastRow.getCell(3).value
        console.log(temperature)
        let desc="";
        if(temperature<20 || temperature>=25){
            if(temperature<20){
                desc="temperature Below Optimal Range (<20)"
            }
            else if(temperature>=25){
                desc="temperature Above Optimal Range (>25)"
            }
            let params = {
                    description: desc, 
                    authority: new mongoose.Types.ObjectId("641fcf18432e60cf91a4a3b4"),
                    raisedBy: new mongoose.Types.ObjectId("643be481beff205c8d3bb051"),
                    priority:"medium",
                }
            const data=await Issue.create(params)
            console.log("Issue created by temperature")
        }        
    })
    .catch((err) => {
        console.log(`Error reading Excel file: ${err}`);
    });
});

temperatureJob.start()



//Temperature Cron Job
const ultraSonicJob = new cron.CronJob('* * * * *',  function() {
    const workbook = new ExcelJS.Workbook();
    workbook.xlsx.readFile(ultraSonicPath)
    .then(async () => {
        const worksheet = workbook.getWorksheet(1);
        const lastRow = worksheet.lastRow;
        console.log(`Last row number: ${lastRow.number}`);
        let distance=lastRow.getCell(3).value
        console.log(distance)
        if(distance<10 && distance!=0){
            let params = {
                    description: "Dustbin Full", 
                    authority: new mongoose.Types.ObjectId("641fcf18432e60cf91a4a3b4"),
                    raisedBy: new mongoose.Types.ObjectId("6427a826834549d0a556510b"),
                    priority:"medium",
                }
            const data=await Issue.create(params)
            console.log("Issue created by distance")
        }        
    })
    .catch((err) => {
        console.log(`Error reading Excel file: ${err}`);
    });
});

ultraSonicJob.start()








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

const sensorApiRoute=require("./apis/sensorApi");
const { last } = require("rxjs");
app.use("/sensor",sensorApiRoute);

//For Other routes other than the given  routes
app.use('/*',proxy('http://localhost:'+port+'/*'))

//Error handling route
app.use((err,req,res,next)=>{
    res.send({message:err.message,code:404,success:false})
})


//Server starting code
app.listen(port,IP,()=>{
    console.log(`server listening on ${port}`);
})




  