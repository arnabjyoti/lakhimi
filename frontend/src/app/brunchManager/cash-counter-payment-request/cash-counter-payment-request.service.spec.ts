import { TestBed } from '@angular/core/testing';

import { CashCounterPaymentRequestService } from './cash-counter-payment-request.service';

describe('CashCounterPaymentRequestService', () => {
  let service: CashCounterPaymentRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CashCounterPaymentRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
