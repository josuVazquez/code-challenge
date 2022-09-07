import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, Observable, of, throwError } from 'rxjs';
import { AlertService } from '../components/alert/service/alert.service';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(public alert: AlertService, private route: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
    catchError((error) => {
      if(error.status == 401) {
        localStorage.setItem('token','')
        this.alert.error('User not authorized');
        this.route.navigate(['login'])
        return throwError(() => new Error(`Unauthorized call`));
      }
      return throwError(() => new Error(`Http call error`));
  }));
  }
}
