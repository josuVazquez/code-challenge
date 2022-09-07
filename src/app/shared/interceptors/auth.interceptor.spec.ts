import { HttpClient, HttpRequest } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { AuthInterceptor } from './auth.interceptor';

describe('AuthInterceptor', () => {
  let client: HttpClient
  let controller: HttpTestingController
  let interceptor: AuthInterceptor;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        AuthInterceptor,
      ],
    });
  
    client = TestBed.inject(HttpClient)
    controller = TestBed.inject(HttpTestingController)
    interceptor = TestBed.inject(AuthInterceptor)
  });

  it('should be created', () => {
    // const interceptor: AuthInterceptor = TestBed.inject(AuthInterceptor);
    expect(interceptor).toBeTruthy();
  });

  it('should add header to request', (done) => {
    const next: any = {
      _handle: (request: HttpRequest<any>) => {
        expect(request.headers.has('Authorization')).toBeTruthy();
        expect(request.headers.get('Authorization')).toEqual('Bearer TEST');
        return of({ hello: 'world' });
      },
      get handle() {
        return this._handle;
      },
      set handle(value) {
        this._handle = value;
      },
    };
    localStorage.setItem('token', 'TEST');
    const req = new HttpRequest<any>('GET', 'http://localhost:8080/test');
    interceptor.intercept(req, next).subscribe(obj => done());
  });

  it('should not add header to request', (done) => {
    const next: any = {
      _handle: (request: HttpRequest<any>) => {
        expect(request.headers.has('Authorization')).toBeFalsy();
        return of({ hello: 'world' });
      },
      get handle() {
        return this._handle;
      },
      set handle(value) {
        this._handle = value;
      },
    };
    localStorage.setItem('token', '');
    const req = new HttpRequest<any>('GET', 'http://localhost:8080/test');
    interceptor.intercept(req, next).subscribe(obj => done());
  });
});



/*
describe('SpinnerInterceptor', () => {
  let client: HttpClient
  let controller: HttpTestingController
  let interceptor: SpinnerInterceptor;
  let spinnerService: any;

  beforeEach(() => {
    const mockSpinnerService = jasmine.createSpyObj('SpinnerService', ['open', 'close']);
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        SpinnerInterceptor,
        { provide: SpinnerService, useValue: mockSpinnerService }
      ],
    })

    spinnerService = TestBed.inject(SpinnerService)
    client = TestBed.inject(HttpClient)
    controller = TestBed.inject(HttpTestingController)
    interceptor = TestBed.inject(SpinnerInterceptor)
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should open and close the spinner', (done) => {
    const next: any = {
      handle: (request: HttpRequest<any>) => {
        expect(interceptor.spinnerCount).toBeTruthy();
        return of({ hello: 'world' });
      }
    };

    const req = new HttpRequest<any>('GET', 'http://localhost:8080/test');
    interceptor.intercept(req, next).pipe(finalize(() => {
      expect(interceptor.spinnerCount).toBeFalsy();
    })).subscribe(() => {
      done();
    });

  })

});

*/

/*
    expect((interceptor as any) instanceof AddHeaderInterceptor).toBeTruthy();
    const next: any = {
      handle: (request: HttpRequest<any>) => {
        expect(request.headers.has('Authorization')).toBeTruthy();
        expect(request.headers.get('Authorization')).toEqual('Bearer TESTO');
        return Observable.of({ hello: 'world' });
      }
    };
    const req = new HttpRequest<any>('GET', config.getValue('baseUrl') + 'test');
    interceptor.intercept(req, next).subscribe(obj => done());
*/