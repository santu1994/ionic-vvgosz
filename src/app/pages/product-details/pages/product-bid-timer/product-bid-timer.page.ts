import { Component, Input, OnInit } from '@angular/core';
import { ProductSchema } from 'src/app/common/model/product.model';

@Component({
  selector: 'app-product-bid-timer',
  templateUrl: './product-bid-timer.page.html',
  styleUrls: ['./product-bid-timer.page.scss'],
})
export class ProductBidTimerPage implements OnInit {
  @Input() productInfo: ProductSchema;
  constructor() { }

  ngOnInit() {
  }

}
