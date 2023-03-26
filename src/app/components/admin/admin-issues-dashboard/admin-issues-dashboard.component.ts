import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import { UserServiceService } from 'src/app/services/user-service.service';
import {user,event,issue} from '../../../models/models'

@Component({
  selector: 'app-admin-issues-dashboard',
  templateUrl: './admin-issues-dashboard.component.html',
  styleUrls: ['./admin-issues-dashboard.component.scss']
})
export class AdminIssuesDashboardComponent implements OnInit {

  public dialogRef!:any ;

  constructor(
    public dialog: MatDialog,
    private userService:UserServiceService,
    private adminService:AdminServiceService,
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
    raisedBy:"",
    priority:"",
}

  emptyTemplate:issue={
    description:"",
    authority:this.userTemplate,
    raisedBy:"",
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
    this.adminService.getIssue().subscribe(res=>{
      if(res.success){
        this.issues=res.data
      }
    })
  }

  createIssue(issue:any){
    issue.authority="641fcf18432e60cf91a4a3b4"
    issue.raisedBy=this.currentUser.role
    console.log(issue)
    this.adminService.addIssue(issue).subscribe(res=>{
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

  editIssue(issue:any){
    this.adminService.updateIssue(issue).subscribe(res=>{
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
    this.adminService.deleteIssue(params).subscribe(res=>{
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
