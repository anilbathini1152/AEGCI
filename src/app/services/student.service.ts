import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  basePath= environment.apiUrl + "/student"
  constructor(
    private router:Router,
    private http: HttpClient,
  ) { }

  //Events
  getEvents():Observable<any>{
    return this.http.get(this.basePath+"/events");
  }

  //Issues
  getIssues():Observable<any>{
    return this.http.get(this.basePath+'/issues');
  }

  addIssues(body:any):Observable<any>{
    return this.http.post(this.basePath+"/add-issue",body)
  }

  // updateIssue(body:any):Observable<any>{
  //   return this.http.post(this.basePath+"/update-issue",body)
  // }

  deleteIssue(params:any):Observable<any>{
    return this.http.delete(this.basePath+"/delete-issue",{params:params})
  }

  //Event Registrations
  getEvetRegistration():Observable<any>{
    return this.http.get(this.basePath+"/event-registrations")
  }

  addEventRegistration(body:any):Observable<any>{
    return this.http.post(this.basePath+"/add-event-registration",body)
  }

  //LeaderBoard
  getLeaderBoardDetails():Observable<any>{
    return this.http.get(this.basePath+"/leader-board")
  }

  upload(formData:any):Observable<any>{
    return this.http.post(this.basePath+'/upload', formData)
  }

  completeTask(data:any):Observable<any>{
    return this.http.put(this.basePath+'/complete-task',data)
  }
}
