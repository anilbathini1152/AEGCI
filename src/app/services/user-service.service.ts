import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http: HttpClient) { }

  register(body:any):Observable<any>{
    return this.http.post("/register",body);
  }

  login(body:any):Observable<any>{
    return this.http.post("/login",body);
  }
}
