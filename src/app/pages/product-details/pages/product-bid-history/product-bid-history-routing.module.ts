import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductBidHistoryPage } from './product-bid-history.page';

const routes: Routes = [
  {
    path: '',
    component: ProductBidHistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductBidHistoryPageRoutingModule {}
