/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RealFileLoaderService } from './real-file-loader.service';

describe('Service: RealFileLoader', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RealFileLoaderService]
    });
  });

  it('should ...', inject([RealFileLoaderService], (service: RealFileLoaderService) => {
    expect(service).toBeTruthy();
  }));
});
