const exp = require("express");
const adminApiRoute = exp.Router();
const bcrypt = require("bcrypt");
adminApiRoute.use(exp.json())
const ObjectId = require("mongodb").ObjectId
const verifyToken = require("../middlewares/tokenVerification")
const mongoose = require("mongoose")
const User = require("../mongo Models/user")
const Event = require("../mongo Models/event")
const Issue = require("../mongo Models/issue")
const EventRegistration = require("../mongo Models/eventuser")
const ExcelJS = require('exceljs');
const path=require("path")


//User Routes
adminApiRoute.get("/users", verifyToken, async (req, res, next) => {
    try {
        const users = await User.find({}).lean();
        res.send({ data: users, message: 'success', code: 200, success: true })
    }
    catch (err) {
        next(err)
    }
})

adminApiRoute.post("/add-user", verifyToken, async (req, res, next) => {
    try {
        data = await User.find({ userName: req.body.userName });
        if (data.length > 0) {
            res.send({ message: "User already exists...", code: 404, success: false })
        }
        else {

            req.body.password = await bcrypt.hash(req.body.password, 5);
            data = await User.create(req.body);
            res.send({ message: "User Registration successfull", code: 202, success: true });
        }
    }
    catch (err) {
        next(err);
    }
})

adminApiRoute.put("/update-user", verifyToken, async (req, res, next) => {
    try {
        let uid = new mongoose.Types.ObjectId(req.body._id);
        data = await User.findOne({ _id: uid })
        delete req.body._id
        if (data == null)
            res.send({ message: "User not found", code: 404, success: false })
        else {
            // req.body.password=await bcrypt.hash(req.body.password,5);
            await User.updateOne({ _id: uid }, {
                $set: {
                    ...req.body
                }
            });
            let user = await User.find({ _id: new mongoose.Types.ObjectId(uid) }).lean()
            res.send({ message: "User updated successfully", code: 202, success: true })
        }
    }
    catch (err) {
        next(err)
    }
})

adminApiRoute.delete("/delete-user/", verifyToken, async (req, res, next) => {
    try {

        let id = new mongoose.Types.ObjectId(req.query.userId)
        data = await User.findOne({ _id: id })
        if (data == null) res.send({ message: "User not exist" ,success:false ,code:404})
        else {
            await User.deleteOne({ _id: id })
            res.send({ message: "User deleted successfully" ,code:200,success:true })
        }
    }
    catch (err) {
        next(err)
    }
})


//event Routes
adminApiRoute.get("/events", verifyToken, async (req, res, next) => {
    try {
        const events = await Event.find({}).populate("organiser").lean();
        res.send({ data: events, message: 'success', code: 200, success: true })
    }
    catch (err) {
        next(err)
    }
})

adminApiRoute.post("/add-event", verifyToken, async (req, res, next) => {
    try {
        req.body.organiser = new mongoose.Types.ObjectId(req.body.organiser)
        data = await Event.create(req.body);
        res.send({ message: "Event Added successfully", code: 202, success: true });
    }
    catch (err) {
        next(err);
    }
})

adminApiRoute.put("/update-event", verifyToken, async (req, res, next) => {
    try {
        let eid = new mongoose.Types.ObjectId(req.body._id);
        data = await Event.findOne({ _id: eid })
        delete req.body._id
        if (data == null)
            res.send({ message: "Event not found", code: 404, success: false })
        else {
            // req.body.password=await bcrypt.hash(req.body.password,5);
            await Event.updateOne({ _id: eid }, {
                $set: {
                    ...req.body
                }
            });
            let event = await Event.find({ _id: new mongoose.Types.ObjectId(eid) }).lean()
            res.send({ message: "Event updated successfully", code: 202, success: true })
        }
    }
    catch (err) {
        next(err)
    }
})

adminApiRoute.delete("/delete-event/", verifyToken, async (req, res, next) => {
    try {
        let id = new mongoose.Types.ObjectId(req.query.eventId)
        data = await Event.findOne({ _id: id })
        if (data == null) res.send({ message: "Event not exist" ,success:false ,code:404})
        else {
            await Event.deleteOne({ _id: id })
            res.send({ message: "Event deleted successfully",code:200,success:true })
        }
    }
    catch (err) {
        next(err)
    }
})


//issue routes
adminApiRoute.get("/issues", verifyToken, async (req, res, next) => {
    try {
        const issues = await Issue.find({}).populate('authority').populate('raisedBy').lean();
        res.send({ data: issues, message: 'success', code: 200, success: true })
    }
    catch (err) {
        next(err)
    }
})

adminApiRoute.post("/add-issue", verifyToken, async (req, res, next) => {
    try {
        req.body.authority = new mongoose.Types.ObjectId(req.body.authority)
        data = await Issue.create(req.body);
        res.send({ message: "Issue added successfully", code: 202, success: true });
    }
    catch (err) {
        next(err);
    }
})

adminApiRoute.put("/update-issue", verifyToken, async (req, res, next) => {
    try {
        let eid = new mongoose.Types.ObjectId(req.body._id);
        data = await Issue.findOne({ _id: eid })
        delete req.body._id
        if (data == null)
            res.send({ message: "Issue not found", code: 404, success: false })
        else {
            await Issue.updateOne({ _id: eid }, {
                $set: {
                    ...req.body
                }
            });
            let issue = await Issue.find({ _id: new mongoose.Types.ObjectId(eid) }).lean()
            res.send({ message: "Issue updated successfully", code: 202, success: true })
        }
    }
    catch (err) {
        next(err)
    }
})

adminApiRoute.delete("/delete-issue/", verifyToken, async (req, res, next) => {
    try {
        let id = new mongoose.Types.ObjectId(req.query.issueId)
        data = await Issue.findOne({ _id: id })
        if (data == null) res.send({ message: "Issue not exist" ,success:false ,code:404})
        else {
            await Issue.deleteOne({ _id: id })
            res.send({ message: "Issue deleted successfully",code:200,success:true })
        }
    }
    catch (err) {
        next(err)
    }
})

//EventRegistration Routes

adminApiRoute.get("/event-registrations", verifyToken, async (req, res, next) => {
    try {
        const registrations = await EventRegistration.find({}).populate('user').populate('event').lean();
        res.send({ data: registrations, message: 'success', code: 200, success: true })
    }
    catch (err) {
        next(err)
    }
})

adminApiRoute.post("/add-event-registration", verifyToken, async (req, res, next) => {
    try {
        req.body.user = new mongoose.Types.ObjectId(req.body.user)
        req.body.event = new mongoose.Types.ObjectId(req.body.event)
        data = await EventRegistration.create(req.body);
        res.send({ message: "Event Registration successfull", code: 202, success: true });
    }
    catch (err) {
        next(err);
    }
})

adminApiRoute.put("/update-event-registration", verifyToken, async (req, res, next) => {
    try {
        let eid = new mongoose.Types.ObjectId(req.body._id);
        data = await EventRegistration.findOne({ _id: eid })
        delete req.body._id
        if (data == null)
            res.send({ message: "event-registration not found", code: 404, success: false })
        else {
            await EventRegistration.updateOne({ _id: eid }, {
                $set: {
                    ...req.body
                }
            });
            res.send({ message: "event-registration updated successfully", code: 202, success: true })
        }
    }
    catch (err) {
        next(err)
    }
})

adminApiRoute.delete("/delete-event-registration/", verifyToken, async (req, res, next) => {
    try {
        let id = new mongoose.Types.ObjectId(req.query.regId)
        data = await EventRegistration.findOne({ _id: id })
        if (data == null) res.send({ message: "Issue not exist" ,success:false ,code:404})
        else {
            await EventRegistration.deleteOne({ _id: id })
            res.send({ message: "event-registration deleted successfully",code:200,success:true })
        }
    }
    catch (err) {
        next(err)
    }
})

//Support Routes
adminApiRoute.get("/get-admin-users", verifyToken, async (req, res, next) => {
    try {
        const users = await User.find({role:"admin"}).lean();
        res.send({ data: users, message: 'success', code: 200, success: true })
    }
    catch (err) {
        next(err)
    }
})

adminApiRoute.get("/get-authority-users", verifyToken, async (req, res, next) => {
    try {
        const users = await User.find({role:"authority"}).lean();
        res.send({ data: users, message: 'success', code: 200, success: true })
    }
    catch (err) {
        next(err)
    }
})
adminApiRoute.get("/get-student-users", verifyToken, async (req, res, next) => {
    try {
        const users = await User.find({role:"student"}).lean();
        res.send({ data: users, message: 'success', code: 200, success: true })
    }
    catch (err) {
        next(err)
    }
})

adminApiRoute.get("/sensor-chart-data",verifyToken,async(req,res,next)=>{
    try{
        const dhtPath = path.join(__dirname, '/excelSheets', 'dht.xlsx');
        const ultraSonicPath = path.join(__dirname, '/excelSheets', 'ultraSonic.xlsx');
        const type=req.query.type
        //For dth data
        if(type==="dth"){
            const dthworkbook = new ExcelJS.Workbook();
            dthworkbook.xlsx.readFile(dhtPath).then(async () => {
                const worksheet = await dthworkbook.getWorksheet(1);
                const rows = [];
                worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
                    const rowData = {};
                    row.eachCell({ includeEmpty: false }, (cell, colNumber) => {
                        rowData[`column_${colNumber}`] = cell.value;
                    });
                    rows.push(rowData);
                });
                const result = {};
    
                rows.forEach((item) => {
                const date = item.column_1;
                const time = item.column_2;
                const hour=new Date(date.toString()+" "+time.toString()).getHours()
                const value = [item.column_3, item.column_4];
                
                if (!result[date]) {
                    result[date] = {};
                }
                
                if (!result[date][hour]) {
                    result[date][hour] = {
                    count: 0,
                    sum: [0, 0]
                    };
                }
                
                result[date][hour].count++;
                result[date][hour].sum[0] += value[0];
                result[date][hour].sum[1] += value[1];
                // result[date][time]=date.toString()+" "+time.toString()
                });
    
                // Calculate the averages for each hour
                Object.keys(result).forEach((date) => {
                Object.keys(result[date]).forEach((hour) => {
                    const count = result[date][hour].count;
                    const sum = result[date][hour].sum;
                    const avg = [sum[0] / count, sum[1] / count];
                    result[date][hour] = avg;
                });
                });
                res.send({ data: result, message: 'success', code: 200, success: true })

            
            })
        }else{
            //For ultra data
            const ultraworkbook = new ExcelJS.Workbook();
            ultraworkbook.xlsx.readFile(ultraSonicPath).then(async ()=>{
                const worksheet = ultraworkbook.getWorksheet(1);
                const rows = [];
                worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
                    const rowData = {};
                    row.eachCell({ includeEmpty: false }, (cell, colNumber) => {
                        rowData[`column_${colNumber}`] = cell.value;
                    });
                    rows.push(rowData);
                });
                const result = {};
    
                rows.forEach((item) => {
                    const date = item['column_1'];
                    const time = item['column_2'];
                    const hour=new Date(date.toString()+" "+time.toString()).getHours()
                    const value = item['column_3'];
                    
                    if (!result[date]) {
                      result[date] = {};
                    }
                    
                    if (!result[date][hour]) {
                      result[date][hour] = {
                        count: 0,
                        sum: 0
                      };
                    }
                    
                    result[date][hour].count++;
                    result[date][hour].sum += value;
                  });
                  
                  // Calculate the averages for each hour for each date
                  Object.keys(result).forEach((date) => {
                    Object.keys(result[date]).forEach((hour) => {
                      const count = result[date][hour].count;
                      const sum = result[date][hour].sum;
                      const avg = sum / count;
                      result[date][hour] = avg;
                    });
                  });
                  
                  res.send({ data: result, message: 'success', code: 200, success: true })

    
            })
        }


        
    }
    catch(err){
        console.log(err)
        next(err)
    }
})


module.exports = adminApiRoute;