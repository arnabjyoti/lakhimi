import { TestBed } from '@angular/core/testing';

import { ExpressLoanDetailsService } from './express-loan-details.service';

describe('ExpressLoanDetailsService', () => {
  let service: ExpressLoanDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpressLoanDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
