import { TestBed } from '@angular/core/testing';

import { LoanRequestDetailsService } from './loan-request-details.service';

describe('LoanRequestDetailsService', () => {
  let service: LoanRequestDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoanRequestDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
