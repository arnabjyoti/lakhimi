import { TestBed } from '@angular/core/testing';

import { CloseAccountApplyService } from './close-account-apply.service';

describe('CloseAccountApplyService', () => {
  let service: CloseAccountApplyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CloseAccountApplyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
