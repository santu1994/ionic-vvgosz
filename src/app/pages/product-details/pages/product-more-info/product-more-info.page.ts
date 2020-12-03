import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AdminCurrencySchema } from 'src/app/common/model/adminLogin.model';
import { ProductSchema } from 'src/app/common/model/product.model';
import { MoreProductDetailsPage } from '../more-product-details/more-product-details.page';

@Component({
  selector: 'app-product-more-info',
  templateUrl: './product-more-info.page.html',
  styleUrls: ['./product-more-info.page.scss'],
})
export class ProductMoreInfoPage implements OnInit {
  @Input() productInfo: ProductSchema;
  @Input() adminInfo: AdminCurrencySchema;
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  /**
   * @description More Product Details Modal
   */
  async moreDetails() {
    const modal = await this.modalCtrl.create({
      component: MoreProductDetailsPage,
      componentProps: {
        productInfo: this.productInfo,
        adminInfo: this.adminInfo
      }
    });
    return await modal.present();
  }
}
