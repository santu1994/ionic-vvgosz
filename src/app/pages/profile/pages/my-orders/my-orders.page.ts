import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import * as moment from 'moment';
import { AdminCurrencySchema } from 'src/app/common/model/adminLogin.model';
import { CustomerSchema } from 'src/app/common/model/customer.model';
import { OrderSchema } from 'src/app/common/model/order.model';
import { NotificationService } from 'src/app/common/services/notification.service';
import * as env from 'src/environments/environment';
import { GetMyOrderModel } from '../../common/model/profile.model';
import { ProfileService } from '../../common/service/profile.service';
import { TrackingHistoryPage } from './pages/tracking-history/tracking-history.page';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.page.html',
  styleUrls: ['./my-orders.page.scss'],
})
export class MyOrdersPage {
  @Input() customerInfo: CustomerSchema;
  @Input() adminInfo: AdminCurrencySchema;
  baseUrl = env.environment.baseUrl + 'uploads/images/product/';
  loading = true;
  orderList: OrderSchema[] = [];
  pageSize = 10;
  resultsLength = 0;

  constructor(
    private modalCtrl: ModalController,
    private notification: NotificationService,
    private service: ProfileService
  ) { }

  ionViewWillEnter() {
    this.orderHistory();
  }

  ionViewWillLeave() { }

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
          this.notification.showError(error, '', 3000);
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
   * @description Close Modal
   */
  async closeModal() {
    await this.modalCtrl.dismiss({ dismissed: true });
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
        order_id: item._id
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
