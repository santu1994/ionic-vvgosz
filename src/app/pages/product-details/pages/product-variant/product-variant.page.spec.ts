import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProductVariantPage } from './product-variant.page';

describe('ProductVariantPage', () => {
  let component: ProductVariantPage;
  let fixture: ComponentFixture<ProductVariantPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductVariantPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductVariantPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
