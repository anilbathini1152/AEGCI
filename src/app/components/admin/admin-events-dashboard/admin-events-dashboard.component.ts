import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import { UserServiceService } from 'src/app/services/user-service.service';
import {user,event} from '../../../models/models'

@Component({
  selector: 'app-admin-events-dashboard',
  templateUrl: './admin-events-dashboard.component.html',
  styleUrls: ['./admin-events-dashboard.component.scss']
})
export class AdminEventsDashboardComponent implements OnInit {

  public dialogRef!:any ;

  constructor(
    public dialog: MatDialog,
    private userService:UserServiceService,
    private adminService:AdminServiceService,
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
    this.getAdminUsers();
    this.getAuthorityUsers();
    this.getStudentUsers();
    this.getCurrentUser();
  }

  getCurrentUser(){
    this.currentUser=JSON.parse(localStorage.getItem('user') || "")
  }
  getAdminUsers(){
    this.adminService.getAdminUsers().subscribe((res)=>{
      if(res.success){
        this.adminUsers=res.data
      }
    })
  }
  getStudentUsers(){
    this.adminService.getAdminUsers().subscribe((res)=>{
      if(res.success){
        this.studentUsers=res.data
      }
    })
  }
  getAuthorityUsers(){
    this.adminService.getAdminUsers().subscribe((res)=>{
      if(res.success){
        this.authorityUsers=res.data
      }
    })
  }

  getEvents(){
    this.events=[];
    this.adminService.getEvents().subscribe(res=>{
      if(res.success){
        this.events=res.data
      }
    })
  }

  createEvent(event:any){
    event.date=new Date(event.date);
    event.organiser=this.currentUser._id
    console.log(event)
    this.adminService.addEvent(event).subscribe(res=>{
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
  
    this.adminService.updateEvent(event).subscribe(res=>{
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
    this.adminService.deleteEvent(params).subscribe(res=>{
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
