import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AdminBodyPageRoutingModule } from './admin-body-routing.module';
import { AdminBodyPage } from './admin-body.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminBodyPageRoutingModule
  ],
  declarations: [AdminBodyPage]
})
export class AdminBodyPageModule { }
