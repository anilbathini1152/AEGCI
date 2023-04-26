const exp = require("express");
const path=require("path")
const sensorApiRoute = exp.Router();
const ExcelJS = require('exceljs'); 
sensorApiRoute.use(exp.json())

const ultrasonicSensorSwitch=true
const dhtPath = path.join(__dirname, 'excelSheets', 'dht.xlsx');
const ultraSonicPath = path.join(__dirname, 'excelSheets', 'ultraSonic.xlsx');
sensorApiRoute.post('/dht11', (req, res) => {
    const { temperature, humidity } = req.body;
    const workbook = new ExcelJS.Workbook();
    workbook.xlsx.readFile(dhtPath)
      .then(() => {
          const worksheet = workbook.getWorksheet(1);
          const currentDate = new Date();
          const date = currentDate.toLocaleDateString('en-US', { timeZone: 'Asia/Kolkata' });
          const time = currentDate.toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata' });
          worksheet.addRow([date, time, temperature, humidity]);
          return workbook.xlsx.writeFile(dhtPath);
      })
      .then(() => {
        console.log('Sensor data saved to Excel sheet dht');
      })
      .catch((err) => {
        console.log(`Error saving sensor data to Excel sheet: ${err}`);
      });
    res.status(200).send('Sensor data received');
  });

  sensorApiRoute.post('/ultrasonic', (req, res) => {
    const distance = req.body.distance;
    const workbook = new ExcelJS.Workbook();
    workbook.xlsx.readFile(ultraSonicPath)
      .then(() => {
          const worksheet = workbook.getWorksheet(1);
          const currentDate = new Date();
          const date = currentDate.toLocaleDateString('en-US', { timeZone: 'Asia/Kolkata' });
          const time = currentDate.toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata' });
          worksheet.addRow([date, time, distance]);
          return workbook.xlsx.writeFile(ultraSonicPath);
      })
      .then(() => {
        console.log('Sensor data saved to Excel sheet ultrasonic');
      })
      .catch((err) => {
        console.log(`Error saving sensor data to Excel sheet: ${err}`);
      });
    res.sendStatus(200);
  });

  module.exports = sensorApiRoute;