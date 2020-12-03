import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentsPageRoutingModule } from './payments-routing.module';

import { PaymentsPage } from './payments.page';
import { MaterialModule } from 'src/app/common/material/material.module';
import { CommonShareModule } from 'src/app/common/module/common/common-share.module';
import { OrderPlacedPageModule } from '../order-placed/order-placed.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaymentsPageRoutingModule,
    CommonShareModule,
    MaterialModule,
    OrderPlacedPageModule
  ],
  declarations: [PaymentsPage]
})
export class PaymentsPageModule { }
