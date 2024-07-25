import { TestBed } from '@angular/core/testing';

import { CashierListService } from './cashier-list.service';

describe('CashierListService', () => {
  let service: CashierListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CashierListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
