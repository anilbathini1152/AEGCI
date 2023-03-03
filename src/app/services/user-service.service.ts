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

  register(body:any):Observable<any>{
    return this.http.post("/register",body);
  }

  login(body:any):Observable<any>{
    return this.http.post("/login",body);
  }

  logout():any{
    localStorage.clear();
    this.router.navigate(['/login'])
  }
}
