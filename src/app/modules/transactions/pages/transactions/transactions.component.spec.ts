import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { AlertService } from 'src/app/shared/components/alert/service/alert.service';
import { LoginService } from 'src/app/shared/services/login.service';
import { TransactionsService } from 'src/app/shared/services/transactions.service';
import { transactions } from 'src/app/shared/services/transactions.service.spec';
import { TransactionsModule } from '../../transactions.module';

import { TransactionsComponent } from './transactions.component';

describe('TransactionsComponent', () => {
  let component: TransactionsComponent;
  let fixture: ComponentFixture<TransactionsComponent>;
  let transactionService: any;
  let alertService: any;
  let loginService: any;
  let el: DebugElement;
  
  beforeEach(async () => {
    const mockTransactionsService = jasmine.createSpyObj('TransactionsService', ['getTransactions']);
    const mockLoginService = jasmine.createSpyObj('LoginService', ['logOut']);
    const mockAlertService = jasmine.createSpyObj('AlertService', ['info']);

    await TestBed.configureTestingModule({
      declarations: [ TransactionsComponent ],
      imports: [
        TransactionsModule,
        BrowserAnimationsModule,
      ],
      providers: [
        { provide: TransactionsService, useValue: mockTransactionsService },
        { provide: LoginService, useValue: mockLoginService },
        { provide: AlertService, useValue: mockAlertService }
      ]
    })
    .compileComponents();

    transactionService = TestBed.inject(TransactionsService)
    loginService = TestBed.inject(LoginService)
    alertService = TestBed.inject(AlertService)

    fixture = TestBed.createComponent(TransactionsComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should getTransactionsWork', () => {
    transactionService.getTransactions.and.returnValue(of(transactions.sort((a,b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    })));
    component.loadTransactions();

    fixture.detectChanges();
    const rows = el.queryAll(By.css('.mat-row'));
    expect(rows.length).toBe(15);
  })

  it('should findByFilter', () => {
    component.filterForm.setValue({ description: 'tempor', sort: 'asc' });
    transactionService.getTransactions.and.returnValue(of(transactions.filter((t) => {
      return t.description?.toLocaleLowerCase().includes('tempor');
    })));
    component.submitFilter();
    fixture.detectChanges();
    expect(transactionService.getTransactions).toHaveBeenCalledWith('asc', 'tempor');
    const rows = el.queryAll(By.css('.mat-row'));
    expect(rows.length).toBe(1);
  });

  it('should return empty and display message', () => {
    component.filterForm.setValue({ description: 'tempor12341251', sort: 'asc' });
    transactionService.getTransactions.and.returnValue(of(transactions.filter((t) => {
      return t.description?.toLocaleLowerCase().includes('tempor12341251');
    })));
    component.submitFilter();
    fixture.detectChanges();
    expect(transactionService.getTransactions).toHaveBeenCalledWith('asc', 'tempor12341251');
    const rows = el.queryAll(By.css('.mat-row'));
    expect(rows.length).toBe(0);
    expect(alertService.info).toHaveBeenCalled();
  });

  it('should logOutWork', () => {
    const button = el.query(By.css('#button--logout'));
    button.triggerEventHandler('click', null);
    expect(loginService.logOut).toHaveBeenCalled();
  });
});

