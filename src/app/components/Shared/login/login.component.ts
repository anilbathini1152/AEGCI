import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
    private toastService: ToastrService,

  ) { }

  ngOnInit(): void {
    this.toastService.info("Hello login here")
  }
  
  onSubmit():void{
    console.log(this.data)
    this.userService.login(this.data).subscribe(
      data=>{
        if(data.success){
          console.log(data)
          localStorage.clear();
          localStorage.setItem("token",data.jwt)
          localStorage.setItem("user",JSON.stringify(data.userObj))
          if(data?.userObj?.role.toString()==="admin"){
            this.router.navigateByUrl("/admin")
          }
          else{
            console.log("adlfhdakj")
          } 
        }
        else{
          console.log("error",data)
        this.toastService.error(data.message)

        }
        
        // this.router.navigateByUrl("/authority")
      },
      err=>{
        this.toastService.error(err.message)
        console.log("Error Occured",err);
      }
    )
  }

}
