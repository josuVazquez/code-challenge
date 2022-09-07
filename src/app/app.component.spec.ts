import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { TransactionsModule } from './modules/transactions/transactions.module';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppModule,
        TransactionsModule,
        RouterTestingModule.withRoutes([    {
          path: 'transactions',
          loadChildren: () => import('./modules/transactions/transactions.module').then(m => m.TransactionsModule),
        },
        {
          path: 'login',
          loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule)
        },
        { path: '**', redirectTo: 'transactions' }
      ])
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });


});
