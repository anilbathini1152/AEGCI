import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthorityService } from 'src/app/services/authority.service';
import { UserServiceService } from 'src/app/services/user-service.service';
import {user,event} from '../../../models/models'

@Component({
  selector: 'app-authority-events-dashboard',
  templateUrl: './authority-events-dashboard.component.html',
  styleUrls: ['./authority-events-dashboard.component.scss']
})
export class AuthorityEventsDashboardComponent implements OnInit {

  public dialogRef!:any ;

  constructor(
    public dialog: MatDialog,
    private userService:UserServiceService,
    private service:AuthorityService,
  ) { }

  eventTypes=[
    {name:"cultural"},
    {name:"tech"}
  ]

  userTemplate:user={
    firstName:"",
    lastName:"",
    email:"",
    userName:"",
    role:"",
    mobileNo:"",
    gender:"",
    password:"",
    score:0
  }; 

  eventTemplate:event={
    name:"",
    description:"",
    type:"",
    place:"",
    date:null,
    amount:0,
    organiser:this.userTemplate,
    score:0
}

  emptyTemplate:event={
    name:"",
    description:"",
    type:"",
    place:"",
    date:null,
    amount:0,
    organiser:this.userTemplate,
    score:0
}
   
  events:event[]=[]
  adminUsers:user[]=[]
  studentUsers:user[]=[]
  authorityUsers:user[]=[]
  currentUser!:user;
  ngOnInit(): void {
    this.userService.authenticate()
    this.getEvents();
    this.getCurrentUser();
  }

  getCurrentUser(){
    this.currentUser=JSON.parse(localStorage.getItem('user') || "")
  }
  
  getEvents(){
    this.events=[];
    this.service.getEvents().subscribe(res=>{
      if(res.success){
        this.events=res.data
      }
    })
  }

  createEvent(event:any){
    event.date=new Date(event.date);
    event.organiser=this.currentUser._id
    console.log(event)
    this.service.addEvent(event).subscribe(res=>{
      this.eventTemplate=this.emptyTemplate
      if(res.success){
        alert(res.message)
        this.events=[]
        this.getEvents()
      }
      else{
        alert(res.message)
      }
    })
  }

  editEvent(event:any){
  
    this.service.updateEvent(event).subscribe(res=>{
      this.eventTemplate=this.emptyTemplate
      if(res.success){
        alert(res.message)
        this.events=[]
        this.getEvents()
      }
      else{
        alert(res.message)
      }
    })
  }
  
  setEventDetailstoedit(event:event){
    this.eventTemplate=event;
  }

  setDeleteEvent(event:any){
    this.eventTemplate=event;
  }

  deleteEvent(event:any){
    const params={
      eventId:event._id
    }
    console.log(params)
    this.service.deleteEvent(params).subscribe(res=>{
      if(res.success){
        this.events=[]
        this.getEvents();
        alert(res.message)
      }
      else{
        alert(res.message)
      }
    })
  }



}
