import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { CustomerSchema } from 'src/app/common/model/customer.model';
import { Storage } from '@ionic/storage';
import * as _ from 'lodash';
import { ProfileService } from 'src/app/pages/profile/common/service/profile.service';
import { CustomerAddressModel } from 'src/app/pages/profile/common/model/profile.model';
import { NotificationService } from 'src/app/common/services/notification.service';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { CustomerAddressSchema } from 'src/app/common/model/customerAddress.model';
import { TranslateService } from '@ngx-translate/core';
const CUSTOMER_KEY = 'bidzone-customer';
@Component({
  selector: 'app-my-address-add',
  templateUrl: './my-address-add.page.html',
  styleUrls: ['./my-address-add.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyAddressAddPage implements OnInit {
  @Input() address: CustomerAddressSchema;
  public customerInfo: CustomerSchema;
  public addressForm: FormGroup;
  loading: boolean;

  validationMessages = {
    name: [
      {
        required: 'Name is required',
      },
      { minlength: 'Minimum name length is 3 characters' },
    ],
    phone: [
      {
        required: 'Phone is required',
      },
    ],
    pin: [
      {
        required: 'Pin is required',
      },
    ],
    alter_phone: [
      {
        required: 'Alter phone is required',
      },
    ],
    address: [
      {
        required: 'Address is required',
      },
      { minlength: 'Minimum address length is 5 characters' },
    ],
    city: [
      {
        required: 'City is required',
      },
    ],
    state: [
      {
        required: 'State is required',
      },
    ],
    type: [
      {
        required: 'Address type is required',
      },
    ],
  };

  constructor(
    private modalCtrl: ModalController,
    public fb: FormBuilder,
    private storage: Storage,
    private service: ProfileService,
    private notification: NotificationService,
    private keyboard: Keyboard,
    private translate: TranslateService,
    private cdr: ChangeDetectorRef
  ) {
    this.cdr.detach();
  }

  ngOnInit() {
    /**
     * @description Address Form
     */
    this.addressForm = this.fb.group({
      _id: ['', Validators.compose([])],
      customer_id: ['', Validators.compose([Validators.required])],
      name: [
        '',
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      phone: ['', Validators.compose([Validators.required])],
      pin: ['', Validators.compose([Validators.required])],
      alter_phone: ['', Validators.compose([])],
      address: [
        '',
        Validators.compose([Validators.required, Validators.minLength(5)]),
      ],
      city: ['', Validators.compose([Validators.required])],
      state: ['', Validators.compose([Validators.required])],
      type: ['H', Validators.compose([Validators.required])],
    });

    this.cdr.detectChanges();
    // this.storage.get(CUSTOMER_KEY).then((valueStr) => {
    //   this.customerInfo = JSON.parse(valueStr);
    //   this.addressForm.patchValue({
    //     customer_id: this.customerInfo._id
    //   });
    // });

    // if (this.address) {
    //   this.addressForm.patchValue({
    //     _id: this.address._id,
    //     customer_id: this.address.customer_id,
    //     name: this.address.name,
    //     phone: this.address.phone,
    //     pin: this.address.pin,
    //     alter_phone: this.address.alter_phone,
    //     address: this.address.address,
    //     city: this.address.city,
    //     state: this.address.state,
    //     type: this.address.type
    //   });
    // }

  }

  ionViewDidEnter() {

  }


  /**
   * @description Form Validation
   */
  formValidateInput(name?: any) {
    let errorMsg: any;
    const control = this.addressForm.get(name);
    if (control && control.errors) {
      // tslint:disable-next-line:forin
      for (const key in control.errors) {
        _.map(this.validationMessages[name], (o) => {
          if (o.hasOwnProperty(key)) {
            return (errorMsg = o[key]);
          }
        });
        return errorMsg;
      }
    }
  }

  /**
   * @description Submit Form
   * @params Address Form data
   */
  async onSubmit() {
    // Not Validated
    if (this.addressForm.invalid) {
      return;
    }
    // Keyboard Hide
    await this.keyboard.hide();
    this.loading = true;
    this.service.editAddress(this.addressForm.value).subscribe(
      (response: CustomerAddressModel) => {
        this.loading = false;
        if (response.success) {
          this.notification.showSuccess(this.translate.instant(response.msg), '', 3000);
          this.modalCtrl.dismiss({ dismissed: false });
        } else {
          this.notification.showError(this.translate.instant(response.msg), '', 3000);
        }
      },
      (error) => {
        this.loading = false;
        this.notification.showError(error, '', 3000);
      }
    );
  }

  /**
   * @description Close Modal
   */
  async closeModal() {
    await this.modalCtrl.dismiss({ dismissed: true });
  }
}
