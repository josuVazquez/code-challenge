import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from '../alert.component';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(public dialog: MatDialog) { }

  error(message: string) {
    this.dialog.open(AlertComponent, {
      panelClass: 'alert-dialog',
      data: {
      type: 'error',
      message
    }});
  }

  info(message: string) {
    this.dialog.open(AlertComponent, {
      panelClass: 'alert-dialog',
      data: {
      type: 'info',
      message
    }});
  }
}
