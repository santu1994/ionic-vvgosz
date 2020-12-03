import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import * as _ from 'lodash';
import { CountdownComponent, CountdownConfig } from 'ngx-countdown';
import { Subscription } from 'rxjs';
import { AdminCurrencySchema } from 'src/app/common/model/adminLogin.model';
import { BidSchema } from 'src/app/common/model/bid.model';
import { ProductSchema } from 'src/app/common/model/product.model';
import { CustomerSocketService } from 'src/app/common/services/customer-socket.service';
import { BidNowModel } from '../../common/model/customer-product-details.model';

@Component({
  selector: 'app-product-live-auction',
  templateUrl: './product-live-auction.page.html',
  styleUrls: ['./product-live-auction.page.scss'],
})
export class ProductLiveAuctionPage implements OnInit, AfterViewInit, OnDestroy {
  @Input() productInfo: ProductSchema;
  @Input() adminInfo: AdminCurrencySchema;
  @Input() bidHistory: BidSchema[] = [];
  @Input() counterSts: string;
  @Output() counterStatus: EventEmitter<string> = new EventEmitter();
  @ViewChild('countdown') counter: CountdownComponent;
  socketSubscription: Subscription;
  /**
   * @description Count Down Timer
   */
  CountdownTimeUnits: Array<[string, number]> = [
    ['Y', 1000 * 60 * 60 * 24 * 365], // years
    ['M', 1000 * 60 * 60 * 24 * 30], // months
    ['D', 1000 * 60 * 60 * 24], // days
    ['H', 1000 * 60 * 60], // hours
    ['m', 1000 * 60], // minutes
    ['s', 1000], // seconds
    ['S', 1], // million seconds
  ];

  moreThan24Hours: CountdownConfig = {
    formatDate: ({ date, formatStr }) => {
      let duration = Number(date || 0);

      return this.CountdownTimeUnits.reduce((current, [name, unit]) => {
        if (current.indexOf(name) !== -1) {
          const v = Math.floor(duration / unit);
          duration -= v * unit;
          return current.replace(
            new RegExp(`${name}+`, 'g'),
            (match: string) => {
              return v.toString().padStart(match.length, '0');
            }
          );
        }
        return current;
      }, formatStr);
    },
  };

  constructor(private socketService: CustomerSocketService) { }

  ngOnInit() { }

  ngAfterViewInit() {
    // Bid Now
    this.socketSubscription = this.socketService
      .bidNowSocket()
      .subscribe((response: BidNowModel) => {
        if (response.success && this.counterSts === 'start') {
          const bidHistory = response.data.bidData;
          bidHistory.customer_name = response.data.customerInfo.name;
          this.bidHistory.push(bidHistory);
          if (response.data.reset_time) {
            this.counter.restart();
          }
        }
      });
  }


  ngOnDestroy() {
    this.socketSubscription.unsubscribe();
  }

  /**
   * @description Current Bid Info
   */
  currentBidInfo() {
    let heightPrice = null;
    if (this.bidHistory.length > 0) {
      heightPrice = _.maxBy(this.bidHistory, 'price');
    }
    return heightPrice;
  }

  /**
   * @description Counter Event
   */
  counterEvent($event) {
    // Closed
    if ($event.action === 'done') {
      setTimeout(() => {
        this.counterStatus.emit('done');
      }, 1000);
    }
  }
}
