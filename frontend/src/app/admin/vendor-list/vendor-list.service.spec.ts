import { TestBed } from '@angular/core/testing';

import { VendorListService } from './vendor-list.service';

describe('VendorListService', () => {
  let service: VendorListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VendorListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
