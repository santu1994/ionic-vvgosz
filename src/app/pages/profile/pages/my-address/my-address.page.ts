import { Component, OnInit, Input } from '@angular/core';
import {
  AlertController,
  ModalController,
  PopoverController,
} from '@ionic/angular';
import { MyAddressPopoverPage } from './pages/my-address-popover/my-address-popover.page';
import { MyAddressAddPage } from './pages/my-address-add/my-address-add.page';
import { CustomerAddressSchema } from 'src/app/common/model/customerAddress.model';
import * as _ from 'lodash';
import {
  CustomerAddressModel,
  GetCustomerAddressModel,
} from '../../common/model/profile.model';
import { NotificationService } from 'src/app/common/services/notification.service';
import { ProfileService } from '../../common/service/profile.service';
import { CustomerSchema } from 'src/app/common/model/customer.model';
import { Storage } from '@ionic/storage';
import { async } from '@angular/core/testing';
const CUSTOMER_KEY = 'bidzone-customer';

@Component({
  selector: 'app-my-address',
  templateUrl: './my-address.page.html',
  styleUrls: ['./my-address.page.scss'],
})
export class MyAddressPage implements OnInit {
  @Input() address: CustomerAddressSchema[];
  public customerInfo: CustomerSchema;
  loader: boolean;
  constructor(
    private modalCtrl: ModalController,
    public popoverController: PopoverController,
    private notification: NotificationService,
    private service: ProfileService,
    private storage: Storage,
    public alertController: AlertController
  ) { }

  ngOnInit() {
    this.storage.get(CUSTOMER_KEY).then((valueStr) => {
      this.customerInfo = JSON.parse(valueStr);
    });
  }

  /**
   * @description Address Modal
   */
  async addressModel(address: CustomerAddressSchema = null) {
    const modal = await this.modalCtrl.create({
      component: MyAddressAddPage,
      componentProps: {
        address
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
   * @description Close Modal
   */
  async closeModal() {
    await this.modalCtrl.dismiss({ dismissed: true });
  }

  /**
   * @description Open Menu
   */
  async openMenu(ev: any, address: CustomerAddressSchema) {
    const popover = await this.popoverController.create({
      component: MyAddressPopoverPage,
      cssClass: 'my-address-popover',
      event: ev,
      translucent: true,
      componentProps: {
        address,
      },
    });

    await popover.present();
    await popover.onDidDismiss().then((data) => {
      if (data.data) {
        // Set Default
        if (data.data.event === 'default') {
          this.defaultAddress(data.data.address);
        }
        // Edit
        if (data.data.event === 'edit') {
          this.addressModel(data.data.address);
        }
        // Delete
        if (data.data.event === 'delete') {
          this.deleteAddressModal(data.data.address);
        }
      }
    });
  }

  /**
   * @description Set Default Address
   */
  async defaultAddress(address: CustomerAddressSchema) {
    const previousDefaultAddress = _.result(
      // tslint:disable-next-line:no-shadowed-variable
      _.find(this.address, (address) => address.is_default === true),
      '_id'
    );
    this.loader = true;
    this.service
      .defaultAddress({
        _id: address._id,
        pre_id: previousDefaultAddress,
      })
      .subscribe(
        (response: CustomerAddressModel) => {
          this.loader = false;
          if (response.success) {
            this.getAddress();
          }
        },
        (error) => {
          this.loader = false;
          this.notification.showError(error, '', 3000);
        }
      );
  }

  /**
   * @description Delete Address Modal
   */
  async deleteAddressModal(address: CustomerAddressSchema) {
    const alert = await this.alertController.create({
      cssClass: 'conform-alert',
      message: 'Do you want to delete this address?',
      buttons: [
        {
          text: 'NO',
          role: 'cancel',
          cssClass: 'cancel-btn',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          },
        },
        {
          text: 'YES',
          cssClass: 'conform-btn',
          handler: () => {
            this.deleteAddress(address);
          },
        },
      ],
    });

    await alert.present();
  }

  /**
   * @description Delete Address
   */
  async deleteAddress(address: CustomerAddressSchema) {
    this.loader = true;
    this.service
      .deleteAddress({
        _id: address._id,
      })
      .subscribe(
        (response: CustomerAddressModel) => {
          this.loader = false;
          if (response.success) {
            this.getAddress();
            this.notification.showSuccess(
              'Address Successfully Deleted',
              '',
              2000
            );
          }
        },
        (error) => {
          this.loader = false;
          this.notification.showError(error, '', 3000);
        }
      );
  }

  /**
   * @description Get Address
   */
  async getAddress() {
    this.loader = true;
    this.service
      .getAddress({
        customer_id: this.customerInfo._id,
        is_deleted: false,
      })
      .subscribe(
        (response: GetCustomerAddressModel) => {
          this.loader = false;
          if (response.success) {
            this.address = response.data;
          }
        },
        (error) => {
          this.loader = false;
          this.notification.showError(error, '', 3000);
        }
      );
  }
}
