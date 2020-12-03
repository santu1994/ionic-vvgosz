import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import * as env from 'src/environments/environment';
import { Observable } from 'rxjs';
import { OrderPaymentModel } from 'src/app/pages/checkout/common/model/customer-checkout.model';
import { CommonModel } from '../model/common.model';
import { BidNowModel } from 'src/app/pages/product-details/common/model/customer-product-details.model';

@Injectable({
  providedIn: 'root',
})
export class CustomerSocketService {
  public socket: io;
  constructor() { }

  /**
   * @description Socket Connection
   */
  socketConnect() {
    return (this.socket = io.connect(`${env.environment.baseUrl}`));
  }

  /**
   * @description Socket Join Room
   */
  joinRoom(query) {
    this.socket.emit('join-room', query);
  }

  /**
   * @description Socket Disconnect
   */
  socketDisconnect() {
    this.socket.disconnect();
  }

  /**
   * @description Bid Now
   */
  bidNowSocket() {
    const observable = new Observable<BidNowModel>((observer) => {
      this.socket.on('bidNow', (data: BidNowModel) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    // tslint:disable-next-line: align
    return observable;
  }

  /**
   * @description Order Now
   */
  orderNowSocket() {
    const observable = new Observable<OrderPaymentModel>((observer) => {
      this.socket.on('orderNow', (data: OrderPaymentModel) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    // tslint:disable-next-line: align
    return observable;
  }

  /**
   * @description New Upcoming Product
   */
  newUpcomingProductSocket() {
    const observable = new Observable<CommonModel>((observer) => {
      this.socket.on(
        'new_upcoming_product',
        (data: CommonModel) => {
          observer.next(data);
        }
      );
      return () => {
        this.socket.disconnect();
      };
    });
    // tslint:disable-next-line: align
    return observable;
  }
}
