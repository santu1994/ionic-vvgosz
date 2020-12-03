import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyOrdersPageRoutingModule } from './my-orders-routing.module';

import { MyOrdersPage } from './my-orders.page';
import { CommonShareModule } from 'src/app/common/module/common/common-share.module';
import { TrackingHistoryPageModule } from './pages/tracking-history/tracking-history.module';
import { MaterialModule } from 'src/app/common/material/material.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommonShareModule,
    MaterialModule,
    MyOrdersPageRoutingModule,
    TrackingHistoryPageModule
  ],
  declarations: [MyOrdersPage]
})
export class MyOrdersPageModule { }
