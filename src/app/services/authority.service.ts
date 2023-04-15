import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthorityService {
  
  basePath="/authority"
  constructor(
    private router:Router,
    private http: HttpClient,
  ) { }


  getImage(key:String):Observable<any>{
    return this.http.get(this.basePath+"/images/"+key);
  }
  //Events 

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

  getIssue():Observable<any>{
    return this.http.get(this.basePath+"/issues");
  }

  completeIssue(body:{}):Observable<any>{
    return this.http.put(this.basePath+"/complete-issue",body)
  }


  //EventRegistrations
  getEventRegistration():Observable<any>{
    return this.http.get(this.basePath+"/event-registrations");
  }
  changeEventRegStatus(body:any):Observable<any>{
    return this.http.put(this.basePath+"/change-status",body)
  }
  deleteEventRegistration(params:any):Observable<any>{
    return this.http.delete(this.basePath+"/delete-event-registration",{params:params})
  }


}
