import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProductLiveAuctionPage } from './product-live-auction.page';

describe('ProductLiveAuctionPage', () => {
  let component: ProductLiveAuctionPage;
  let fixture: ComponentFixture<ProductLiveAuctionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductLiveAuctionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductLiveAuctionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
