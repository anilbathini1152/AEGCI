import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserServiceService } from 'src/app/services/user-service.service';
import {user,event,issue} from '../../../models/models'
import { StudentService } from 'src/app/services/student.service';
import { AdminServiceService } from 'src/app/services/admin-service.service';

@Component({
  selector: 'app-student-issues-dashboard',
  templateUrl: './student-issues-dashboard.component.html',
  styleUrls: ['./student-issues-dashboard.component.scss']
})
export class StudentIssuesDashboardComponent implements OnInit {
  public dialogRef!:any ;

  constructor(
    public dialog: MatDialog,
    private userService:UserServiceService,
    private service:StudentService,
    private adminService:AdminServiceService
  ) { }

  prioritys=[
    {name:"low"},
    {name:"medium"},
    {name:"high"}
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

  issueTemplate:issue={
    description:"",
    authority:this.userTemplate,
    raisedBy:this.userTemplate,
    priority:"",
}

  emptyTemplate:issue={
    description:"",
    authority:this.userTemplate,
    raisedBy:this.userTemplate,
    priority:"",
}

   
  issues:issue[]=[]
  adminUsers:user[]=[]
  studentUsers:user[]=[]
  authorityUsers:user[]=[]
  currentUser!:user;
  ngOnInit(): void {
    this.userService.authenticate()
    this.getIssues();
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
    this.adminService.getStudentUsers().subscribe((res)=>{
      if(res.success){
        this.studentUsers=res.data
      }
    })
  }
  getAuthorityUsers(){
    this.adminService.getAuthorityUsers().subscribe((res)=>{
      if(res.success){
        this.authorityUsers=res.data
      }
    })
  }

  getIssues(){
    this.issues=[];
    this.service.getIssues().subscribe(res=>{
      if(res.success){
        this.issues=res.data
      }
    })
  }

  createIssue(issue:any){
    issue.authority="641fcf18432e60cf91a4a3b4"
    issue.raisedBy=this.currentUser._id
    console.log(issue)
    this.service.addIssues(issue).subscribe(res=>{
      this.issueTemplate=this.emptyTemplate
      if(res.success){
        alert(res.message)
        this.issues=[]
        this.getIssues()
      }
      else{
        alert(res.message)
      }
    })
  }

  // editIssue(issue:any){
  //   this.service.updateIssue(issue).subscribe(res=>{
  //     this.issueTemplate=this.emptyTemplate
  //     if(res.success){
  //       alert(res.message)
  //       this.issues=[]
  //       this.getIssues()
  //     }
  //     else{
  //       alert(res.message)
  //     }
  //   })
  // }
  
  setAssignIssue(issue:issue){
    this.issueTemplate=issue
  }
  setIssueDetailstoedit(issue:issue){
    this.issueTemplate=issue;
  }

  setDeleteIssue(issue:any){
    this.issueTemplate=issue;
  }

  deleteIssue(issue:any){
    const params={
      issueId:issue._id
    }
    console.log(params)
    this.service.deleteIssue(params).subscribe(res=>{
      if(res.success){
        this.issues=[]
        this.getIssues();
        alert(res.message)
      }
      else{
        alert(res.message)
      }
    })
  }


}
