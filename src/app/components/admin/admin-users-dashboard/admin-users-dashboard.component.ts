import { Component, OnInit } from '@angular/core';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-admin-users-dashboard',
  templateUrl: './admin-users-dashboard.component.html',
  styleUrls: ['./admin-users-dashboard.component.scss']
})
export class AdminUsersDashboardComponent implements OnInit {


  constructor(
    private userService:UserServiceService,
  ) { }

  users=[
    {
      firstName:"Anil",
      lastName:'Bathini',
      email:'anil@gmail.com',
      userName:'anilBathini',
      role:'authority',
      name:""
    }, {
      firstName:"Hari",
      lastName:'Teja',
      email:'hari@gmail.com',
      userName:'Hariteja',
      role:'authority',
      name:""
    }, {
      firstName:"Anil",
      lastName:'Bathini',
      email:'anil@gmail.com',
      userName:'anilBathini',
      role:'student',
      name:""
    }, {
      firstName:"Anil",
      lastName:'Bathini',
      email:'anil@gmail.com',
      userName:'anilBathini',
      role:'student',
      name:""
    }
  ]
  ngOnInit(): void {
    this.userService.authenticate()
    this.getUsers();
  }

  formatUsers(users:any){
    for(let user of users){
      user.name=user.firstName+" "+user.lastName
    }
  }

  getUsers(){
    this.formatUsers(this.users)
  }

  createUser(){

  }

  editUser(user:any){
    console.log(user)
  }

  deleteUser(user:any){
    
  }

}
