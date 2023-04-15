const exp = require("express");
const studentApiRoute = exp.Router();
const bcrypt = require("bcrypt");
studentApiRoute.use(exp.json())
const ObjectId = require("mongodb").ObjectId
const verifyToken = require("../middlewares/tokenVerification")
const mongoose = require("mongoose")
const User = require("../mongo Models/user")
const Event = require("../mongo Models/event")
const Issue = require("../mongo Models/issue")
const EventRegistration = require("../mongo Models/eventuser")
const multer = require('multer')
const storage=multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './src/app/components/authority/authority-events-registration/uploads');
    },
    filename: function(req, file, cb) {
        
      cb(null, req.query.loggedUser+Date.now().toString()+file.originalname);
    }
  });
  const upload = multer({ storage: storage });

studentApiRoute.post('/upload', verifyToken,upload.single('file'),(req, res,next) => {
    try{
        console.log(req.file.filename)
        res.send({data:req.file.filename,message:'File uploaded successfully!',success:true,code:200});
    }
    catch(err){
        next(err)
    }
  });

studentApiRoute.put('/complete-task',verifyToken,async (req,res,next)=>{
    try {
       
        const path=req.body.path;
        const user=new mongoose.Types.ObjectId(req.body.user)
        const event=new mongoose.Types.ObjectId(req.body.event)
        
        await EventRegistration.updateOne(
            {event,user},{
            $set: {
                finishedAt:new Date(Date.now()),
                state:"VERIFICATION-PENDING",
                url:path
            }
            })
        res.send({message:"File Uploded and data updated successfully",code:200,success:true})
    } catch (error) {
        next(error)
    }
})
//Events
studentApiRoute.get("/events", verifyToken, async (req, res, next) => {
    try {
        const eventDocs=await Event.find({}).populate('organiser').lean()
        res.send({ data: eventDocs, message: 'success', code: 200, success: true })
    }
    catch (err) {
        next(err)
    }
})

//Issues
studentApiRoute.get("/issues", verifyToken, async (req, res, next) => {
    try {
        const user=new mongoose.Types.ObjectId(req.query.loggedUser);
        const eventDocs=await Issue.find({raisedBy:user}).populate('authority').populate('raisedBy').lean()
        res.send({ data: eventDocs, message: 'success', code: 200, success: true })
    }
    catch (err) {
        next(err)
    }
})

studentApiRoute.post("/add-issue", verifyToken, async (req, res, next) => {
    try {
        data = await Issue.create(req.body);
        res.send({ message: "Issue added successfully", code: 202, success: true });
    }
    catch (err) {
        next(err);
    }
})

studentApiRoute.put("/update-issue", verifyToken, async (req, res, next) => {
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

studentApiRoute.delete("/delete-issue/", verifyToken, async (req, res, next) => {
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

//Event Registration
studentApiRoute.get("/event-registrations", verifyToken, async (req, res, next) => {
    try {
        const user=new mongoose.Types.ObjectId(req.query.loggedUser);
        const events = await EventRegistration.find({user}).populate('user').populate('event').lean()
        // console.log(events)
        // const eventDocs=await Event.find({_id:{$in:events}}).lean()
        res.send({ data: events, message: 'success', code: 200, success: true })
    }
    catch (err) {
        next(err)
    }
})

studentApiRoute.post("/add-event-registration", verifyToken, async (req, res, next) => {
    try {
        req.body.user = new mongoose.Types.ObjectId(req.body.user)
        req.body.event = new mongoose.Types.ObjectId(req.body.event)
        let data=await EventRegistration.find({event: new mongoose.Types.ObjectId(req.body.event),user:new mongoose.Types.ObjectId(req.body.user)}).lean()
        console.log(data)
        if(data.length){
            res.send({ message: "Already Registered", code: 200, success: true });
            
        }
        data = await EventRegistration.create(req.body);
        res.send({ message: "Event Registration successfull", code: 200, success: true });
    }
    catch (err) {
        next(err);
    }
})

studentApiRoute.get("/leader-board", verifyToken, async (req, res, next) => {
    try {
        const leaderBoardDocs=await User.find({role:'student'}).sort({'score':-1}).lean()
        res.send({ data: leaderBoardDocs, message: 'success', code: 200, success: true })
    }
    catch (err) {
        next(err)
    }
})




module.exports = studentApiRoute;
