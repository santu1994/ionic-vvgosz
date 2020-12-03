import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import * as moment from "moment";
import { AdminCurrencySchema } from "src/app/common/model/adminLogin.model";
import { CustomerSchema } from "src/app/common/model/customer.model";
import { HeaderModel } from "src/app/common/model/header.model";
import { OrderSchema } from "src/app/common/model/order.model";
import { NotificationService } from "src/app/common/services/notification.service";
import * as env from "src/environments/environment";
import { ProfileService } from "../profile/common/service/profile.service";
import { TrackingHistoryPage } from "../profile/pages/my-orders/pages/tracking-history/tracking-history.page";
import { GetMyOrderModel } from '../profile/common/model/profile.model';
import { CommonService } from 'src/app/common/services/common.service';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: "app-order",
  templateUrl: "./order.page.html",
  styleUrls: ["./order.page.scss"],
})
export class OrderPage {
  /**
   * @description Header Data
   */
  headerData: HeaderModel = {
    is_bid: true,
    is_logo: true,
  };

  customerInfo: CustomerSchema;
  adminInfo: AdminCurrencySchema;
  baseUrl = env.environment.baseUrl + 'uploads/images/product/';
  loading = true;
  orderList: OrderSchema[] = [];
  pageSize = 10;
  resultsLength = 0;
  customerSubscription: Subscription;
  adminSubscription: Subscription;

  constructor(
    private modalCtrl: ModalController,
    private notification: NotificationService,
    private service: ProfileService,
    private commonService: CommonService
  ) { }

  ionViewWillEnter() {
    /**
     * @description Customer Info
     */
    this.customerSubscription = this.commonService.customerData
      .pipe(filter((val) => val !== null))
      .subscribe((stateData: CustomerSchema) => {
        this.customerInfo = stateData;
        this.orderHistory();
      });

    /**
     * @description Admin Info
     */
    this.adminSubscription = this.commonService.adminData
      .pipe(filter((val) => val !== null))
      .subscribe((stateData: AdminCurrencySchema) => {
        this.adminInfo = stateData;
      });
  }

  ionViewWillLeave() {
    this.customerSubscription.unsubscribe();
    this.adminSubscription.unsubscribe();
  }

  /**
   * @description Get TimeZone
   */
  getTimeZoneConvert(date) {
    return moment(date).tz(this.adminInfo.time_zone).format();
  }

  /**
   * @description Get Order History
   */
  orderHistory(
    pageIndex: number = 0,
    event = null,
    pageSize: number = this.pageSize
  ) {
    if (!event) {
      this.loading = true;
    }

    this.service
      .getMyOrder({
        customer_id: this.customerInfo._id,
        pageIndex,
        pageSize,
      })
      .subscribe(
        (response: GetMyOrderModel) => {
          if (event) {
            event.target.complete();
          }
          this.loading = false;
          if (response.success) {
            if (pageIndex === 0) {
              this.orderList = [];
              this.orderList = response.data.order;
              this.resultsLength = response.data.recordsTotal;
            } else {
              this.orderList.concat(response.data.order);
            }
          }
        },
        (error) => {
          if (event) {
            event.target.complete();
          }
          this.loading = false;
          this.notification.showError(error, "", 3000);
        }
      );
  }

  /**
   * @description Refresh Data
   */
  doRefresh(event) {
    this.orderHistory(0, event);
  }

  /**
   * @description Scroll Load
   */
  loadData(event) {
    const totalPageSize = Math.ceil(this.resultsLength / this.pageSize);
    const currentPageSize = Math.ceil(this.orderList.length / this.pageSize);
    if (totalPageSize > currentPageSize) {
      this.orderHistory(currentPageSize, event);
    } else {
      event.target.disabled = true;
    }
  }

  /**
   * @description Tracing History Modal Show
   */
  async viewTracingHistoryModal(item: OrderSchema) {
    const modal = await this.modalCtrl.create({
      component: TrackingHistoryPage,
      componentProps: {
        customerInfo: this.customerInfo,
        adminInfo: this.adminInfo,
        order_id: item._id,
      },
    });
    modal.onDidDismiss().then((data) => {
      // if (data.data === 'success') {
      //   this.newPasswordModal(12);
      // }
    });
    return await modal.present();
  }
}
