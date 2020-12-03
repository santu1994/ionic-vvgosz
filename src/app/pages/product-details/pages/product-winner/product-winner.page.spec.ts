import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProductWinnerPage } from './product-winner.page';

describe('ProductWinnerPage', () => {
  let component: ProductWinnerPage;
  let fixture: ComponentFixture<ProductWinnerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductWinnerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductWinnerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
