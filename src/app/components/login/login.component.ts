import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private userService:UserServiceService,
    private router:Router,
  ) { }

  ngOnInit(): void {
  }
  
  onSubmit(formRef:any):void{
    console.log(formRef.value)
    this.userService.login(formRef.value).subscribe(
      data=>{
        console.log(data)
        localStorage.setItem("token",data.jwt)
        localStorage.setItem("user",JSON.stringify(data.userObj))
        console.log(localStorage.getItem("user"))
        alert(data.message);
        this.router.navigateByUrl("/dashboard")
      },
      err=>{
        console.log("Error Occured",err);
      }
    )
  }

}
