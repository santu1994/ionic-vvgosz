import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { IonInfiniteScroll, ModalController } from '@ionic/angular';
import { forkJoin, Subscription } from 'rxjs';
import { CustomerSchema } from 'src/app/common/model/customer.model';
import {
  AdminModel,
  CommonService,
} from 'src/app/common/services/common.service';
import { ProductDetailsPage } from 'src/app/pages/product-details/product-details.page';
import { filter, mergeMap } from 'rxjs/operators';
import { ProductListService } from './common/service/product-list.service';
import {
  GetAuctionProductModel,
  GetCustomerProductModel,
} from './common/model/product-list.model';
import { NotificationService } from 'src/app/common/services/notification.service';
import { AdminCurrencySchema } from 'src/app/common/model/adminLogin.model';
import { ProductSchema } from 'src/app/common/model/product.model';
import * as env from 'src/environments/environment';
import * as _ from 'lodash';
import { CountdownComponent, CountdownConfig } from 'ngx-countdown';
import * as moment from 'moment-timezone';
import { CustomerSocketService } from 'src/app/common/services/customer-socket.service';
import { OrderPaymentModel } from '../checkout/common/model/customer-checkout.model';
import { CommonModel } from 'src/app/common/model/common.model';
import { Router } from '@angular/router';
import { BidNowModel } from '../product-details/common/model/customer-product-details.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.page.html',
  styleUrls: ['./product-list.page.scss'],
})
export class ProductListPage implements OnInit, OnDestroy {
  @Input() product: ProductSchema;
  @Input() adminInfo: AdminCurrencySchema;
  @Output() countEvent: EventEmitter<ProductSchema> = new EventEmitter<ProductSchema>();
  @ViewChild('countdown') counter: CountdownComponent;
  counterSubscription: Subscription;

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

  slideOpts = {
    initialSlide: 0,
    speed: 400,
    slidesPerView: 1,
    autoplay: true,
  };

  baseUrl = env.environment.baseUrl;

  constructor(public modalController: ModalController, private commonService: CommonService) { }

  ngOnInit(): void {
    this.counterSubscription = this.commonService.counterData
      .pipe(filter((val) => val !== null))
      .subscribe((stateData: ProductSchema) => {
        if (this.product._id === stateData._id) {
          this.counter.restart();
        }
      });
  }

  ngOnDestroy() {
    this.counterSubscription.unsubscribe();
  }

  /**
   * @description Get TimeZone
   */
  getTimeZoneConvert(date) {
    return moment(date).tz(this.adminInfo.time_zone).format();
  }

  /**
   * @description View Details Modal Show
   */
  async viewProductDetailsModal(product: ProductSchema) {
    const modal = await this.modalController.create({
      component: ProductDetailsPage,
      componentProps: {
        productInfo: product,
        adminInfo: this.adminInfo,
      },
    });
    modal.onDidDismiss().then((data) => {
      // if (data.data === 'success') {
      //   this.newPasswordModal(12);
      // }
    });
    return await modal.present();
  }

  /**
   * @description Buy Now
   */
  async buyNow(product: ProductSchema) {
    // Customer Login
    // this.router.navigate(['/admin/checkout'], {
    //   queryParams: { product: product._id },
    // });
  }

  /**
   * @description Bid Price
   */
  currentBidPrice(item: ProductSchema) {
    let bidPoint = 0;
    if (item.bid_info.length > 0) {
      try {
        bidPoint =
          Math.round(
            (Number(item.bid_info[0].price) +
              Number(item.auction_type[0].increment_slab)) *
            1e12
          ) / 1e12;
      } catch (error) {
        console.log(error);
      }
    } else {
      bidPoint = item.auction.start_price;
    }
    return bidPoint;
  }

  /**
   * @description Current Bid Info
   */
  currentBidInfo(item: ProductSchema) {
    let heightPrice = null;
    if (item.bid_info.length > 0) {
      heightPrice = _.maxBy(item.bid_info, 'price');
    }
    return heightPrice;
  }

  /**
   * @description Counter Event
   */
  counterEvent($event, product: ProductSchema) {
    // Closed
    if ($event.action === 'done') {
      setTimeout(() => {
        this.countEvent.emit(product);
      }, 200);
    }
  }
}
