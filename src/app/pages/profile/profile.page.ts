import { Component, OnDestroy, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { MyOrdersPage } from './pages/my-orders/my-orders.page';
import { HeaderModel } from 'src/app/common/model/header.model';
import { BidBalancePage } from './pages/bid-balance/bid-balance.page';
import { MyBidPage } from './pages/my-bid/my-bid.page';
import { MyAddressPage } from './pages/my-address/my-address.page';
import { EditProfilePage } from './pages/edit-profile/edit-profile.page';
import { AuthService } from 'src/app/common/services/auth.service';
import { NotificationService } from 'src/app/common/services/notification.service';
import { Router } from '@angular/router';
import { CustomerSchema } from 'src/app/common/model/customer.model';
import { Storage } from '@ionic/storage';
import * as env from 'src/environments/environment';
import { ProfileService } from './common/service/profile.service';
import { GetCustomerAddressModel } from './common/model/profile.model';
import { CustomerAddressSchema } from 'src/app/common/model/customerAddress.model';
import { CommonService } from 'src/app/common/services/common.service';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { AdminCurrencySchema } from 'src/app/common/model/adminLogin.model';
const CUSTOMER_KEY = 'bidzone-customer';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {
  public customerInfo: CustomerSchema;
  public adminInfo: AdminCurrencySchema;
  public addressList: CustomerAddressSchema[];

  /**
   * @description Header Data
   */
  headerData: HeaderModel = {
    is_bid: false,
    is_logo: true,
  };
  baseUrl = env.environment.baseUrl + 'uploads/images/customer';
  customerSubscription: Subscription;
  adminSubscription: Subscription;
  loader = {
    address: true,
  };

  constructor(
    public modalController: ModalController,
    public authService: AuthService,
    private notification: NotificationService,
    private router: Router,
    private storage: Storage,
    private service: ProfileService,
    private commonService: CommonService,
    public alertController: AlertController
  ) { }

  ionViewWillEnter() {
    this.storage.get(CUSTOMER_KEY).then((valueStr) => {
      this.customerInfo = JSON.parse(valueStr);
      this.getAddress();
    });

    /**
     * @description Customer Info
     */
    this.customerSubscription = this.commonService.customerData
      .pipe(filter((val) => val !== null))
      .subscribe((stateData: CustomerSchema) => {
        this.customerInfo = stateData;
      });

    /**
     * @description Admin Info
     */
    this.adminSubscription = this.commonService.adminData
      .pipe(filter((val) => val !== null))
      .subscribe((stateData: AdminCurrencySchema) => {
        this.adminInfo = stateData;
      });
  }

  ionViewWillLeave() {
    this.customerSubscription.unsubscribe();
    this.adminSubscription.unsubscribe();
  }

  /**
   * @description My Order Modal Show
   */
  async viewMyOrderModal() {
    const modal = await this.modalController.create({
      component: MyOrdersPage,
      componentProps: {
        customerInfo: this.customerInfo,
        adminInfo: this.adminInfo
      }
    });
    modal.onDidDismiss().then((data) => {
      // if (data.data === 'success') {
      //   this.newPasswordModal(12);
      // }
    });
    return await modal.present();
  }

  /**
   * @description Bid Balance Modal Show
   */
  async viewBidBalanceModal() {
    const modal = await this.modalController.create({
      component: BidBalancePage,
    });
    modal.onDidDismiss().then((data) => {
      // if (data.data === 'success') {
      //   this.newPasswordModal(12);
      // }
    });
    return await modal.present();
  }

  /**
   * @description My Bid Modal Show
   */
  async viewMyBidModal() {
    const modal = await this.modalController.create({
      component: MyBidPage,
      componentProps: {
        customerInfo: this.customerInfo,
        adminInfo: this.adminInfo
      },
    });
    modal.onDidDismiss().then((data) => {
      // if (data.data === 'success') {
      //   this.newPasswordModal(12);
      // }
    });
    return await modal.present();
  }

  /**
   * @description My Address Modal Show
   */
  async viewMyAddressModal() {
    const modal = await this.modalController.create({
      component: MyAddressPage,
      componentProps: {
        address: this.addressList,
      },
    });
    modal.onDidDismiss().then((data) => {
      this.getAddress();
    });
    return await modal.present();
  }

  /**
   * @description Edit Profile Modal Show
   */
  async viewEditProfileModal() {
    const modal = await this.modalController.create({
      component: EditProfilePage,
    });
    modal.onDidDismiss().then((data) => {
      // if (data.data === 'success') {
      //   this.newPasswordModal(12);
      // }
    });
    return await modal.present();
  }

  /**
   * @description Get Address
   */
  getAddress() {
    this.loader.address = true;
    this.service
      .getAddress({
        customer_id: this.customerInfo._id,
        is_deleted: false,
      })
      .subscribe(
        (response: GetCustomerAddressModel) => {
          this.loader.address = false;
          if (response.success) {
            this.addressList = response.data;
          }
        },
        (error) => {
          this.loader.address = false;
          this.notification.showError(error, '', 3000);
        }
      );
  }

  /**
   * @description Logout
   */
  async logout() {
    const alert = await this.alertController.create({
      cssClass: 'conform-alert',
      message: 'Do you want to logout?',
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
            this.authService
              .logout()
              .then(() => {
                this.router.navigate(['/login']);
                setTimeout(() => {
                  this.commonService.updateCustomer(null);
                }, 3000);
              })
              .catch((err) => {
                this.notification.showError(err, 'X', 2000);
              });
          },
        },
      ],
    });
    await alert.present();
  }
}
