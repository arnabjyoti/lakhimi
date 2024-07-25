import { TestBed } from '@angular/core/testing';

import { CloseAccountService } from './close-account.service';

describe('CloseAccountService', () => {
  let service: CloseAccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CloseAccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
