import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerModel } from 'src/app/pages/login/common/model/login.model';
import * as env from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {

  constructor(private http: HttpClient) { }

  /**
   * @param id customer
   * @url Updated Status
   * @method post
   */
  updateStatus(formData): Observable<CustomerModel> {
    const headers = new HttpHeaders().set('login-type', 'C');
    return this.http
      .post<CustomerModel>(env.environment.baseUrl + 'customer/update_status', formData, { headers });
  }

  /**
   * @param email customer
   * @url forgot_email_sent_otp
   * @method post
   */
  emailSendOtp(formData): Observable<CustomerModel> {
    const headers = new HttpHeaders().set('login-type', 'C');
    return this.http
      .post<CustomerModel>(env.environment.baseUrl + 'customer/forgot_email_sent_otp', formData, { headers });
  }

  /**
   * @param password, _id customer
   * @url update_password
   * @method post
   */
  updatePassword(formData): Observable<CustomerModel> {
    const headers = new HttpHeaders().set('login-type', 'C');
    return this.http
      .post<CustomerModel>(env.environment.baseUrl + 'customer/update_password', formData, { headers });
  }

}
