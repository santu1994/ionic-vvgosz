import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BidBalancePageRoutingModule } from './bid-balance-routing.module';

import { BidBalancePage } from './bid-balance.page';
import { MaterialModule } from 'src/app/common/material/material.module';
import { CommonShareModule } from 'src/app/common/module/common/common-share.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BidBalancePageRoutingModule,
    CommonShareModule,
    MaterialModule
  ],
  declarations: [BidBalancePage]
})
export class BidBalancePageModule { }
