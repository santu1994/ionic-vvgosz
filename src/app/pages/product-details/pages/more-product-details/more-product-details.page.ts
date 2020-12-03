import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AdminCurrencySchema } from 'src/app/common/model/adminLogin.model';
import { ProductSchema } from 'src/app/common/model/product.model';
import * as env from 'src/environments/environment';

@Component({
  selector: 'app-more-product-details',
  templateUrl: './more-product-details.page.html',
  styleUrls: ['./more-product-details.page.scss'],
})
export class MoreProductDetailsPage implements OnInit {
  @Input() productInfo: ProductSchema;
  @Input() adminInfo: AdminCurrencySchema;
  baseUrl = env.environment.baseUrl;

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
