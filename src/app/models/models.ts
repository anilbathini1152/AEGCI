export interface user {
    _id?:String,
    firstName:string,
    lastName:string,
    email:string,
    userName:string,
    role:string,
    mobileNo:string,
    gender:string,
    password:string,
    score:number    
}

export interface event{
    _id?:String,
    name:String,
    description:String,
    type:String,
    place:String,
    date:Date,
    amount:number,
    organiser:user,
    createdAt:Date,
    score:Number,
}

export interface eventuser{
    _id:String,
    user:user,
    event:event,
    state:String,
    enroledAt:Date,
    finshedAt:Date,
    verifiedAt:Date
}

export interface issue{
    _id?:String,
    description:String,
    authority:user,
    raisedBy:String,
    createdAt:Date,
    priority:String
}
