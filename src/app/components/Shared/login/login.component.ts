import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  data={
    'username':'',
    'password':''
  }

  constructor(
    private userService:UserServiceService,
    private router:Router,
  ) { }

  ngOnInit(): void {
  }
  
  onSubmit():void{
    console.log(this.data)
    this.userService.login(this.data).subscribe(
      data=>{
        console.log(data)
        localStorage.setItem("token",data.jwt)
        localStorage.setItem("user",JSON.stringify(data.userObj))
        if(data.userObj.role.toString()==="Admin"){
          this.router.navigateByUrl("/admin")
        }
        else{
          console.log("adlfhdakj")
        }
        
        // this.router.navigateByUrl("/authority")
      },
      err=>{
        console.log("Error Occured",err);
      }
    )
  }

}
