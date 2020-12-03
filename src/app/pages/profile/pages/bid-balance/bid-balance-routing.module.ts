import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BidBalancePage } from './bid-balance.page';

const routes: Routes = [
  {
    path: '',
    component: BidBalancePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BidBalancePageRoutingModule {}
