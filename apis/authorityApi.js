const exp = require("express");
const authorityApiRoute = exp.Router();
const bcrypt = require("bcrypt");
authorityApiRoute.use(exp.json())
const ObjectId = require("mongodb").ObjectId
const verifyToken = require("../middlewares/tokenVerification")
const mongoose = require("mongoose")
const User = require("../mongo Models/user")
const Event = require("../mongo Models/event")
const Issue = require("../mongo Models/issue")
const EventRegistration = require("../mongo Models/eventuser")
const { getFileStream }=require("../s3")


authorityApiRoute.get("/images/:key", (req,res)=>{
    try{
        const key=req.params.key;
        const readStream=getFileStream(key)
        readStream.pipe(res)
    }
    catch(err){
        res.send({message:"Error reading file",code:404,success:false})
    }
})
//Events

authorityApiRoute.get("/events", verifyToken, async (req, res, next) => {
    try {
        const userId=new mongoose.Types.ObjectId(req.query.loggedUser);
        const events = await Event.find({organiser:userId}).populate("organiser").lean();
        res.send({ data: events, message: 'success', code: 200, success: true })
    }
    catch (err) {
        next(err)
    }
})

authorityApiRoute.post("/add-event", verifyToken, async (req, res, next) => {
    try {
        req.body.organiser = new mongoose.Types.ObjectId(req.query.loggedUser)
        data = await Event.create(req.body);
        res.send({ message: "Event Added successfully", code: 202, success: true });
    }
    catch (err) {
        next(err);
    }
})

authorityApiRoute.put("/update-event", verifyToken, async (req, res, next) => {
    try {
        let eid = new mongoose.Types.ObjectId(req.body._id);
        data = await Event.findOne({ _id: eid })
        delete req.body._id
        if (data == null)
            res.send({ message: "Event not found", code: 404, success: false })
        else {
            await Event.updateOne({ _id: eid }, {
                $set: {
                    ...req.body
                }
            });
            res.send({ message: "Event updated successfully", code: 202, success: true })
        }
    }
    catch (err) {
        next(err)
    }
})

authorityApiRoute.delete("/delete-event/", verifyToken, async (req, res, next) => {
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


//Issues
authorityApiRoute.get("/issues", verifyToken, async (req, res, next) => {
    try {
        const userId=new mongoose.Types.ObjectId(req.query.loggedUser)
        const issues = await Issue.find({authority:userId}).populate('authority').populate('raisedBy').lean();
        res.send({ data: issues, message: 'success', code: 200, success: true })
    }
    catch (err) {
        next(err)
    }
})

authorityApiRoute.put("/complete-issue", verifyToken, async (req, res, next) => {
    try {
        let eid = new mongoose.Types.ObjectId(req.body._id);
        data = await Issue.findOne({ _id: eid })
        delete req.body._id
        if (data == null)
            res.send({ message: "Issue not found", code: 404, success: false })
        else {
            await Issue.updateOne({ _id: eid }, {
                $set: {
                    state:"RECTIFIED",
                    compleatedAt:new Date(Date.now())
                }
            });
            res.send({ message: "Issue rectified successfully", code: 202, success: true })
        }
    }
    catch (err) {
        next(err)
    }
})


//Event Registrations

authorityApiRoute.get("/event-registrations", verifyToken, async (req, res, next) => {
    try {
        const userId=new mongoose.Types.ObjectId(req.query.loggedUser)
        const events=await Event.distinct("_id",{organiser:userId})
        // console.log(events)
        const registrations=await EventRegistration.find({event:{$in:events}}).populate("user").populate('event')
        res.send({ data: registrations, message: 'success', code: 200, success: true })
    }
    catch (err) {
        next(err)
    }
})

authorityApiRoute.put("/change-status", verifyToken, async (req, res, next) => {
    try {
        let eid = new mongoose.Types.ObjectId(req.body._id);
        data = await EventRegistration.findOne({ _id: eid })
        delete req.body._id
        req.body.user=req.body.user._id
        req.body.event=req.body.event._id
        
        if (data == null)
        res.send({ message: "event-registration not found", code: 404, success: false })
        else {
            if(req.body.state==="VERIFIED"){
                const event=new mongoose.Types.ObjectId(req.body.event)
                const user=new mongoose.Types.ObjectId(req.body.user)
                const userDoc=await User.findOne({_id:user})
                const score=await Event.distinct('score',{_id:event})
                await User.updateOne({ _id: user }, {
                    $set: {
                        score:(userDoc.score+score)
                    }
                });
            }
            await EventRegistration.updateOne({ _id: eid }, {
                $set: {
                    ...req.body
                }
            });
            res.send({ message: "event-registration state updated successfully", code: 202, success: true })
        }
    }
    catch (err) {
        next(err)
    }
})


authorityApiRoute.delete("/delete-event-registration/", verifyToken, async (req, res, next) => {
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





module.exports = authorityApiRoute;
