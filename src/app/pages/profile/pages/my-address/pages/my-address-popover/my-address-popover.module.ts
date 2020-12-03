import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyAddressPopoverPageRoutingModule } from './my-address-popover-routing.module';

import { MyAddressPopoverPage } from './my-address-popover.page';
import { MaterialModule } from 'src/app/common/material/material.module';
import { CommonShareModule } from 'src/app/common/module/common/common-share.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyAddressPopoverPageRoutingModule,
    CommonShareModule,
    MaterialModule
  ],
  declarations: [MyAddressPopoverPage]
})
export class MyAddressPopoverPageModule { }
