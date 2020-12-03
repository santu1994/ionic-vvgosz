import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderPlacedPageRoutingModule } from './order-placed-routing.module';

import { OrderPlacedPage } from './order-placed.page';
import { MaterialModule } from 'src/app/common/material/material.module';
import { CommonShareModule } from 'src/app/common/module/common/common-share.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderPlacedPageRoutingModule,
    CommonShareModule,
    MaterialModule
  ],
  declarations: [OrderPlacedPage]
})
export class OrderPlacedPageModule { }
