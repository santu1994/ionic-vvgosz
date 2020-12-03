import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { ModalController } from '@ionic/angular';
import * as _ from 'lodash';
import { CustomerSchema } from 'src/app/common/model/customer.model';
import { CustomerAddressSchema } from 'src/app/common/model/customerAddress.model';
import { NotificationService } from 'src/app/common/services/notification.service';
import { GetCustomerAddressModel } from 'src/app/pages/profile/common/model/profile.model';
import { ProfileService } from 'src/app/pages/profile/common/service/profile.service';
import { MyAddressAddPage } from 'src/app/pages/profile/pages/my-address/pages/my-address-add/my-address-add.page';

@Component({
  selector: 'app-delivery-address',
  templateUrl: './delivery-address.page.html',
  styleUrls: ['./delivery-address.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeliveryAddressPage implements OnInit {
  @ViewChild('stepper') stepper: MatStepper;
  @Input() addressList: CustomerAddressSchema[] = [];
  @Input() selectAddress: CustomerAddressSchema;
  @Input() customerInfo: CustomerSchema;
  addressLoader: boolean;

  constructor(
    private modalCtrl: ModalController,
    private profileService: ProfileService,
    private notification: NotificationService
  ) { }

  ngOnInit() { }

  ionViewDidEnter() {
    this.nextClick();
  }
  /**
   * @description Next Step
   */
  nextClick(): void {
    this.stepper.linear = false;
    this.stepper.selectedIndex = 0;
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
   * @description Address Modal
   */
  async addressModel(address: CustomerAddressSchema = null) {
    const modal = await this.modalCtrl.create({
      component: MyAddressAddPage,
      componentProps: {
        address,
      },
    });
    modal.onDidDismiss().then((data) => {
      if (!data.data.dismissed) {
        this.getAddress();
      }
    });
    return await modal.present();
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
   * @description Select Address
   */
  selectEvent(event) {
    const address = _.filter(this.addressList, { _id: event.detail.value });
    if (address.length > 0) {
      this.selectAddress = address[0];
    }
  }

  /**
   * @description Get Delivery
   */
  async delivery() {
    await this.modalCtrl.dismiss({
      dismissed: false,
      address: this.selectAddress,
    });
  }
}
