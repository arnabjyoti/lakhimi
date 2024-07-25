import { TestBed } from '@angular/core/testing';

import { ExpressLoanRequestService } from './express-loan-request.service';

describe('ExpressLoanRequestService', () => {
  let service: ExpressLoanRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpressLoanRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
