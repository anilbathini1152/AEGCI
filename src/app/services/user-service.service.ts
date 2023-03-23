import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ObjectIdExtended } from 'bson';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(
    private http: HttpClient,
    private router: Router,
    ) { }

  authenticate():any{
    let userObj=localStorage.getItem('user');
    let token=localStorage.getItem('token');
    if(!userObj || !token){
      this.router.navigate(['/login'])
    }

  }

  register(body:any):Observable<any>{
    return this.http.post("/register",body);
  }

  login(body:any):Observable<any>{
    return this.http.post("/login",body);
  }

  logout():any{
    localStorage.clear();
    alert("Logged Out SuccessFully")
    this.router.navigate(['/login'])
  }
}
