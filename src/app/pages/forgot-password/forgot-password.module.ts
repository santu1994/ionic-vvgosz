import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ForgotPasswordPageRoutingModule } from './forgot-password-routing.module';

import { ForgotPasswordPage } from './forgot-password.page';
import { MaterialModule } from 'src/app/common/material/material.module';
import { NgOtpInputModule } from 'ng-otp-input';
import { I18nModule } from 'src/app/common/i18n/i18n.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ForgotPasswordPageRoutingModule,
    MaterialModule,
    NgOtpInputModule,
    I18nModule
  ],
  declarations: [ForgotPasswordPage]
})
export class ForgotPasswordPageModule { }
