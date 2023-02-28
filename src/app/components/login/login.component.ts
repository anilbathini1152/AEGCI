import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  
  onSubmit(formRef:any):void{
    console.log(formRef)
  //   this.userService.login(formRef.value).subscribe(
  //     data=>{
  //       // console.log(data)
  //       localStorage.setItem("token",data.jwt)
  //       console.log("UsrObj",data.userObj)
  //       localStorage.setItem("user",JSON.parse(data.userObj))
  //       console.log(localStorage.getItem("user"))
  //       alert(data.message);
  //     },
  //     err=>{
  //       console.log("Error Occured",err);
  //     }
  //   )
  //   console.log(formRef.value);
  }

}
