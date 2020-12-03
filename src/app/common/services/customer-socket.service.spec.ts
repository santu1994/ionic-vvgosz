/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CustomerSocketService } from './customer-socket.service';

describe('Service: CustomerSocket', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomerSocketService]
    });
  });

  it('should ...', inject([CustomerSocketService], (service: CustomerSocketService) => {
    expect(service).toBeTruthy();
  }));
});
