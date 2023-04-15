import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserServiceService } from 'src/app/services/user-service.service';
import {user,event} from '../../../models/models'
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-student-events-dashboard',
  templateUrl: './student-events-dashboard.component.html',
  styleUrls: ['./student-events-dashboard.component.scss']
})
export class StudentEventsDashboardComponent implements OnInit {

  public dialogRef!:any ;

  constructor(
    public dialog: MatDialog,
    private userService:UserServiceService,
    private service:StudentService,
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

  registerEvent(event:event){
    let params={
      event:event._id,
      user:this.currentUser._id
    }
    this.service.addEventRegistration(params).subscribe(res=>{
      if(res.success){
        alert(res.message)
      }
    })
  }


}
