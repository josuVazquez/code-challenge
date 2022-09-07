import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from 'src/app/modules/login/pages/login/login.component';
import { TransactionsComponent } from 'src/app/modules/transactions/pages/transactions/transactions.component';

import { RouterStateSnapshot } from '@angular/router';

function fakeRouterState(url: string): RouterStateSnapshot {
  return {
    url,
  } as RouterStateSnapshot;
}

import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let router: Router;
  const dummyRoute = {} as ActivatedRouteSnapshot;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([  {
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

    router = TestBed.inject(Router);
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should be active', () => {
    localStorage.setItem('token', '1245');
    const canActivate = guard.canActivate(dummyRoute, fakeRouterState('transactions')); 
    expect(canActivate).toBeTrue();
  });

  it('should be inactive', () => {
    localStorage.setItem('token', '');
    const canActivate = guard.canActivate(dummyRoute, fakeRouterState('transactions')); 
    expect(canActivate).toBeFalse();
  });
});
