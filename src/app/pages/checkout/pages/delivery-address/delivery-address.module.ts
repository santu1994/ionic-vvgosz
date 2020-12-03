import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeliveryAddressPageRoutingModule } from './delivery-address-routing.module';

import { DeliveryAddressPage } from './delivery-address.page';
import { MaterialModule } from 'src/app/common/material/material.module';
import { CommonShareModule } from 'src/app/common/module/common/common-share.module';
import { MyAddressAddPageModule } from 'src/app/pages/profile/pages/my-address/pages/my-address-add/my-address-add.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeliveryAddressPageRoutingModule,
    CommonShareModule,
    MaterialModule,
    MyAddressAddPageModule
  ],
  declarations: [DeliveryAddressPage]
})
export class DeliveryAddressPageModule { }
