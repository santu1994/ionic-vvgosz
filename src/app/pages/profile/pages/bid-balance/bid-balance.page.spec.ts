import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BidBalancePage } from './bid-balance.page';

describe('BidBalancePage', () => {
  let component: BidBalancePage;
  let fixture: ComponentFixture<BidBalancePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BidBalancePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BidBalancePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
