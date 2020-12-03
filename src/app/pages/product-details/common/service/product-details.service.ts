import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BidNowModel, GetBidHistoryModel, GetProductDetailsModel } from '../model/customer-product-details.model';
import * as env from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailsService {

  constructor(private http: HttpClient) { }

  /**
   * @description Product Details
   */
  getProductDetails(formData): Observable<GetProductDetailsModel> {
    const headers = new HttpHeaders().set('login-type', 'C');
    return this.http
      .post<GetProductDetailsModel>(env.environment.baseUrl + 'customer/view_product_details', formData, { headers });
  }

  /**
   * @description Product Bid
   */
  bid(formData): Observable<BidNowModel> {
    const headers = new HttpHeaders().set('login-type', 'C');
    return this.http
      .post<BidNowModel>(env.environment.baseUrl + 'customer/bid_now', formData, { headers });
  }

  /**
   * @description Product Details
   */
  bidHistory(formData): Observable<GetBidHistoryModel> {
    const headers = new HttpHeaders().set('login-type', 'C');
    return this.http
      .post<GetBidHistoryModel>(env.environment.baseUrl + 'customer/product_bid_history', formData, { headers });
  }
}
