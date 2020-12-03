import {
  Component,
  OnInit,
  AfterViewInit,
  Input,
  OnDestroy,
} from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HeaderModel } from 'src/app/common/model/header.model';
import { ProductSchema } from 'src/app/common/model/product.model';
import { CustomerSchema } from 'src/app/common/model/customer.model';
import { forkJoin, Subscription } from 'rxjs';
import * as env from 'src/environments/environment';
import { BidSchema } from 'src/app/common/model/bid.model';
import {
  AdminModel,
  CommonService,
} from 'src/app/common/services/common.service';
import { NotificationService } from 'src/app/common/services/notification.service';
import { CustomerSocketService } from 'src/app/common/services/customer-socket.service';
import { filter } from 'rxjs/operators';
import { ProductDetailsService } from './common/service/product-details.service';
import {
  BidNowModel,
  GetBidHistoryModel,
  GetProductDetailsModel,
} from './common/model/customer-product-details.model';
import * as _ from 'lodash';
import * as moment from 'moment-timezone';
import { AdminCurrencySchema } from 'src/app/common/model/adminLogin.model';
import { OrderPaymentModel } from '../checkout/common/model/customer-checkout.model';
import { CheckoutPage } from '../checkout/checkout.page';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage implements OnInit, AfterViewInit, OnDestroy {
  /**
   * @description Header Data
   */
  headerData: HeaderModel = {
    is_bid: true,
    is_logo: true,
  };

  @Input() productInfo: ProductSchema;
  @Input() productId: string;
  @Input() adminInfo: AdminCurrencySchema;

  customerInfo: CustomerSchema;
  customerSubscription: Subscription;
  socketSubscription: Subscription;
  oderNowSocketSubscription: Subscription;
  forkJoinSubscription: Subscription;
  isLoadingResults: boolean = true;
  baseUrl = env.environment.baseUrl;
  bidHistory: BidSchema[] = [];
  winner: BidSchema;
  bidPoint: number;
  counterStatus: string;
  btnLoader = false;

  constructor(
    private modalCtrl: ModalController,
    private commonService: CommonService,
    private service: ProductDetailsService,
    private notification: NotificationService,
    private socketService: CustomerSocketService
  ) { }

  ngOnInit() {
    /**
     * @description Customer Info
     */
    this.customerSubscription = this.commonService.customerData
      .pipe(filter((val) => val !== null))
      .subscribe((stateData: CustomerSchema) => {
        this.customerInfo = stateData;
      });
    this.getProduct();
  }

  ngAfterViewInit() {
    // Socket Connect
    this.socketService.socketConnect();
    // Socket Join Room
    const productId = (this.productId) ? this.productId : this.productInfo._id;
    this.socketService.joinRoom({
      type: 'product-details',
      id: productId,
    });

    // Bid Now
    this.socketSubscription = this.socketService
      .bidNowSocket()
      .subscribe((response: BidNowModel) => {
        console.log('bid', this.counterStatus);
        console.log('bid', response);
        if (response.success && this.counterStatus === 'start') {
          const bidHistory = response.data.bidData;
          bidHistory.customer_name = response.data.customerInfo.name;
          this.bidHistory.push(bidHistory);
          this.currentBidPrice();
          if (response.data.reset_time) {
            this.productInfo.auction.end_date = response.data.reset_time;
            this.productInfo.auction.left_date = this.getLeftTime(
              this.productInfo
            );
          } else if (response.data.set_end_date) {
            this.productInfo.auction.set_end_date = response.data.set_end_date;
          }
        }
      });

    // Order Now
    this.oderNowSocketSubscription = this.socketService
      .orderNowSocket()
      .subscribe((response: OrderPaymentModel) => {
        if (response.success) {
          if (this.productInfo) {
            this.getProduct();
          }
        }
      });
  }

  ngOnDestroy() {
    this.socketSubscription.unsubscribe();
    this.oderNowSocketSubscription.unsubscribe();
    // Socket Disconnect
    this.socketService.socketDisconnect();
    this.customerSubscription.unsubscribe();
    this.forkJoinSubscription.unsubscribe();
  }

  /**
   * @description Get Product
   */
  getProduct() {
    this.isLoadingResults = true;
    const productId = (this.productId) ? this.productId : this.productInfo._id;
    this.forkJoinSubscription = forkJoin({
      product: this.service.getProductDetails({
        _id: productId,
        timezone: this.adminInfo.time_zone,
      }),
      bid: this.service.bidHistory({
        _id: productId,
      }),
    }).subscribe(
      (response: {
        product: GetProductDetailsModel;
        bid: GetBidHistoryModel;
      }) => {
        this.isLoadingResults = false;
        // Product History
        if (response.product.success) {
          this.productInfo = null;
          this.bidHistory = [];
          this.productInfo = response.product.data.product;
          this.productInfo.status = response.product.data.status;
          this.counterStatus = 'start';
          console.log('detail', this.counterStatus);
          if (this.productInfo.auction) {
            // Bid Point
            this.bidPoint = this.productInfo.auction.start_price;
            this.productInfo.auction.left_date = this.getLeftTime(
              this.productInfo
            );
          }
        }
        // Bid History
        if (response.bid.success) {
          this.bidHistory = response.bid.data;
          this.currentBidPrice();
        }
      },
      (error) => {
        this.isLoadingResults = false;
        this.notification.showError(error, '', 3000);
      }
    );
  }

  /**
   * @description GCurrent Bid Price
   */
  currentBidPrice() {
    if (this.bidHistory.length > 0) {
      this.bidHistory = _.orderBy(this.bidHistory, ['price'], ['desc']);
      const heightPrice = _.maxBy(this.bidHistory, 'price');
      if (this.productInfo.status === 'close') {
        this.winner = heightPrice;
      }
      // tslint:disable-next-line:max-line-length
      this.bidPoint =
        Math.round(
          (Number(heightPrice.price) +
            Number(this.productInfo.auction_type[0].increment_slab)) *
          1e12
        ) / 1e12;
    }
  }

  /**
   * @description Left Time
   */
  getLeftTime(product: ProductSchema) {
    let date = null;
    if (this.productInfo.status === 'live') {
      date = product.auction.end_date;
    } else if (this.productInfo.status === 'upcoming') {
      date = product.auction.start_date;
    }
    const currentDate = moment().tz(this.adminInfo.time_zone);
    const endDate = moment(date).tz(this.adminInfo.time_zone);
    const diff = endDate.diff(currentDate, 'seconds');
    return diff;
  }

  /**
   * @description Close Modal
   */
  async closeModal() {
    await this.modalCtrl.dismiss({ dismissed: true });
  }

  /**
   * @description Change Counter Status
   */
  changedCounterStatus(status: string) {
    this.counterStatus = status;
    this.getProduct();
  }

  /**
   * @description Bid
   */
  bid() {
    // Insufficient Balance
    if (this.bidPoint > this.customerInfo.bid_balance) {
      // return this.openBidModal();
      return;
    }
    this.btnLoader = true;
    // Request Data
    const requestData = {
      _id: this.productInfo._id,
      customer_id: this.customerInfo._id,
      customer_name: this.customerInfo.name,
      bid_balance: this.customerInfo.bid_balance,
      auction_id: this.productInfo.auction.auction_id,
      start_price: this.productInfo.auction.start_price,
      increment_slab: this.productInfo.auction_type[0].increment_slab,
      required_bid_credit: this.productInfo.auction.required_bid_credit,
      end_date: this.productInfo.auction.end_date,
      reset_time: this.productInfo.auction.reset_time,
      set_end_date: this.productInfo.auction.set_end_date,
    };
    this.service.bid(requestData).subscribe(
      (response: BidNowModel) => {
        this.btnLoader = false;
        if (response.success) {
          this.commonService.updateCustomer(response.data.customerInfo);
          this.notification.showSuccess('Bid place successfully', '', 3000);
        } else {
          this.notification.showError(response.msg, '', 3000);
        }
      },
      (error) => {
        this.btnLoader = false;
        this.notification.showError(error, '', 3000);
      }
    );
  }

  /**
   * @description View Checkout  Modal Show
   */
  async viewCheckoutModal() {
    const modal = await this.modalCtrl.create({
      component: CheckoutPage,
      componentProps: {
        customerInfo: this.customerInfo,
        adminInfo: this.adminInfo,
        productId: this.productId
      },
    });
    // modal.onDidDismiss().then(async (data) => {
    //   if (!data.data.dismissed) {
    //     await this.modalCtrl.dismiss({ dismissed: false });
    //   }
    // });
    return await modal.present();
  }
}
