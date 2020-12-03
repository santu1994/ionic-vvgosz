import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegistrationCustomerModel } from 'src/app/pages/login/common/model/login.model';
import * as env from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http: HttpClient) { }

  /**
   * @description registration API
   * @param email,password,name
   * @url registration
   * @method post
   */
  registration(formData: RegistrationCustomerModel): Observable<RegistrationCustomerModel> {
    const headers = new HttpHeaders().set('login-type', 'C');
    return this.http
      .post<RegistrationCustomerModel>(env.environment.baseUrl + 'customer/register', formData, { headers });
  }

}
