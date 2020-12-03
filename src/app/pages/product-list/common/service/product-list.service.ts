import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GetCustomerProductModel } from '../model/product-list.model';
import { Observable } from 'rxjs';
import * as env from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductListService {

  constructor(private http: HttpClient) { }

  /**
   * @description Get Product
   */
  getProduct(data): Observable<any> {
    let url = null;
    if (data.status === 'set_auction') {
      url = 'get_all_product';
    } else {
      url = 'get_product';
    }
    const headers = new HttpHeaders().set('login-type', 'C');
    return this.http
      .post<any>(
        env.environment.baseUrl + `customer/${url}`,
        data,
        { headers });
  }
}