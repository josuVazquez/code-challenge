import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { AppModule } from 'src/app/app.module';
import { SpinnerService } from './service/spinner.service';
import { SpinnerComponent } from './spinner.component';

describe('SpinnerComponent', () => {
  let component: SpinnerComponent;
  let fixture: ComponentFixture<SpinnerComponent>;
  let spinnerService: any;
  let el: DebugElement;
  
  let sub = new BehaviorSubject(false);
  beforeEach(async () => {
    const mockSpinnerService = jasmine.createSpyObj('SpinnerService', ['isSpinnerOpen']);
    await TestBed.configureTestingModule({
      declarations: [ SpinnerComponent ],
      imports: [
        AppModule
      ],
      providers: [
        { provide: SpinnerService, useValue: mockSpinnerService }
      ]
    })
    .compileComponents();
    spinnerService = TestBed.inject(SpinnerService)
    spinnerService.isSpinnerOpen.and.returnValue(sub.asObservable());

    fixture = TestBed.createComponent(SpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    el = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('spinner should show', () => {
    sub.next(true)
    fixture.detectChanges()
    const spinner = el.queryAll(By.css('.mat-progress-spinner'));
    expect(spinner.length).toBe(1);
  });
  
  it('spinner should not show', () => {
    sub.next(false)
    fixture.detectChanges()
    const spinner = el.queryAll(By.css('.mat-progress-spinner'));
    expect(spinner.length).toBe(0);
  });
});
