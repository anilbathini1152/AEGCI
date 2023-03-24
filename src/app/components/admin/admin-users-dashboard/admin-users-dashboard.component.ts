import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import { UserServiceService } from 'src/app/services/user-service.service';
import {user} from '../../../models/users'

@Component({
  selector: 'app-admin-users-dashboard',
  templateUrl: './admin-users-dashboard.component.html',
  styleUrls: ['./admin-users-dashboard.component.scss']
})
export class AdminUsersDashboardComponent implements OnInit {


  public dialogRef!:any ;
  roles=[
    {name:"admin"},
    {name:'authority'},
    {name:'student'}
  ]


  constructor(
    public dialog: MatDialog,
    private userService:UserServiceService,
    private adminService:AdminServiceService,
  ) { }

  userTemplate:user={
    firstName:"",
    lastName:"",
    email:"",
    userName:"",
    role:"",
    mobileNo:"",
    gender:"",
    password:"",
  };

  emptyTemplate:user={
    firstName:"",
    lastName:"",
    email:"",
    userName:"",
    role:"",
    mobileNo:"",
    gender:"",
    password:"",
  };
   
  users:user[]=[]
  ngOnInit(): void {
    this.userService.authenticate()
    this.getUsers();
  }



  getUsers(){
    this.users=[];
    this.adminService.getUsers().subscribe(res=>{
      if(res.success){
        this.users=res.data
        console.log(this.users)
      }
    })
  }

  createUser(user:any){
    console.log(user)
    const data=user
    this.adminService.addUser(data).subscribe(res=>{
      this.userTemplate=this.emptyTemplate
      if(res.success){
        alert(res.message)
        this.users=[]
        this.getUsers()
      }
      else{
        alert(res.message)
      }
    })
  }

  editUser(user:any){
  
    this.adminService.updateUser(user).subscribe(res=>{
      this.userTemplate=this.emptyTemplate
      if(res.success){
        alert(res.message)
        this.users=[]
        this.getUsers()
      }
      else{
        alert(res.message)
      }
    })
  }
  
  setUserDetailstoedit(user:user){
    this.userTemplate=user;
  }

  setDeleteUser(user:any){
    this.userTemplate=user;
  }

  deleteUser(user:any){
    const params={
      userId:user._id
    }
    console.log(params)
    this.adminService.deleteUser(params).subscribe(res=>{
      if(res.success){
        this.users=[]
        this.getUsers();
        alert(res.message)
      }
      else{
        alert(res.message)
      }
    })
  }

}
