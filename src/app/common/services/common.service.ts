import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CustomerSchema } from '../model/customer.model';
import { AdminCurrencySchema } from '../model/adminLogin.model';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import * as env from 'src/environments/environment';
import { ProductSchema } from '../model/product.model';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  /**
   * @description Customer Info
   */
  private customer = new BehaviorSubject<CustomerSchema>(null);
  customerData = this.customer.asObservable();

  /**
   * @description Admin Info
   */
  private admin = new BehaviorSubject<AdminCurrencySchema>(null);
  adminData = this.admin.asObservable();

  /**
   * @description Footer Menu
   */
  private menu = new BehaviorSubject<boolean>(true);
  footerMenu = this.menu.asObservable();

  /**
   * @description change Language
   */
  private language = new BehaviorSubject('');
  languageData = this.language.asObservable();

  /**
   * @description Counter Restart
   */
  private counter = new BehaviorSubject<ProductSchema>(null);
  counterData = this.counter.asObservable();

  constructor(private http: HttpClient) { }

  /**
   * @description Updated Customer Details
   */
  updateCustomer(data: CustomerSchema) {
    this.customer.next(data);
  }

  /**
   * @description Updated Admin Details
   */
  updateAdmin(data: AdminCurrencySchema) {
    this.admin.next(data);
  }
  /**
   * @description Updated Footer Menu
   */
  updateFooterMenu(data: boolean) {
    this.menu.next(data);
  }

  /**
   * @description Updated Language Details
   */
  updateLanguage(data: string) {
    this.language.next(data);
  }

  /**
   * @description Updated Counter Data
   */
  updateCounter(data: ProductSchema) {
    this.counter.next(data);
  }

  /**
   * @description Get Admin
   */
  getAdmin(): Observable<AdminModel> {
    const headers = new HttpHeaders().set('login-type', 'C');
    return this.http.get<AdminModel>(
      env.environment.baseUrl + 'customer/get_admin',
      {
        headers,
      }
    );
  }
}

export interface AdminModel {
  msg: string;
  success: boolean;
  data: AdminCurrencySchema;
}
