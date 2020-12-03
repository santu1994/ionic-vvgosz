import { Component, Input, OnInit } from '@angular/core';
import { ProductSchema } from 'src/app/common/model/product.model';

@Component({
  selector: 'app-product-quantity',
  templateUrl: './product-quantity.page.html',
  styleUrls: ['./product-quantity.page.scss'],
})
export class ProductQuantityPage implements OnInit {
  @Input() productInfo: ProductSchema;
  constructor() { }

  ngOnInit() {
  }

}
