/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NetworkCheckService } from './networkCheck.service';

describe('Service: NetworkCheck', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NetworkCheckService]
    });
  });

  it('should ...', inject([NetworkCheckService], (service: NetworkCheckService) => {
    expect(service).toBeTruthy();
  }));
});
