import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProductBidTimerPage } from './product-bid-timer.page';

describe('ProductBidTimerPage', () => {
  let component: ProductBidTimerPage;
  let fixture: ComponentFixture<ProductBidTimerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductBidTimerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductBidTimerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
