import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyBidPage } from './my-bid.page';

const routes: Routes = [
  {
    path: '',
    component: MyBidPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyBidPageRoutingModule {}
