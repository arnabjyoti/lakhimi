import { TestBed } from '@angular/core/testing';

import { CloseAccountDetailsService } from './close-account-details.service';

describe('CloseAccountDetailsService', () => {
  let service: CloseAccountDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CloseAccountDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
