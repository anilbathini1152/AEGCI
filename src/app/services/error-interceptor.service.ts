import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable,throwError } from 'rxjs';
import { catchError, filter, take, switchMap, tap } from 'rxjs/operators';
import { UserServiceService } from './user-service.service';


@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService {

  constructor(
    private router: Router,
    private userService : UserServiceService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("kjfdsj")
    return next.handle(req).pipe(tap(res=>{
      if(res instanceof HttpResponse){
        if(res.body && !res.body.success){
          if(res.body.code === 1004 || res.body.code ==1002){
            console.log("asdjhfdkja")
            this.userService.logout();
            this.router.navigate(['/login']);
          }    
        }
      }
    })
    ,catchError(err=>{
        this.userService.logout();
        return throwError(err);
    }))
  }
}
