import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyAddressAddPage } from './my-address-add.page';

describe('MyAddressAddPage', () => {
  let component: MyAddressAddPage;
  let fixture: ComponentFixture<MyAddressAddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyAddressAddPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyAddressAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
