import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyAddressAddPageRoutingModule } from './my-address-add-routing.module';

import { MyAddressAddPage } from './my-address-add.page';
import { MaterialModule } from 'src/app/common/material/material.module';
import { CommonShareModule } from 'src/app/common/module/common/common-share.module';
import { I18nModule } from 'src/app/common/i18n/i18n.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    MyAddressAddPageRoutingModule,
    CommonShareModule,
    MaterialModule,
    I18nModule
  ],
  declarations: [MyAddressAddPage]
})
export class MyAddressAddPageModule { }
