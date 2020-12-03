import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerModel } from '../model/login.model';
import * as env from 'src/environments/environment';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) { }

  /**
   * @description Login API
   * @param email,password
   * @url Login
   * @method post
   */
  login(formData: CustomerModel): Observable<CustomerModel> {
    const headers = new HttpHeaders().set('login-type', 'C');
    return this.http
      .post<CustomerModel>(
        env.environment.baseUrl + 'customer/login',
        formData,
        { headers }
      );
  }
}
