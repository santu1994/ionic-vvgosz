import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChangePasswordPageRoutingModule } from './change-password-routing.module';

import { ChangePasswordPage } from './change-password.page';
import { MaterialModule } from 'src/app/common/material/material.module';
import { CommonShareModule } from 'src/app/common/module/common/common-share.module';
import { I18nModule } from 'src/app/common/i18n/i18n.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    ChangePasswordPageRoutingModule,
    CommonShareModule,
    MaterialModule,
    I18nModule
  ],
  declarations: [ChangePasswordPage]
})
export class ChangePasswordPageModule { }
