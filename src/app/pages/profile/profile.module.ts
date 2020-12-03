import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';

import { ProfilePage } from './profile.page';
import { CommonShareModule } from 'src/app/common/module/common/common-share.module';
import { MaterialModule } from 'src/app/common/material/material.module';
import { MyOrdersPageModule } from './pages/my-orders/my-orders.module';
import { BidBalancePageModule } from './pages/bid-balance/bid-balance.module';
import { MyBidPageModule } from './pages/my-bid/my-bid.module';
import { MyAddressPageModule } from './pages/my-address/my-address.module';
import { EditProfilePageModule } from './pages/edit-profile/edit-profile.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePageRoutingModule,
    CommonShareModule,
    MaterialModule,
    MyOrdersPageModule,
    BidBalancePageModule,
    EditProfilePageModule,
    MyBidPageModule,
    MyAddressPageModule
  ],
  exports: [EditProfilePageModule],
  declarations: [ProfilePage]
})
export class ProfilePageModule { }
