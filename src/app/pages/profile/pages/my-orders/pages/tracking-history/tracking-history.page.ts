import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import * as moment from 'moment';
import { AdminCurrencySchema } from 'src/app/common/model/adminLogin.model';
import { CustomerSchema } from 'src/app/common/model/customer.model';
import { OrderSchema } from 'src/app/common/model/order.model';
import { NotificationService } from 'src/app/common/services/notification.service';
import { ProductDetailsPage } from 'src/app/pages/product-details/product-details.page';
import { GetOrderDetailsModel } from 'src/app/pages/profile/common/model/profile.model';
import { ProfileService } from 'src/app/pages/profile/common/service/profile.service';
import * as env from 'src/environments/environment';
import { InvoiceService } from './common/service/invoice.service';

@Component({
  selector: 'app-tracking-history',
  templateUrl: './tracking-history.page.html',
  styleUrls: ['./tracking-history.page.scss'],
})
export class TrackingHistoryPage {
  @Input() customerInfo: CustomerSchema;
  @Input() adminInfo: AdminCurrencySchema;
  @Input() order_id: string;
  baseUrl = env.environment.baseUrl + 'uploads/images/product/';
  loading = true;
  orderList: OrderSchema;

  constructor(
    private modalCtrl: ModalController,
    private notification: NotificationService,
    private service: ProfileService,
    private invoiceService: InvoiceService
  ) { }

  ionViewWillEnter() {
    // Get Order History
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
  orderHistory() {
    this.loading = true;
    this.service
      .getOrderDetails({
        _id: this.order_id,
        customer_id: this.customerInfo._id,
      })
      .subscribe(
        (response: GetOrderDetailsModel) => {
          this.loading = false;
          if (response.success) {
            this.orderList = response.data;
          }
        },
        (error) => {
          this.loading = false;
          this.notification.showError(error, '', 3000);
        }
      );
  }

  /**
   * @description Close Modal
   */
  async closeModal() {
    await this.modalCtrl.dismiss({ dismissed: true });
  }

  /**
   * @description View Details Modal Show
   */
  async viewProductDetailsModal() {
    const modal = await this.modalCtrl.create({
      component: ProductDetailsPage,
      componentProps: {
        productId: this.orderList.product_id,
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
   * @description Download Invoice
   */
  downloadInvoice() {
    this.invoiceService.generateInvoice(this.orderList, this.adminInfo);
  }
}
