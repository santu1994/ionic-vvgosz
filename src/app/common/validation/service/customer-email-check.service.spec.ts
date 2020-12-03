/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CustomerEmailCheckService } from './customer-email-check.service';

describe('Service: CustomerEmailCheck', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomerEmailCheckService]
    });
  });

  it('should ...', inject([CustomerEmailCheckService], (service: CustomerEmailCheckService) => {
    expect(service).toBeTruthy();
  }));
});
