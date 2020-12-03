import { DeliveryAddressPageModule } from './pages/delivery-address/delivery-address.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CheckoutPageRoutingModule } from './checkout-routing.module';

import { CheckoutPage } from './checkout.page';
import { MaterialModule } from 'src/app/common/material/material.module';
import { CommonShareModule } from 'src/app/common/module/common/common-share.module';
import { PaymentsPageModule } from './pages/payments/payments.module';
import { CountdownModule } from 'ngx-countdown';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CheckoutPageRoutingModule,
    CommonShareModule,
    MaterialModule,
    DeliveryAddressPageModule,
    PaymentsPageModule,
    CountdownModule
  ],
  declarations: [CheckoutPage]
})
export class CheckoutPageModule { }
