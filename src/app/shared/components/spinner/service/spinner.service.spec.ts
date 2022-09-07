import { TestBed } from '@angular/core/testing';
import { skip } from 'rxjs';

import { SpinnerService } from './spinner.service';

describe('SpinnerService', () => {
  let service: SpinnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpinnerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should spinner show', done => {
    const observer = service.isSpinnerOpen();
    observer.pipe(skip(1)).subscribe( open => {
      expect(open).toBeTrue();
      done();
    });
    service.open();
  })
  
  it('should spinner hide', done => {
    const observer = service.isSpinnerOpen();
    observer.pipe(skip(1)).subscribe( open => {
      expect(open).toBeFalse();
      done();
    });
    service.close();
  })

  it('should return obeservable', () => {
    const observer = service.isSpinnerOpen();
    expect(observer).toBeTruthy();
  })
});

