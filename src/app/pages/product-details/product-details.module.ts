import { BidHistoryPage } from './pages/bid-history/bid-history.page';
import { ProductBidHistoryPageModule } from './pages/product-bid-history/product-bid-history.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductDetailsPageRoutingModule } from './product-details-routing.module';

import { ProductDetailsPage } from './product-details.page';
import { CommonShareModule } from 'src/app/common/module/common/common-share.module';
import { MaterialModule } from 'src/app/common/material/material.module';
import { CountdownModule } from 'ngx-countdown';
import { MoreProductDetailsPageModule } from './pages/more-product-details/more-product-details.module';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { ProductQuantityPage } from './pages/product-quantity/product-quantity.page';
import { ProductDescriptionPage } from './pages/product-description/product-description.page';
import { ProductMoreInfoPage } from './pages/product-more-info/product-more-info.page';
import { ProductVariantPage } from './pages/product-variant/product-variant.page';
import { ProductLiveAuctionPage } from './pages/product-live-auction/product-live-auction.page';
import { ProductBidTimerPage } from './pages/product-bid-timer/product-bid-timer.page';
import { ProductAuctionInfoPage } from './pages/product-auction-info/product-auction-info.page';
import { ProductWinnerPage } from './pages/product-winner/product-winner.page';
import { ProductSliderPage } from './pages/product-slider/product-slider.page';
import { CheckoutPageModule } from '../checkout/checkout.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductDetailsPageRoutingModule,
    CommonShareModule,
    MaterialModule,
    CountdownModule,
    MoreProductDetailsPageModule,
    ProductBidHistoryPageModule,
    LazyLoadImageModule,
    CheckoutPageModule
  ],
  declarations: [
    ProductSliderPage,
    ProductDetailsPage,
    BidHistoryPage,
    ProductQuantityPage,
    ProductDescriptionPage,
    ProductMoreInfoPage,
    ProductVariantPage,
    ProductLiveAuctionPage,
    ProductBidTimerPage,
    ProductAuctionInfoPage,
    ProductWinnerPage
  ],
})
export class ProductDetailsPageModule { }
