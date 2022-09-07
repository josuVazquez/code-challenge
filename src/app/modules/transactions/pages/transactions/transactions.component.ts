import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AlertService } from 'src/app/shared/components/alert/service/alert.service';
import { LoginService } from 'src/app/shared/services/login.service';
import { TransactionsService } from 'src/app/shared/services/transactions.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  dataSource: any;
  displayedColumns: string[] = ['id', 'amount', 'fee', 'date', 'description'];
  filterForm: FormGroup = new FormGroup({
    description: new FormControl(''),
    sort: new FormControl('')
  });

  constructor(private transactionService: TransactionsService, private alert: AlertService,
    public loginService: LoginService) { }

  ngOnInit(): void {
    this.loadTransactions();
  }

  submitFilter() {
    const values = this.filterForm.getRawValue();
    this.loadTransactions(values)
  }

  loadTransactions({sort = '', description = ''} = {}) {
    this.transactionService.getTransactions(sort, description).subscribe(res => {
      if(!res.length) {
        this.alert.info('No data found for this filter.');
      }
      this.dataSource = res;
    });
  }

}
