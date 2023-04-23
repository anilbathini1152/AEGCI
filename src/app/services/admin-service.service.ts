import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

  basePath= environment.apiUrl + "/admin"
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
    return this.http.put(this.basePath+"/update-user",data)
  }

  deleteUser(params:any):Observable<any>{
    return this.http.delete(this.basePath+"/delete-user",{params:params})
  }

  // Events
  addEvent(data:{}):Observable<any>{
    return this.http.post(this.basePath+"/add-event",data);
  }

  getEvents():Observable<any>{
    return this.http.get(this.basePath+"/events");
  }

  updateEvent(data:{}):Observable<any>{
    return this.http.put(this.basePath+"/update-event",data)
  }

  deleteEvent(params:any):Observable<any>{
    return this.http.delete(this.basePath+"/delete-event",{params:params})
  }

  //Issues

  addIssue(data:{}):Observable<any>{
    return this.http.post(this.basePath+"/add-issue",data);
  }

  getIssue():Observable<any>{
    return this.http.get(this.basePath+"/issues");
  }

  updateIssue(data:{}):Observable<any>{
    return this.http.put(this.basePath+"/update-issue",data)
  }

  deleteIssue(params:any):Observable<any>{
    return this.http.delete(this.basePath+"/delete-issue",{params:params})
  }

  //Event Registrations
  addEventRegistration(data:{}):Observable<any>{
    return this.http.post(this.basePath+"/add-event-registration",data);
  }

  getEventRegistration():Observable<any>{
    return this.http.get(this.basePath+"/event-registrations");
  }

  updateEventRegistration(data:{}):Observable<any>{
    return this.http.put(this.basePath+"/update-event-registration",data)
  }

  deleteEventRegistration(params:any):Observable<any>{
    return this.http.delete(this.basePath+"/delete-event-registration",{params:params})
  }

  //support routes
  getAdminUsers():Observable<any>{
    return this.http.get(this.basePath+"/get-admin-users");
  }
  getAuthorityUsers():Observable<any>{
    return this.http.get(this.basePath+"/get-authority-users");
  }
  getStudentUsers():Observable<any>{
    return this.http.get(this.basePath+"/get-student-users");
  }
} 
