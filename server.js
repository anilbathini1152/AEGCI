
const exp=require("express");
const { moveCursor } = require("readline");
const app=exp();
const mc=require("mongodb").MongoClient;
const dburl="mongodb+srv://anilbathini1152:Anil@1234@cluster0.5nbdt1f.mongodb.net/?retryWrites=true&w=majority"

const path=require("path")
app.use( exp.static(path.join(__dirname,"dist/tour-of-heroes")))
let dbobj;

// Using Callbacks
// mc.connect(dburl,{useNewUrlParser:true,useUnifiedTopology:true},(err,cli)=>{
//     if(err){
//         console.log("error connecting ot db",err);
//     }
//     else{
//         dbobj=cli.db("TourOfHeroes")
//         app.locals.databaseObj=dbobj;
//         console.log("Succcessfully connected to db")
//     }
// })


mc.connect(dburl,{useNewUrlParser:true,useUnifiedTopology:true}).
then((cli)=>{
    // dbobj=cli.db("TourOfHeroes")
    // app.locals.databaseheroesObj=dbobj.collection("heroes");
    // app.locals.databaseusersObj=dbobj.collection("users");
    console.log("Succcessfully connected to db")
}).catch((err)=>{
    console.log("Error Occured",err)
})





const userApiRoute=require("./apis/UserApi");
app.use("",userApiRoute);

const port=5000;
app.listen(port,()=>{
    console.log(`server listening on ${port}`);
})

