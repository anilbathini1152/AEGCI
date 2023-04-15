import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthorityService } from 'src/app/services/authority.service';
import { UserServiceService } from 'src/app/services/user-service.service';
import {user,event,issue} from '../../../models/models'
@Component({
  selector: 'app-authority-issue-dashboard',
  templateUrl: './authority-issue-dashboard.component.html',
  styleUrls: ['./authority-issue-dashboard.component.scss']
})
export class AuthorityIssueDashboardComponent implements OnInit {
  public dialogRef!:any ;

  constructor(
    public dialog: MatDialog,
    private userService:UserServiceService,
    private service:AuthorityService,
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
  
  getIssues(){
    this.issues=[];
    this.service.getIssue().subscribe(res=>{
      if(res.success){
        this.issues=res.data
      }
    })
  }

  
  rectifyIssue(issue:issue){
    this.service.completeIssue(issue).subscribe(res=>{
      if(res.success){
        alert(res.message)
        this.getIssues()
      }
    })
  }


}
