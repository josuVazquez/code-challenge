import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { SpinnerService } from './service/spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {
  spinnerState$: Observable<boolean>;

  constructor(private spinnerService: SpinnerService) { 
    this.spinnerState$ = this.spinnerService.isSpinnerOpen();
  }
}
