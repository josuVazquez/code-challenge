import { TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';

import { AlertService } from './alert.service';
import { AppModule } from 'src/app/app.module';

describe('AlertService', () => {
  let service: AlertService;
  let matDialogService: any;

  beforeEach(() => {
    const mockMatDialog = jasmine.createSpyObj('MatDialog', ['open']);
    TestBed.configureTestingModule({
      providers: [
        AlertService,
        { provide: MatDialog, useValue: mockMatDialog }
      ],
      imports: [AppModule]
    });
    service = TestBed.inject(AlertService);
    matDialogService = TestBed.inject(MatDialog);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should display error alert', () => {
    service.error('test');
    expect(matDialogService.open).toHaveBeenCalledWith(jasmine.any(Function), { panelClass: 'alert-dialog', data: { type: 'error', message: 'test' } });
  })

  it('should display info alert', () => {
    service.info('test');
    expect(matDialogService.open).toHaveBeenCalledWith(jasmine.any(Function), { panelClass: 'alert-dialog', data: { type: 'info', message: 'test' } });
  })
});
