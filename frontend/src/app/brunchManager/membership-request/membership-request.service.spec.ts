import { TestBed } from '@angular/core/testing';

import { MembershipRequestService } from './membership-request.service';

describe('MembershipRequestService', () => {
  let service: MembershipRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MembershipRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
