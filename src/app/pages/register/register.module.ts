import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterPageRoutingModule } from './register-routing.module';

import { RegisterPage } from './register.page';
import { MaterialModule } from 'src/app/common/material/material.module';
import { I18nModule } from 'src/app/common/i18n/i18n.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    RegisterPageRoutingModule,
    MaterialModule,
    I18nModule
  ],
  declarations: [RegisterPage]
})
export class RegisterPageModule { }
