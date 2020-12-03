import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyAddressPopoverPage } from './my-address-popover.page';

const routes: Routes = [
  {
    path: '',
    component: MyAddressPopoverPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyAddressPopoverPageRoutingModule {}
