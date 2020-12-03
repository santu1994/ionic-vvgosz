import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AuctionPage } from './auction.page';

describe('AuctionPage', () => {
  let component: AuctionPage;
  let fixture: ComponentFixture<AuctionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuctionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AuctionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
