import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { Observable,throwError } from 'rxjs';
import { catchError, filter, take, switchMap, tap } from 'rxjs/operators';
import { UserServiceService } from './user-service.service';


@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService {

  constructor(
    private router: Router,
    private toastService: ToastrService,
    private userService : UserServiceService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(tap(res=>{
      if(res instanceof HttpResponse){
        console.log(res)
        if(res.body && !res.body.success){
          if(res.body.code === 1004 || res.body.code ==1002){
            this.toastService.error("Token Expired Relogin again to continue")
            alert(req.body.message)
            this.userService.logout();
            this.router.navigate(['/login']);
          } 
          if(res.body.code === 404){
            this.toastService.error(req.body.message)
            alert(req.body.message)
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
