import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { NotificationService } from 'src/app/common/services/notification.service';
import { CustomerModel } from './common/model/login.model';
import { LoginService } from './common/service/login.service';
import * as CryptoJS from 'crypto-js';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { AuthService } from 'src/app/common/services/auth.service';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';

const TOKEN_KEY = 'bidzone-token';
const CUSTOMER_KEY = 'bidzone-customer';
const CUSTOMER_OTP = 'bidzone-customer-otp';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {
  @ViewChild('form', { static: true }) form;
  randomNumber = Math.floor(Math.random() * 2) + 1;
  passwordHide = true;
  public loginForm: FormGroup;
  public loading = false;

  /**
   * @description Login Validation Message
   */
  public inputValidationMessages = {
    email: [{ required: 'Email is required' }, { email: 'Enter valid email' }],
    password: [
      { required: 'Password is required' },
      { minlength: 'Minimum password length is 6 characters' },
    ],
  };

  constructor(
    private router: Router,
    public fb: FormBuilder,
    private service: LoginService,
    private notification: NotificationService,
    private authService: AuthService,
    private keyboard: Keyboard,
    private storage: Storage,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    /**
     * @description Login Form
     */
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(6)]),
      ],
    });
    this.storage.remove(CUSTOMER_OTP);
  }

  ngOnDestroy() {
    this.form.resetForm();
  }

  /**
   * @description Login Validation
   */
  validateInput(name?: any) {
    let errorMsg: any;
    const control = this.loginForm.get(name);
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

  forgotPassword() {
    this.router.navigate(['/forgot-password']);
  }

  async onSubmit() {
    // Validation Check
    if (this.loginForm.invalid) {
      return;
    }
    // Keyboard Hide
    await this.keyboard.hide();
    this.loading = true;
    this.service.login(this.loginForm.value).subscribe((response: CustomerModel) => {
      this.loading = false;
      if (response.success) {
        this.form.resetForm();
        let OTP = 0;
        if (response.msg === 'OTP') {
          const bytes = CryptoJS.AES.decrypt(response.data.otp, 'bidzone');
          OTP = bytes.toString(CryptoJS.enc.Utf8);
        }
        if (response.data.user.is_verified) {
          this.storage.set(TOKEN_KEY, response.data.token);
          this.storage.set(CUSTOMER_KEY, JSON.stringify(response.data.user));
          this.authService.isAuthenticated.next(true);
          this.authService.loginInfo.next(response.data.user);
          this.router.navigate(['/admin']);
          this.notification.showSuccess(this.translate.instant(response.msg), '', 2000);
        } else {
          this.storage.set(CUSTOMER_OTP, OTP);
          this.router.navigate(['/forgot-password'], { queryParams: { info: response.data.user._id } });
        }
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
