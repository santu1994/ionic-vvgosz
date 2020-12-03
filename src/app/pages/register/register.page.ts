import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { TranslateService } from '@ngx-translate/core';
import * as _ from 'lodash';
import { NotificationService } from 'src/app/common/services/notification.service';
import { CustomerEmailCheck } from 'src/app/common/validation/customer-email-check.validator';
import { PasswordMatchValidator } from 'src/app/common/validation/password-match.validator';
import { CustomerEmailCheckService } from 'src/app/common/validation/service/customer-email-check.service';
import { RegistrationCustomerModel } from '../login/common/model/login.model';
import { RegistrationService } from './common/service/registration.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  randomNumber = Math.floor(Math.random() * 2) + 1;
  passwordHide = true;
  confirmPasswordHide = true;
  public registrationForm: FormGroup;
  public loading = false;

  /**
   * @description Login Validation Message
   */
  public inputValidationMessages = {
    name: [
      { required: 'Name is required' },
      { minlength: 'Minimum name length is 6 characters' },
    ],
    email: [
      { required: 'Email is required' },
      { email: 'Enter valid email' },
      { emailExists: 'Email already exists' },
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
    public fb: FormBuilder,
    private service: RegistrationService,
    private notification: NotificationService,
    private customerEmailCheck: CustomerEmailCheckService,
    private keyboard: Keyboard,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    /**
     * @description Registration Form
     */
    this.registrationForm = this.fb.group(
      {
        name: [
          '',
          Validators.compose([Validators.required, Validators.minLength(3)]),
        ],
        email: [
          '',
          Validators.compose([
            Validators.required,
            Validators.email,
            Validators.minLength(5),
          ]),
          CustomerEmailCheck(this.customerEmailCheck),
        ],
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

  /**
   * @description Registration Validation
   */
  registrationValidateInput(name?: any) {
    let errorMsg: any;
    const control = this.registrationForm.get(name);
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
   * @description Registration Form Submit
   */
  onRegistrationSubmit() {
    // Validation Check
    if (this.registrationForm.invalid) {
      return;
    }
    // Keyboard Hide
    this.keyboard.hide();
    this.loading = true;
    this.service.registration(this.registrationForm.value).subscribe(
      (response: RegistrationCustomerModel) => {
        this.loading = false;
        if (response.success) {
          this.notification.showSuccess(this.translate.instant(response.msg), '', 2000);
          this.router.navigate(['/login']);
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
