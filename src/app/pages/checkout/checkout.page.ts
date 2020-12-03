import { ChangeDetectionStrategy, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { ModalController } from '@ionic/angular';
import { AdminCurrencySchema } from 'src/app/common/model/adminLogin.model';
import { CustomerSchema } from 'src/app/common/model/customer.model';
import { DeliveryAddressPage } from './pages/delivery-address/delivery-address.page';
import { PaymentsPage } from './pages/payments/payments.page';
import { Subscription } from 'rxjs';
import { CountdownConfig } from 'ngx-countdown';
import { ProfileService } from '../profile/common/service/profile.service';
import { GetCustomerAddressModel } from '../profile/common/model/profile.model';
import * as _ from 'lodash';
import { CustomerAddressSchema } from 'src/app/common/model/customerAddress.model';
import { NotificationService } from 'src/app/common/services/notification.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage {
  @ViewChild('stepper') stepper: MatStepper;
  @Input() productId: string;
  @Input() customerInfo: CustomerSchema;
  @Input() adminInfo: AdminCurrencySchema;
  addressLoader: boolean;
  addressList: CustomerAddressSchema[] = [];
  selectAddress: CustomerAddressSchema;

  /**
   * @description Count Down Timer
   */
  CountdownTimeUnits: Array<[string, number]> = [
    ['Y', 1000 * 60 * 60 * 24 * 365], // years
    ['M', 1000 * 60 * 60 * 24 * 30], // months
    ['D', 1000 * 60 * 60 * 24], // days
    ['H', 1000 * 60 * 60], // hours
    ['m', 1000 * 60], // minutes
    ['s', 1000], // seconds
    ['S', 1], // million seconds
  ];

  moreThan24Hours: CountdownConfig = {
    formatDate: ({ date, formatStr }) => {
      let duration = Number(date || 0);

      return this.CountdownTimeUnits.reduce((current, [name, unit]) => {
        if (current.indexOf(name) !== -1) {
          const v = Math.floor(duration / unit);
          duration -= v * unit;
          return current.replace(
            new RegExp(`${name}+`, 'g'),
            (match: string) => {
              return v.toString().padStart(match.length, '0');
            }
          );
        }
        return current;
      }, formatStr);
    },
  };

  constructor(
    private modalCtrl: ModalController,
    private profileService: ProfileService,
    private notification: NotificationService
  ) { }

  ionViewWillEnter() {
    // Get Address
    this.getAddress();
  }

  ionViewDidEnter() {
    this.nextClick();
  }

  /**
   * @description Next Step
   */
  nextClick(): void {
    this.stepper.linear = false;
    this.stepper.selectedIndex = 1;
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
   * @description Get Address
   */
  getAddress() {
    this.addressLoader = true;
    this.profileService
      .getAddress({
        customer_id: this.customerInfo._id,
        is_deleted: false,
      })
      .subscribe(
        (response: GetCustomerAddressModel) => {
          this.addressLoader = false;
          if (response.success) {
            const isDefault = _.filter(response.data, 'is_default');
            if (isDefault.length > 0) {
              this.selectAddress = isDefault[0];
            }
            this.addressList = response.data;
          }
        },
        (error) => {
          this.addressLoader = false;
          this.notification.showError(error, '', 3000);
        }
      );
  }

  /**
   * @description View Details Modal Show
   */
  async viewAddressModal() {
    const modal = await this.modalCtrl.create({
      component: DeliveryAddressPage,
      componentProps: {
        addressList: this.addressList,
        selectAddress: this.selectAddress,
        customerInfo: this.customerInfo
      }
    });
    modal.onDidDismiss().then((data) => {
      if (!data.data.dismissed) {
        this.selectAddress = data.data.address;
      }
    });
    return await modal.present();
  }

  /**
   * @description View Payment Modal Show
   */
  async viewPaymentModal() {
    const modal = await this.modalCtrl.create({
      component: PaymentsPage,
    });
    // modal.onDidDismiss().then(async (data) => {
    //   if (!data.data.dismissed) {
    //     await this.modalCtrl.dismiss({ dismissed: false });
    //   }
    // });
    return await modal.present();
  }
}
