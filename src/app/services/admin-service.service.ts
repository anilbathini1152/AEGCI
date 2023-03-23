import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ObjectIdExtended } from 'bson';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

  basePath="/admin"
  constructor(
    private router:Router,
    private http: HttpClient,
  ) { }

  //Users

  addUser(data:{}):Observable<any>{
    return this.http.post(this.basePath+"/add-user",data);
  }

  getUsers():Observable<any>{
    return this.http.get(this.basePath+"/users");
  }

  updateUser(data:{}):Observable<any>{
    return this.http.put(this.basePath+"/updateuser",data)
  }

  deleteUser(params:any):Observable<any>{
    return this.http.delete(this.basePath+"/deleteuser",{params:params})
  }

} 
