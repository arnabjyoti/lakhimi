import { TestBed } from '@angular/core/testing';

import { ExpressLoanDetailsUpdateService } from './express-loan-details-update.service';

describe('ExpressLoanDetailsUpdateService', () => {
  let service: ExpressLoanDetailsUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpressLoanDetailsUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
