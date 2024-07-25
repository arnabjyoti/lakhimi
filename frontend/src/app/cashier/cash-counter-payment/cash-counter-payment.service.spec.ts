import { TestBed } from '@angular/core/testing';

import { CashCounterPaymentService } from './cash-counter-payment.service';

describe('CashCounterPaymentService', () => {
  let service: CashCounterPaymentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CashCounterPaymentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
