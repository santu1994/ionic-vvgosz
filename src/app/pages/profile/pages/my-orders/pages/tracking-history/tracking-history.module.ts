import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrackingHistoryPageRoutingModule } from './tracking-history-routing.module';

import { TrackingHistoryPage } from './tracking-history.page';
import { CommonShareModule } from 'src/app/common/module/common/common-share.module';
import { MaterialModule } from 'src/app/common/material/material.module';
import { ProductDetailsPageModule } from 'src/app/pages/product-details/product-details.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrackingHistoryPageRoutingModule,
    CommonShareModule,
    MaterialModule,
    ProductDetailsPageModule
  ],

  declarations: [TrackingHistoryPage]
})
export class TrackingHistoryPageModule { }
