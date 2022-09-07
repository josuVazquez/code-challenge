import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  private spinnerSubject = new BehaviorSubject(false)
  constructor() { }

  open() {
    this.spinnerSubject.next(true);
  }

  close() {
    this.spinnerSubject.next(false);
  }

  isSpinnerOpen() {
    return this.spinnerSubject.asObservable();
  }
}
