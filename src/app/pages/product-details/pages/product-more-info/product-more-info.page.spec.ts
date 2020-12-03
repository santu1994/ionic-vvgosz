import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProductMoreInfoPage } from './product-more-info.page';

describe('ProductMoreInfoPage', () => {
  let component: ProductMoreInfoPage;
  let fixture: ComponentFixture<ProductMoreInfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductMoreInfoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductMoreInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
