import { TestBed } from '@angular/core/testing';

import { ExpressLoanApplyService } from './express-loan-apply.service';

describe('ExpressLoanApplyService', () => {
  let service: ExpressLoanApplyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpressLoanApplyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
