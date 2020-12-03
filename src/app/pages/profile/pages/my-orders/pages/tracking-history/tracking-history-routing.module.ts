import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrackingHistoryPage } from './tracking-history.page';

const routes: Routes = [
  {
    path: '',
    component: TrackingHistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrackingHistoryPageRoutingModule {}
