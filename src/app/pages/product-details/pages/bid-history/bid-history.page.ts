import { ModalController } from '@ionic/angular';
import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ProductBidHistoryPage } from '../product-bid-history/product-bid-history.page';
import { ProductSchema } from 'src/app/common/model/product.model';
import { AdminCurrencySchema } from 'src/app/common/model/adminLogin.model';
import { BidSchema } from 'src/app/common/model/bid.model';
import * as _ from 'lodash';
import { CountdownComponent } from 'ngx-countdown';
import { Subscription } from 'rxjs';
import { CustomerSocketService } from 'src/app/common/services/customer-socket.service';
import { BidNowModel } from '../../common/model/customer-product-details.model';

@Component({
  selector: 'app-bid-history',
  templateUrl: './bid-history.page.html',
  styleUrls: ['./bid-history.page.scss'],
})
export class BidHistoryPage implements OnInit, AfterViewInit, OnDestroy {
  @Input() productInfo: ProductSchema;
  @Input() adminInfo: AdminCurrencySchema;
  @Input() bidHistory: any[] = [];
  @Input() counterSts: string;
  socketSubscription: Subscription;

  bidDetails: Array<{
    customer: string;
    date: string;
    name: string;
    length: number;
  }> = [];

  constructor(private modalCtrl: ModalController, private socketService: CustomerSocketService) { }

  ngOnInit() {
    this.bidUserGroup();
  }

  ngAfterViewInit() {
    // Bid Now
    this.socketSubscription = this.socketService
      .bidNowSocket()
      .subscribe((response: BidNowModel) => {
        if (response.success && this.counterSts === 'start') {
          const bidHistory = response.data.bidData;
          bidHistory.customer_name = response.data.customerInfo.name;
          this.bidHistory.push(bidHistory);
          this.bidUserGroup();
        }
      });
  }


  ngOnDestroy() {
    this.socketSubscription.unsubscribe();
  }

  /**
   * @description  Bid Group
   */
  bidUserGroup() {
    this.bidDetails = _(this.bidHistory)
      .groupBy('customer_id')
      .map((items, customer) => {
        return {
          customer,
          name: _.map(items, 'customer_name')[0],
          date: _.maxBy(items, 'price').createdAt,
          length: items.length,
        };
      })
      .value();
  }

  /**
   * @description More Bid History Modal
   */
  async moreBidHistory() {
    const modal = await this.modalCtrl.create({
      component: ProductBidHistoryPage,
      cssClass: 'bid-details',
      componentProps: {
        bidDetails: this.bidHistory,
        adminInfo: this.adminInfo
      }
    });
    return await modal.present();
  }
}
