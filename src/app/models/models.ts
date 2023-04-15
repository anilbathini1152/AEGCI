import {  SafeUrl } from '@angular/platform-browser';
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
    date:Date|null,
    amount:number,
    organiser:user,
    createdAt?:Date,
    score:Number,
}

export interface eventuser{
    _id?:String,
    user:user,
    event:event,
    state?:String,
    enroledAt?:Date,
    finishedAt?:Date,
    verifiedAt?:Date,
    url?:String,
    safeUrl?:SafeUrl
}

export interface issue{
    _id?:String,
    description:String,
    authority:user,
    raisedBy:user,
    createdAt?:Date,
    priority:String,
    state?:String,
    compleatedAt?:Date,
}
