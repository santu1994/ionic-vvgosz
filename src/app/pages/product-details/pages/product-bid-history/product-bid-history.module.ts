import { MaterialModule } from './../../../../common/material/material.module';
import { CommonShareModule } from './../../../../common/module/common/common-share.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductBidHistoryPageRoutingModule } from './product-bid-history-routing.module';

import { ProductBidHistoryPage } from './product-bid-history.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductBidHistoryPageRoutingModule,
    CommonShareModule,
    MaterialModule
  ],
  declarations: [ProductBidHistoryPage]
})
export class ProductBidHistoryPageModule { }
