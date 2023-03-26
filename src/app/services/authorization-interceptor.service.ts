import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { user } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationInterceptorService implements HttpInterceptor{

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token=localStorage.getItem('token')
    let userObj=localStorage.getItem('user')
    let userId
    if(userObj)
      userId=JSON.parse(userObj || "")?._id
    if(token){
      let copyReqObj=req.clone({
        headers:req.headers.set("Authorization","Bearer "+token),
        params:req.params.set("loggedUser",userId)
      })
      return next.handle(copyReqObj)
    }
    else{
      return next.handle(req);
    }
  }

  
}
