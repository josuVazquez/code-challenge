import { HttpClient, HttpRequest } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { SpinnerService } from '../components/spinner/service/spinner.service';
import { SpinnerInterceptor } from './spinner.interceptor';
import { finalize } from 'rxjs/operators';


describe('SpinnerInterceptor', () => {
  let client: HttpClient
  let controller: HttpTestingController
  let interceptor: SpinnerInterceptor;
  let spinnerService: any;

  beforeEach(async () => {
    const mockSpinnerService = jasmine.createSpyObj('SpinnerService', ['open', 'close']);
    await TestBed.configureTestingModule({
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
