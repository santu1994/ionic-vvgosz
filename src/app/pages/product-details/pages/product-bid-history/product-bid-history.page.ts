import { ModalController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';
import { AdminCurrencySchema } from 'src/app/common/model/adminLogin.model';
import { BidSchema } from 'src/app/common/model/bid.model';

@Component({
  selector: 'app-product-bid-history',
  templateUrl: './product-bid-history.page.html',
  styleUrls: ['./product-bid-history.page.scss'],
})
export class ProductBidHistoryPage implements OnInit {
  @Input() bidDetails: BidSchema[] = [];
  @Input() adminInfo: AdminCurrencySchema;
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  /**
   * @description Close Modal
   */
  async closeModal() {
    await this.modalCtrl.dismiss({ dismissed: true });
  }

}
