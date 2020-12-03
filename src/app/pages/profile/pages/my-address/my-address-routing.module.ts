import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyAddressPage } from './my-address.page';

const routes: Routes = [
  {
    path: '',
    component: MyAddressPage
  },
  {
    path: 'my-address-popover',
    loadChildren: () => import('./pages/my-address-popover/my-address-popover.module').then( m => m.MyAddressPopoverPageModule)
  },
  {
    path: 'my-address-add',
    loadChildren: () => import('./pages/my-address-add/my-address-add.module').then( m => m.MyAddressAddPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyAddressPageRoutingModule {}
