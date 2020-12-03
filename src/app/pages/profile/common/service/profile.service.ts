import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  CustomerAddressModel,
  GetCustomerAddressModel,
  GetCustomerModel,
  GetMyBidModel,
  GetMyOrderModel,
  GetOrderDetailsModel,
  PasswordCheckModel,
  PasswordCommonModel,
} from '../model/profile.model';
import * as env from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient) { }

  /**
   * @description Get Address API
   */
  getAddress(formData): Observable<GetCustomerAddressModel> {
    const headers = new HttpHeaders().set('login-type', 'C');
    return this.http.post<GetCustomerAddressModel>(
      env.environment.baseUrl + 'customer/get_address',
      formData,
      { headers }
    );
  }
  /**
   * @description Edit Address API
   */
  editAddress(
    formData: CustomerAddressModel
  ): Observable<CustomerAddressModel> {
    const headers = new HttpHeaders().set('login-type', 'C');
    return this.http.post<CustomerAddressModel>(
      env.environment.baseUrl + 'customer/edit_address',
      formData,
      { headers }
    );
  }

  /**
   * @description Delete Address API
   */
  deleteAddress(formData): Observable<CustomerAddressModel> {
    const headers = new HttpHeaders().set('login-type', 'C');
    return this.http.post<CustomerAddressModel>(
      env.environment.baseUrl + 'customer/delete_address',
      formData,
      { headers }
    );
  }

  /**
   * @description Default Address API
   */
  defaultAddress(formData): Observable<CustomerAddressModel> {
    const headers = new HttpHeaders().set('login-type', 'C');
    return this.http.post<CustomerAddressModel>(
      env.environment.baseUrl + 'customer/default_address',
      formData,
      { headers }
    );
  }

  /**
   * @description Edit Customer Info API
   */
  editProfile(formData: GetCustomerModel): Observable<GetCustomerModel> {
    const headers = new HttpHeaders().set('login-type', 'C');
    return this.http.post<GetCustomerModel>(
      env.environment.baseUrl + 'customer/edit_profile',
      formData,
      { headers }
    );
  }

  /**
   * @description Current Password Check
   */
  currentPasswordCheck(item): Observable<PasswordCheckModel> {
    const headers = new HttpHeaders().set('login-type', 'C');
    return this.http.post<PasswordCheckModel>(
      env.environment.baseUrl + 'customer/customer_password_check',
      item,
      { headers }
    );
  }

  /**
   * @description Sent OTP
   */
  sentOtp(item): Observable<PasswordCommonModel> {
    const headers = new HttpHeaders().set('login-type', 'C');
    return this.http.post<PasswordCommonModel>(
      env.environment.baseUrl + 'customer/customer_account_verify',
      item,
      { headers }
    );
  }

  /**
   * @param password, _id customer
   * @url change_password
   * @method post
   */
  updatePassword(formData): Observable<GetCustomerModel> {
    const headers = new HttpHeaders().set('login-type', 'C');
    return this.http.post<GetCustomerModel>(
      env.environment.baseUrl + 'customer/change_password',
      formData,
      { headers }
    );
  }

  // ------------------------------ My Bid -----------------------------------
  /**
   * @description Get My Bid
   */
  getMyBid(formData): Observable<GetMyBidModel> {
    const headers = new HttpHeaders().set('login-type', 'C');
    return this.http.post<GetMyBidModel>(
      env.environment.baseUrl + 'customer/my_bid',
      formData,
      { headers }
    );
  }

  // ------------------------------ My Order -----------------------------------
  /**
   * @description My Order
   */
  getMyOrder(formData): Observable<GetMyOrderModel> {
    const headers = new HttpHeaders().set('login-type', 'C');
    return this.http.post<GetMyOrderModel>(
      env.environment.baseUrl + 'customer/my_orders_list',
      formData,
      { headers }
    );
  }
  // ------------------------------ My Order Details -----------------------------------
  /**
   * @description My Order Details
   */
  getOrderDetails(formData): Observable<GetOrderDetailsModel> {
    const headers = new HttpHeaders().set('login-type', 'C');
    return this.http
      .post<GetOrderDetailsModel>(
        env.environment.baseUrl + 'customer/order_details',
        formData,
        { headers }
      );
  }
}
