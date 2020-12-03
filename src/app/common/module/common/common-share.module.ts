import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { HeaderPage } from 'src/app/pages/layout/header/header.page';
import { CommonModule } from '@angular/common';
import { ProductListPage } from 'src/app/pages/product-list/product-list.page';
import { MatChipsModule } from '@angular/material/chips';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { MatButtonModule } from '@angular/material/button';
import { CalPercentageFlatPipe } from '../../pipe/calPercentageFlat.pipe';
import { TruncatePipe } from '../../pipe/truncate.pipe';
import { CountdownModule } from 'ngx-countdown';
@NgModule({
  declarations: [
    HeaderPage,
    ProductListPage,
    CalPercentageFlatPipe,
    TruncatePipe,
  ],
  imports: [
    CommonModule,
    IonicModule.forRoot(),
    MatChipsModule,
    LazyLoadImageModule,
    MatButtonModule,
    CountdownModule
  ],
  exports: [HeaderPage, ProductListPage, CalPercentageFlatPipe, TruncatePipe],
})
export class CommonShareModule { }
