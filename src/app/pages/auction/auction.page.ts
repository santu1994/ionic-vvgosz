import { Component } from '@angular/core';
import { forkJoin, Subscription } from 'rxjs';
import { CustomerSchema } from 'src/app/common/model/customer.model';
import { HeaderModel } from 'src/app/common/model/header.model';
import {
  AdminModel,
  CommonService,
} from 'src/app/common/services/common.service';
import { filter } from 'rxjs/operators';
import { AdminCurrencySchema } from 'src/app/common/model/adminLogin.model';
import { ProductSchema } from 'src/app/common/model/product.model';
import { CustomerSocketService } from 'src/app/common/services/customer-socket.service';
import { ProductListService } from '../product-list/common/service/product-list.service';
import { NotificationService } from 'src/app/common/services/notification.service';
import { GetAuctionProductModel } from '../product-list/common/model/product-list.model';
import * as _ from 'lodash';
import * as moment from 'moment';
import { OrderPaymentModel } from '../checkout/common/model/customer-checkout.model';
import { BidNowModel } from '../product-details/common/model/customer-product-details.model';
import { CommonModel } from 'src/app/common/model/common.model';

@Component({
  selector: 'app-auction',
  templateUrl: './auction.page.html',
  styleUrls: ['./auction.page.scss'],
})
export class AuctionPage {
  /**
   * @description Header Data
   */
  headerData: HeaderModel = {
    is_bid: true,
    is_logo: true,
  };

  public customerInfo: CustomerSchema;
  adminInfo: AdminCurrencySchema;
  customerSubscription: Subscription;
  upcomingProductData: Array<ProductSchema> = [];
  liveProductData: Array<ProductSchema> = [];
  closeProductData: Array<ProductSchema> = [];

  forkJoinSubscription: Subscription;
  oderNowSocketSubscription: Subscription;
  liveSocketSubscription: Subscription;
  newUpcomingSubscription: Subscription;

  pageSize = 100;
  isLoadingResults = true;

  constructor(
    private commonService: CommonService,
    private socketService: CustomerSocketService,
    private service: ProductListService,
    private notification: NotificationService
  ) { }

  ionViewWillEnter() {
    /**
     * @description Customer Info
     */
    this.customerSubscription = this.commonService.customerData
      .pipe(filter((val) => val !== null))
      .subscribe((stateData: CustomerSchema) => {
        this.customerInfo = stateData;
      });

    this.getProductAdmin();

    // Socket Connect
    this.socketService.socketConnect();

    // Socket Join Room
    this.socketService.joinRoom({
      type: 'all-product',
      id: 'all_product',
    });

    // Order Now
    this.oderNowSocketSubscription = this.socketService
      .orderNowSocket()
      .subscribe((response: OrderPaymentModel) => {
        if (response.success) {
          _.forEach(response.data, (value, key) => {
            _.remove(this.upcomingProductData, { _id: value.product_id });
          });
        }
      });

    // Bid Now Socket
    this.liveSocketSubscription = this.socketService
      .bidNowSocket()
      .subscribe((response: BidNowModel) => {
        if (response.success) {
          const bidHistory = response.data.bidData;
          bidHistory.customer_info = response.data.customerInfo;
          const findIndex = _.findIndex(this.liveProductData, {
            _id: bidHistory.product_id,
          });
          if (findIndex >= 0) {
            this.liveProductData[findIndex].bid_info.push(bidHistory);
            this.bidHistorySort(this.liveProductData[findIndex], findIndex);
            // Counter Reset
            // this.commonService.updateCounter()
            // const counter = this.counter.toArray();
            // counter[findIndex].restart();
            if (response.data.reset_time) {
              this.liveProductData[findIndex].auction.end_date =
                response.data.reset_time;
              this.liveProductData[
                findIndex
              ].auction.left_date = this.getLeftTime(
                this.liveProductData[findIndex],
                'live'
              );
              this.commonService.updateCounter(this.liveProductData[findIndex]);
              // this.counter[findIndex].restart();
            } else if (response.data.set_end_date) {
              this.liveProductData[findIndex].auction.set_end_date =
                response.data.set_end_date;
            }
          }
          if (response.data.customerInfo._id === this.customerInfo._id) {
            this.commonService.updateCustomer(response.data.customerInfo);
          }
        }
      });

    // New Upcoming Product
    this.newUpcomingSubscription = this.socketService
      .newUpcomingProductSocket()
      .subscribe((response: CommonModel) => {
        if (response.success) {
          this.getStatusProduct('upcoming');
        }
      });
  }

  ionViewWillLeave() {
    this.customerSubscription.unsubscribe();
    this.socketService.socketDisconnect();
    this.forkJoinSubscription.unsubscribe();
    this.oderNowSocketSubscription.unsubscribe();
    this.liveSocketSubscription.unsubscribe();
    this.newUpcomingSubscription.unsubscribe();
  }

  /**
   * @description Get Product Admin
   */
  getProductAdmin() {
    const dataParameters: any = {
      pageIndex: 0,
      pageSize: this.pageSize,
      status: 'all',
      is_active: true,
      is_order: false,
    };

    this.isLoadingResults = true;
    this.forkJoinSubscription = forkJoin({
      product: this.service.getProduct(dataParameters),
      admin: this.commonService.getAdmin(),
    }).subscribe(
      (res: { product: GetAuctionProductModel; admin: AdminModel }) => {
        this.isLoadingResults = false;
        // Admin
        if (res.admin.success) {
          this.adminInfo = res.admin.data;
        }
        // Product
        if (res.product.success) {
          this.upcomingProductData = [];
          this.liveProductData = [];
          this.closeProductData = [];
          _.forEach(['upcoming', 'live', 'close'], (value, key) => {
            _.forEach(res.product.data[value], (value1, key1) => {
              if (value1 === 'upcoming' || 'live') {
                value1.auction.left_date = this.getLeftTime(value1, value);
                value1.status = value;
                if (value === 'live') {
                  this.liveProductData.push(value1);
                  this.bidHistorySort(value1, key1);
                } else {
                  this.upcomingProductData.push(value1);
                }
              } else {
                this.closeProductData.push(value1);
              }
            });
          });
        }
      },
      (error) => {
        this.isLoadingResults = false;
        this.notification.showError(error, '', 3000);
      }
    );
  }

  /**
   * @description Left Time
   */
  getLeftTime(product: ProductSchema, status = 'upcoming') {
    if (status === 'upcoming') {
      const currentDate = moment().tz(this.adminInfo.time_zone);
      const endDate = moment(product.auction.start_date).tz(
        this.adminInfo.time_zone
      );
      const diff = endDate.diff(currentDate, 'seconds');
      return diff;
    } else if (status === 'live') {
      const currentDate = moment().tz(this.adminInfo.time_zone);
      const endDate = moment(product.auction.end_date).tz(
        this.adminInfo.time_zone
      );
      const diff = endDate.diff(currentDate, 'seconds');
      return diff;
    }
  }

  /**
   * @description Bid History Sort
   */
  bidHistorySort(item: ProductSchema, index) {
    if (item.bid_info.length > 0) {
      const sort = _.orderBy(item.bid_info, ['price'], ['desc']);
      this.liveProductData[index].bid_info = sort;
    }
  }

  /**
   * @description Counter Event
   */
  counterEvent(product: ProductSchema) {
    if (product.status === 'upcoming') {
      _.remove(this.upcomingProductData, { _id: product._id });
      product.auction.left_date = this.getLeftTime(product, 'live');
      product.status = 'live';
      this.liveProductData.push(product);
    } else if (product.status === 'live') {
      _.remove(this.liveProductData, { _id: product._id });
      product.status = 'close';
      this.closeProductData.push(product);
    } else {
      _.remove(this.closeProductData, { _id: product._id });
    }
  }

  /**
   * @description Get Status Product
   */
  getStatusProduct(param) {
    const dataParameters: any = {
      pageIndex: 0,
      pageSize: this.pageSize,
      status: param,
      is_active: true,
      is_order: false,
    };

    this.service.getProduct(dataParameters).subscribe(
      (response: GetAuctionProductModel) => {
        if (response.success) {
          this.upcomingProductData = [];
          _.forEach(response.data.upcoming, (value, key) => {
            value.auction.left_date = this.getLeftTime(value, param);
            value.status = param;
            this.upcomingProductData.push(value);
          });
        }
      },
      (error) => {
        this.notification.showError(error, '', 3000);
      }
    );
  }

}
