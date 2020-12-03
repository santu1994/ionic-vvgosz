import { Component, OnInit, Input } from '@angular/core';
import { ProductSchema } from 'src/app/common/model/product.model';

@Component({
  selector: 'app-product-variant',
  templateUrl: './product-variant.page.html',
  styleUrls: ['./product-variant.page.scss'],
})
export class ProductVariantPage implements OnInit {
  @Input() productInfo: ProductSchema;
  constructor() { }

  ngOnInit() {
  }

}
