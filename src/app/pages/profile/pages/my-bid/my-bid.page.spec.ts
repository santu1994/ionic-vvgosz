import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyBidPage } from './my-bid.page';

describe('MyBidPage', () => {
  let component: MyBidPage;
  let fixture: ComponentFixture<MyBidPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyBidPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyBidPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
