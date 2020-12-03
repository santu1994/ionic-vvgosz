import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProductSliderPage } from './product-slider.page';

describe('ProductSliderPage', () => {
  let component: ProductSliderPage;
  let fixture: ComponentFixture<ProductSliderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductSliderPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductSliderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
