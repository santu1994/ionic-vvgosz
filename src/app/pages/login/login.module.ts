import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import { MaterialModule } from '../../common/material/material.module';
import { I18nModule } from 'src/app/common/i18n/i18n.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    LoginPageRoutingModule,
    MaterialModule,
    I18nModule
  ],
  declarations: [LoginPage]
})
export class LoginPageModule { }
