import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { CustomerSchema } from 'src/app/common/model/customer.model';
import { NotificationService } from 'src/app/common/services/notification.service';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/pages/profile/common/service/profile.service';
import { CommonService } from 'src/app/common/services/common.service';
import { filter } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { PasswordMatchValidator } from 'src/app/common/validation/password-match.validator';
import * as CryptoJS from 'crypto-js';
import { PasswordCommonModel, GetCustomerModel } from 'src/app/pages/profile/common/model/profile.model';
import { CurrentCustomerOtpCheck } from './common/validation/customer-change-password.validator';
import { AuthService } from 'src/app/common/services/auth.service';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit, OnDestroy {
  public customerInfo: CustomerSchema;
  customerSubscription: Subscription;

  public changePasswordForm: FormGroup;

  hide = {
    password: true,
    confirm_password: true,
  };

  /**
   * @description Change Password Validation Message
   */
  public inputValidationMessages = {
    otp: [
      {
        required: 'OTP is required',
      },
      {
        customerOtpCheck: 'OTP is incorrect',
      },
    ],
    password: [
      {
        required: 'Password is required',
      },
      { minlength: 'Minimum password length is 6 characters' },
    ],
    confirm_password: [
      {
        required: 'Confirm Password is required',
      },
      {
        minlength: 'Minimum confirm password length is 6 characters',
      },
      {
        passwordMatchValidator: 'Password and Confirm Password must be match',
      },
    ],
  };
  loading: boolean;

  constructor(
    public modalController: ModalController,
    private notification: NotificationService,
    private router: Router,
    private service: ProfileService,
    private commonService: CommonService,
    public fb: FormBuilder,
    public authService: AuthService,
    private translate: TranslateService,
    private keyboard: Keyboard
  ) { }

  ngOnInit() {

    /**
     * @description Change Password Form
     */
    this.changePasswordForm = this.fb.group(
      {
        _id: ['', Validators.compose([Validators.required])],
        otp: ['', Validators.compose([Validators.required])],
        password: [
          '',
          Validators.compose([Validators.required, Validators.minLength(6)]),
        ],
        confirm_password: [
          '',
          Validators.compose([Validators.required, Validators.minLength(6)]),
        ],
      },
      {
        validator: PasswordMatchValidator('password', 'confirm_password'),
      }
    );

    /**
     * @description Customer Info
     */
    this.customerSubscription = this.commonService.customerData
      .pipe(filter((val) => val !== null))
      .subscribe((stateData: CustomerSchema) => {
        this.customerInfo = stateData;
        this.sentOTP(stateData);
        this.changePasswordForm.patchValue({
          _id: this.customerInfo._id,
        });

      });
  }

  /**
   * @description Change Password Validation
   */
  validateInput(name?: any) {
    let errorMsg: any;
    const control = this.changePasswordForm.get(name);
    if (control && control.errors) {
      // tslint:disable-next-line:forin
      for (const key in control.errors) {
        _.map(this.inputValidationMessages[name], (o) => {
          if (o.hasOwnProperty(key)) {
            return (errorMsg = o[key]);
          }
        });
        return errorMsg;
      }
    }
  }

  ngOnDestroy() {
    this.customerSubscription.unsubscribe();
  }

  /**
   * @description Sent OTP
   */
  sentOTP(customerInfo: CustomerSchema) {
    this.loading = true;
    this.service.sentOtp({ _id: customerInfo._id }).subscribe(
      (response: PasswordCommonModel) => {
        this.loading = false;
        if (response.success) {
          const bytes = CryptoJS.AES.decrypt(response.data, 'bidzone');
          const otp = bytes.toString(CryptoJS.enc.Utf8);
          this.changePasswordForm.controls['otp'].setAsyncValidators([
            CurrentCustomerOtpCheck(otp),
          ]);
          this.changePasswordForm.controls['otp'].updateValueAndValidity();
          this.notification.showSuccess(this.translate.instant(response.msg) + ' ' + this.customerInfo.email,
            '',
            3000
          );
        } else {
          this.loading = false;
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
   * @description Password Update
   */
  async onPasswordSubmit() {
    // Keyboard Hide
    await this.keyboard.hide();
    // Validation Check
    if (this.changePasswordForm.invalid) {
      return;
    }
    this.loading = true;
    this.service.updatePassword(this.changePasswordForm.value).subscribe(
      (response: GetCustomerModel) => {
        this.loading = false;
        if (response.success) {
          this.notification.showSuccess(this.translate.instant(response.msg),
            '',
            3000
          );
          this.modalController.dismiss({ dismissed: false });
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
        } else {
          this.notification.showError(this.translate.instant(response.msg), '', 3000);
        }
      },
      (error) => {
        this.loading = false;
        this.notification.showError(error, 'X', 2000);
      }
    );
  }

  /**
   * @description Close Modal
   */
  async closeModal() {
    await this.modalController.dismiss({ dismissed: true });
  }
}
