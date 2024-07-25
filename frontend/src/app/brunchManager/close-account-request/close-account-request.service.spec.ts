import { TestBed } from '@angular/core/testing';

import { CloseAccountRequestService } from './close-account-request.service';

describe('CloseAccountRequestService', () => {
  let service: CloseAccountRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CloseAccountRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
