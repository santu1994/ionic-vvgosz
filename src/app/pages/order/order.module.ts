import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderPageRoutingModule } from './order-routing.module';

import { OrderPage } from './order.page';
import { CommonShareModule } from 'src/app/common/module/common/common-share.module';
import { MaterialModule } from 'src/app/common/material/material.module';
import { TrackingHistoryPageModule } from '../profile/pages/my-orders/pages/tracking-history/tracking-history.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderPageRoutingModule,
    CommonShareModule,
    MaterialModule,
    TrackingHistoryPageModule
  ],
  declarations: [OrderPage]
})
export class OrderPageModule { }
