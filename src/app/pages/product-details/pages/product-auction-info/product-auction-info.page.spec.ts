import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProductAuctionInfoPage } from './product-auction-info.page';

describe('ProductAuctionInfoPage', () => {
  let component: ProductAuctionInfoPage;
  let fixture: ComponentFixture<ProductAuctionInfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductAuctionInfoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductAuctionInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
