import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyAddressPageRoutingModule } from './my-address-routing.module';

import { MyAddressPage } from './my-address.page';
import { CommonShareModule } from 'src/app/common/module/common/common-share.module';
import { MaterialModule } from 'src/app/common/material/material.module';
import { MyAddressPopoverPageModule } from './pages/my-address-popover/my-address-popover.module';
import { MyAddressAddPageModule } from './pages/my-address-add/my-address-add.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyAddressPageRoutingModule,
    CommonShareModule,
    MaterialModule,
    MyAddressPopoverPageModule,
    MyAddressAddPageModule
  ],
  declarations: [MyAddressPage]
})
export class MyAddressPageModule { }
