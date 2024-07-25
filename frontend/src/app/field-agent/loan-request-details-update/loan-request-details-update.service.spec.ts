import { TestBed } from '@angular/core/testing';

import { LoanRequestDetailsUpdateService } from './loan-request-details-update.service';

describe('LoanRequestDetailsUpdateService', () => {
  let service: LoanRequestDetailsUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoanRequestDetailsUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
