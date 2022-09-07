import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  constructor(private http: HttpClient) { }

  getTransactions(sort = 'desc', description = ''): Observable<any> {
    return this.http.get(`${environment.backURL}/transactions`, { params : { sort, ...(description != '' && {description}) }});
  }
}
