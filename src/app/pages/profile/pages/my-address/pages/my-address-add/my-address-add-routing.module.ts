import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyAddressAddPage } from './my-address-add.page';

const routes: Routes = [
  {
    path: '',
    component: MyAddressAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyAddressAddPageRoutingModule {}
