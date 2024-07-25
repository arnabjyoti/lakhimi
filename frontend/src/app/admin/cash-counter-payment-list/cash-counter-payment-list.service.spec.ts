import { TestBed } from '@angular/core/testing';

import { CashCounterPaymentListService } from './cash-counter-payment-list.service';

describe('CashCounterPaymentListService', () => {
  let service: CashCounterPaymentListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CashCounterPaymentListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
