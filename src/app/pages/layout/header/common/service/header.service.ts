import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetCustomerModel } from 'src/app/pages/profile/common/model/profile.model';
import * as env from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {


  constructor(private http: HttpClient) { }

  /**
   * @description Edit Customer Info API
   */
  customerProfile(formData): Observable<GetCustomerModel> {
    const headers = new HttpHeaders().set('login-type', 'C');
    return this.http
      .post<GetCustomerModel>(env.environment.baseUrl + 'customer/customer_details', formData, { headers });
  }
}
