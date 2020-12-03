import { CustomerEmailCheckModel } from './../model/customer-email-check.model';
import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import * as env from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerEmailCheckService {

  constructor(private http: HttpClient) { }

  /**
   * @description Exist Email
   */
  existEmail(item): Observable<CustomerEmailCheckModel> {
    const headers = new HttpHeaders().set('login-type', 'C');
    return this.http
      .post<CustomerEmailCheckModel>(
        env.environment.baseUrl + 'customer/customer_email_exists',
        item,
        { headers }
      );
  }
}
