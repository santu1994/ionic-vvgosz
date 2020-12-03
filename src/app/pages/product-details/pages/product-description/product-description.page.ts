import { Component, Input, OnInit } from '@angular/core';
import { AdminCurrencySchema } from 'src/app/common/model/adminLogin.model';
import { ProductSchema } from 'src/app/common/model/product.model';

@Component({
  selector: 'app-product-description',
  templateUrl: './product-description.page.html',
  styleUrls: ['./product-description.page.scss'],
})
export class ProductDescriptionPage implements OnInit {
  @Input() productInfo: ProductSchema;
  @Input() adminInfo: AdminCurrencySchema;

  constructor() { }

  ngOnInit() {
  }

}
