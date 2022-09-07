import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { LoginService } from 'src/app/shared/services/login.service';
import { userInfo } from 'src/app/shared/services/login.service.spec';
import { LoginModule } from '../../login.module';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let el: DebugElement;
  
  let loginService: any; 
  let routerService: any;

  beforeEach(async () => {
    const mockLoginService = jasmine.createSpyObj('LoginService', ['login']);
    const mockRouterService = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [LoginModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: LoginService, useValue: mockLoginService },
        { provide: Router, useValue: mockRouterService }
      ]
    })
    .compileComponents();

    loginService = TestBed.inject(LoginService)
    routerService = TestBed.inject(Router)

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    el = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form should be invalid', () => {
    component.loginForm.setValue( {username: 'user', pass: null} );
    const form = el.query(By.css('.loginBox__form'));
    form.triggerEventHandler('submit', null);
    expect(loginService.login).not.toHaveBeenCalled();
  })

  it('form valid', () => {
    component.loginForm.setValue( {username: 'user', pass: 'pass'} );
    const form = el.query(By.css('.loginBox__form'));
    loginService.login.and.returnValue(of(userInfo));
    form.triggerEventHandler('submit', null);
    const token = localStorage.getItem('token');
    expect(token).toBeTruthy();
    expect(loginService.login).toHaveBeenCalled();
    expect(routerService.navigate).toHaveBeenCalled();
  })
});
