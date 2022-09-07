import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { SpinnerService } from '../components/spinner/service/spinner.service';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {
  spinnerCount = 0;
  constructor(private spinnerService: SpinnerService ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.spinnerService.open();
    this.spinnerCount++;
    
    return next.handle(request).pipe(finalize(() => {
      this.spinnerCount--;
      if(this.spinnerCount === 0) {
        this.spinnerService.close();
      }
    }) );
  }
}
