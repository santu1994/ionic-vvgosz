import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MoreProductDetailsPageRoutingModule } from './more-product-details-routing.module';

import { MoreProductDetailsPage } from './more-product-details.page';
import { CommonShareModule } from 'src/app/common/module/common/common-share.module';
import { MaterialModule } from 'src/app/common/material/material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MoreProductDetailsPageRoutingModule,
    CommonShareModule,
    MaterialModule
  ],
  declarations: [MoreProductDetailsPage]
})
export class MoreProductDetailsPageModule { }
