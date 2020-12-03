import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuctionPageRoutingModule } from './auction-routing.module';

import { AuctionPage } from './auction.page';
import { CommonShareModule } from 'src/app/common/module/common/common-share.module';
import { MaterialModule } from 'src/app/common/material/material.module';
import { ProductDetailsPageModule } from '../product-details/product-details.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AuctionPageRoutingModule,
    CommonShareModule,
    MaterialModule,
    ProductDetailsPageModule
  ],
  declarations: [AuctionPage]
})
export class AuctionPageModule { }
