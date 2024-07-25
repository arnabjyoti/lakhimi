import { TestBed } from '@angular/core/testing';

import { CloseAccountDetailsUpdateService } from './close-account-details-update.service';

describe('CloseAccountDetailsUpdateService', () => {
  let service: CloseAccountDetailsUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CloseAccountDetailsUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
