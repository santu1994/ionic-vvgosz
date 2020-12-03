import { Component, OnInit, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { ModalController } from '@ionic/angular';
import { OrderPlacedPage } from '../order-placed/order-placed.page';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.page.html',
  styleUrls: ['./payments.page.scss'],
})
export class PaymentsPage implements OnInit {
  @ViewChild('stepper') stepper: MatStepper;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() { }

  ionViewDidEnter() {
    this.nextClick();
  }

  /**
   * @description Next Step
   */
  nextClick(): void {
    this.stepper.linear = false;
    this.stepper.selectedIndex = 2;
    setTimeout(() => {
      this.stepper.linear = true;
    });
  }

  /**
   * @description Close Modal
   */
  async closeModal() {
    await this.modalCtrl.dismiss({ dismissed: true });
  }

  /**
   * @description View Order Placed  Modal Show
   */
  async viewOrderPlacedModal() {
    const modal = await this.modalCtrl.create({
      component: OrderPlacedPage,
    });
    modal.onDidDismiss().then(async (data) => {
      if (!data.data.dismissed) {
        await this.modalCtrl.dismiss({ dismissed: false });
      }
    });
    return await modal.present();
  }
}
