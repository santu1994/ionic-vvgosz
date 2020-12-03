import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdminBodyPage } from './admin-body.page';

describe('AdminBodyPage', () => {
  let component: AdminBodyPage;
  let fixture: ComponentFixture<AdminBodyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminBodyPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminBodyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
