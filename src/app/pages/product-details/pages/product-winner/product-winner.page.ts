import { Component, Input, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { AdminCurrencySchema } from 'src/app/common/model/adminLogin.model';
import { BidSchema } from 'src/app/common/model/bid.model';
import { ProductSchema } from 'src/app/common/model/product.model';

@Component({
  selector: 'app-product-winner',
  templateUrl: './product-winner.page.html',
  styleUrls: ['./product-winner.page.scss'],
})
export class ProductWinnerPage implements OnInit {
  @Input() productInfo: ProductSchema;
  @Input() adminInfo: AdminCurrencySchema;
  @Input() bidHistory: BidSchema[] = [];
  constructor() { }

  ngOnInit() {
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
}
