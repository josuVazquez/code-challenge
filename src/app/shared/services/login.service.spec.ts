import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TransactionsComponent } from 'src/app/modules/transactions/pages/transactions/transactions.component';
import { LoginComponent } from 'src/app/modules/login/pages/login/login.component';

export const userInfo = {
  accessToken: "amPuVeGm4ucm/qwA8q6g3FR57f7TYj1PKjwTpzMZBiY="
};

describe('LoginService', () => {
  let service: LoginService;
  let httpTestingController: HttpTestingController;
  let router: Router;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LoginService,
      ],
      imports: [HttpClientTestingModule,
        RouterTestingModule.withRoutes([  {
          path: 'transactions',
          component: TransactionsComponent,
        },
        {
          path: 'login',
          component: LoginComponent,
        },
        { path: '**', redirectTo: 'transactions' }])
      ]
    });
    service = TestBed.inject(LoginService);
    httpTestingController = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login', () => {
    service.login('','').subscribe( user => {
      expect(user).toBeTruthy();
      expect(user.accessToken).toBeTruthy();
    });
    const req = httpTestingController.expectOne('http://localhost:8080/token');
    expect(req.request.method).toEqual('POST');
    req.flush(userInfo)
  })

  it('should logOut', () => {
    localStorage.setItem('token', '123');
    service.logOut();
    const token = localStorage.getItem('token');
    expect(token).toBeFalsy();
  })
});
