import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { AlertService } from '../components/alert/service/alert.service';

import { ErrorInterceptor } from './error.interceptor';

describe('ErrorInterceptor', () => {
  let alertService: any;
  let routerService: any;
  let client: HttpClient
  let controller: HttpTestingController
  let interceptor: ErrorInterceptor;

  beforeEach(async () => {
    const mockAlertService = jasmine.createSpyObj('AlerService', ['error']);
    const mockRouterService = jasmine.createSpyObj('Router', ['navigate']);
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        ErrorInterceptor,
        { provide: AlertService, useValue: mockAlertService },
        { provide: Router, useValue: mockRouterService }
      ],
    })

    alertService = TestBed.inject(AlertService);
    routerService = TestBed.inject(Router);
    client = TestBed.inject(HttpClient)
    controller = TestBed.inject(HttpTestingController)
    interceptor = TestBed.inject(ErrorInterceptor)
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  afterEach(() => {
    controller.verify();
  });

  it('should open error alert', (done) => {
    let httpRequestSpy = jasmine.createSpyObj('HttpRequest', ['doesNotMatter']);
    let httpHandlerSpy = jasmine.createSpyObj('HttpHandler', ['handle']);
    httpHandlerSpy.handle.and.returnValue(throwError(() => new HttpErrorResponse({ status: 401 })));
    interceptor.intercept(httpRequestSpy, httpHandlerSpy).subscribe({
      next: () => console.log('next'),
      error: (error) => {
        expect(alertService.error).toHaveBeenCalled();
        expect(routerService.navigate).toHaveBeenCalled();
        done();
      },
      complete: () => {
        done();
      }
    })
  })

  it('should not open error alert', (done) => {
    let httpRequestSpy = jasmine.createSpyObj('HttpRequest', ['doesNotMatter']);
    let httpHandlerSpy = jasmine.createSpyObj('HttpHandler', ['handle']);
    httpHandlerSpy.handle.and.returnValue(throwError(() => new HttpErrorResponse({ status: 500 })));
    interceptor.intercept(httpRequestSpy, httpHandlerSpy).subscribe({
      next: () => console.log('next'),
      error: (error) => {
        expect(alertService.error).not.toHaveBeenCalled();
        done();
      },
      complete: () => {
        done();
      }
    })
  })
});
