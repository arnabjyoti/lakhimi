import { TestBed } from '@angular/core/testing';

import { VendorRequestDetailsService } from './vendor-request-details.service';

describe('VendorRequestDetailsService', () => {
  let service: VendorRequestDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VendorRequestDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
