import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyBidPageRoutingModule } from './my-bid-routing.module';

import { MyBidPage } from './my-bid.page';
import { MaterialModule } from 'src/app/common/material/material.module';
import { CommonShareModule } from 'src/app/common/module/common/common-share.module';
import { ProductDetailsPageModule } from 'src/app/pages/product-details/product-details.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyBidPageRoutingModule,
    CommonShareModule,
    MaterialModule,
    ProductDetailsPageModule
  ],
  declarations: [MyBidPage]
})
export class MyBidPageModule { }
