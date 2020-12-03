import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CustomerSchema } from 'src/app/common/model/customer.model';
import { NotificationService } from 'src/app/common/services/notification.service';
import { ProfileService } from '../../common/service/profile.service';
import * as env from 'src/environments/environment';
import { AdminCurrencySchema } from 'src/app/common/model/adminLogin.model';
import * as moment from 'moment';
import { GetMyBidModel, MyBidModel } from '../../common/model/profile.model';
import * as _ from 'lodash';
import { ProductDetailsPage } from 'src/app/pages/product-details/product-details.page';

@Component({
  selector: 'app-my-bid',
  templateUrl: './my-bid.page.html',
  styleUrls: ['./my-bid.page.scss'],
})
export class MyBidPage {
  @Input() customerInfo: CustomerSchema;
  @Input() adminInfo: AdminCurrencySchema;
  baseUrl = env.environment.baseUrl + 'uploads/images/product/';
  loading = true;
  BidList: MyBidModel[] = [];
  pageSize = 10;
  resultsLength = 0;
  currentDate = new Date();

  constructor(
    private modalCtrl: ModalController,
    private notification: NotificationService,
    private service: ProfileService
  ) { }

  ionViewWillEnter() {
    this.getMyBid();
  }

  ionViewWillLeave() { }

  /**
   * @description Get My Bid
   */
  getMyBid(
    pageIndex: number = 0,
    event = null,
    pageSize: number = this.pageSize
  ) {
    if (!event) {
      this.loading = true;
    }

    this.service
      .getMyBid({
        _id: this.customerInfo._id,
        pageIndex,
        pageSize,
      })
      .subscribe(
        (response: GetMyBidModel) => {
          if (event) {
            event.target.complete();
          }
          this.loading = false;
          if (response.success) {
            if (pageIndex === 0) {
              this.BidList = [];
              this.BidList = response.data.bid;
              this.resultsLength = response.data.recordsTotal;
            } else {
              this.BidList.concat(response.data.bid)
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
   * @description Get TimeZone
   */
  getTimeZoneConvert(date) {
    return moment(date).tz(this.adminInfo.time_zone).format();
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
  async viewProductDetailsModal(product) {
    const modal = await this.modalCtrl.create({
      component: ProductDetailsPage,
      componentProps: {
        productId: product,
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
   * @description Refresh Data
   */
  doRefresh(event) {
    this.getMyBid(0, event);
  }

  /**
   * @description Scroll Load
   */
  loadData(event) {
    const totalPageSize = Math.ceil(this.resultsLength / this.pageSize);
    const currentPageSize = Math.ceil(this.BidList.length / this.pageSize);
    if (totalPageSize > currentPageSize) {
      this.getMyBid(currentPageSize, event);
    } else {
      event.target.disabled = true;
    }
  }
}
