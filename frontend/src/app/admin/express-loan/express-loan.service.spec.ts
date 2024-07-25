import { TestBed } from '@angular/core/testing';

import { ExpressLoanService } from './express-loan.service';

describe('ExpressLoanService', () => {
  let service: ExpressLoanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpressLoanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
