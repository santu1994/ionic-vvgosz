import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MoreProductDetailsPage } from './more-product-details.page';

const routes: Routes = [
  {
    path: '',
    component: MoreProductDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoreProductDetailsPageRoutingModule {}
