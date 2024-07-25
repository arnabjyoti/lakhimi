import { TestBed } from '@angular/core/testing';

import { AccountRequestDetailsService } from './account-request-details.service';

describe('AccountRequestDetailsService', () => {
  let service: AccountRequestDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountRequestDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
