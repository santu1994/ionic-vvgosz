import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerSchema } from 'src/app/common/model/customer.model';
import { NotificationService } from 'src/app/common/services/notification.service';
import { CustomerModel } from '../login/common/model/login.model';
import { ForgotPasswordService } from './common/service/forgot-password.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerEmailCheckService } from 'src/app/common/validation/service/customer-email-check.service';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import * as _ from 'lodash';
import { CustomerEmailCheck } from 'src/app/common/validation/customer-email-check.validator';
import * as CryptoJS from 'crypto-js';
import { PasswordMatchValidator } from 'src/app/common/validation/password-match.validator';
import { AuthService } from 'src/app/common/services/auth.service';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';

const CUSTOMER_OTP = 'bidzone-customer-otp';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit, AfterViewInit {
  randomNumber = Math.floor(Math.random() * 2) + 1;
  formShow = {
    verifyEmail: true,
    verifyOTP: false,
    newPassword: false,
  };
  config = {
    allowNumbersOnly: true,
    length: 5,
    isPasswordInput: false,
    disableAutoFocus: true,
    inputStyles: {
      width: '50px',
      height: '50px',
      'margin-left': '10px',
      outline: 'none',
    },
  };
  passwordHide = true;
  cpasswordHide = true;
  isSuccess = false;
  customerId: string;
  otpValue: number;
  sendOTP: number;
  customerInfo: CustomerSchema;
  forgotEmailForm: FormGroup;
  public passwordForm: FormGroup;
  public loading = false;
  successMessage = 'Your password has been reset successfully!';

  /**
   * @description Login Validation Message
   */
  public inputValidationMessages = {
    email: [
      { required: 'Email is required' },
      { email: 'Enter valid email' },
      { emailExists: 'Email already exists' },
      { emailNotExists: 'Email isn\'t found' },
    ],
    password: [
      { required: 'Password is required' },
      { minlength: 'Minimum password length is 6 characters' },
    ],
    confirm_password: [
      { required: 'Confirm Password is required' },
      { minlength: 'Minimum confirm password length is 6 characters' },
      {
        passwordMatchValidator: 'Password and Confirm Password must be match',
      },
    ],
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private notification: NotificationService,
    private service: ForgotPasswordService,
    private customerEmailCheck: CustomerEmailCheckService,
    private keyboard: Keyboard,
    public fb: FormBuilder,
    public auth: AuthService,
    private storage: Storage,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    /**
     * @description Forgot Email Form
     */
    this.forgotEmailForm = this.fb.group({
      email: [
        '',
        Validators.compose([
          Validators.required,
          Validators.email,
          Validators.minLength(5),
        ]),
        CustomerEmailCheck(this.customerEmailCheck, 'forget'),
      ],
    });

    /**
     * @description Password Form
     */
    this.passwordForm = this.fb.group(
      {
        _id: ['', Validators.compose([])],
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
  }

  ngAfterViewInit(): void {
    /**
     * @description Get Query Param
     */
    this.route.queryParamMap.subscribe((params) => {
      // tslint:disable-next-line:no-string-literal
      this.customerId = params['params'].info;
      if (this.customerId) {
        // OTP
        this.formShow.verifyEmail = false;
        this.formShow.verifyOTP = true;
        this.storage.get(CUSTOMER_OTP).then((val) => {
          this.sendOTP = val;
        });
      }
    });
  }

  /**
   * @description OTP Change
   */
  accountVerifySubmit() {
    if (!this.otpValue) {
      return;
    } else if (this.otpValue.toString().length !== 5) {
      return;
    } else {
      if (Number(this.otpValue) === Number(this.sendOTP)) {
        // Has Customer Id
        if (this.customerId) {
          this.loading = true;
          // Keyboard Hide
          this.keyboard.hide();
          this.service.updateStatus({ _id: this.customerId }).subscribe(
            (response: CustomerModel) => {
              this.loading = false;
              if (response.success) {
                this.formShow.verifyOTP = false;
                this.isSuccess = true;
                this.successMessage = 'Your account has been verified successfully!';
                setTimeout(() => {
                  this.router.navigate(['/login']);
                }, 3000);
              } else {
                this.notification.showError(this.translate.instant(response.msg), 'X', 2000);
              }
            },
            (error) => {
              this.loading = false;
              this.notification.showError(error, 'X', 2000);
            }
          );
        } else {
          this.formShow.verifyOTP = false;
          this.formShow.newPassword = true;
        }
      } else {
        this.notification.showError('OTP does not match', 'X', 2000);
      }
    }
  }

  /**
   * @description Forgot Email Validation
   */
  forgotEmailValidateInput(name?: any) {
    let errorMsg: any;
    const control = this.forgotEmailForm.get(name);
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

  /**
   * @description Forgot Email Submit
   */
  onForgotEmailSubmit() {
    // Validation Check
    if (this.forgotEmailForm.invalid) {
      return;
    }
    // Keyboard Hide
    this.keyboard.hide();

    this.loading = true;
    this.service.emailSendOtp(this.forgotEmailForm.value).subscribe(
      (response: CustomerModel) => {
        this.loading = false;
        if (response.success) {
          this.customerInfo = response.data.user;
          const bytes = CryptoJS.AES.decrypt(response.data.otp, 'bidzone');
          this.sendOTP = bytes.toString(CryptoJS.enc.Utf8);
          this.formShow.verifyEmail = false;
          this.formShow.verifyOTP = true;
          this.passwordForm.patchValue({
            _id: response.data.user._id
          });
        } else {
          this.notification.showError(this.translate.instant(response.msg), 'X', 2000);
        }
      },
      (error) => {
        this.loading = false;
        this.notification.showError(error, 'X', 2000);
      }
    );
  }

  /**
   * @description Password Validation
   */
  passwordValidateInput(name?: any) {
    let errorMsg: any;
    const control = this.passwordForm.get(name);
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

  /**
   * @description Password Update
   */
  onResetPasswordSubmit() {
    // Validation Check
    if (this.passwordForm.invalid) {
      return;
    }
    // Keyboard Hide
    this.keyboard.hide();
    this.loading = true;
    this.service.updatePassword(this.passwordForm.value).subscribe(
      (response: CustomerModel) => {
        this.loading = false;
        if (response.success) {
          this.formShow.newPassword = false;
          this.isSuccess = true;
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 3000);
        } else {
          this.notification.showError(this.translate.instant(response.msg), 'X', 2000);
        }
      },
      (error) => {
        this.loading = false;
        this.notification.showError(error, 'X', 2000);
      }
    );


  }
}
