import { Component, Input, OnInit } from '@angular/core';
import { AdminCurrencySchema } from 'src/app/common/model/adminLogin.model';
import { ProductSchema } from 'src/app/common/model/product.model';

@Component({
  selector: 'app-product-auction-info',
  templateUrl: './product-auction-info.page.html',
  styleUrls: ['./product-auction-info.page.scss'],
})
export class ProductAuctionInfoPage implements OnInit {
  @Input() productInfo: ProductSchema;
  @Input() adminInfo: AdminCurrencySchema;
  constructor() { }

  ngOnInit() {
  }

}
