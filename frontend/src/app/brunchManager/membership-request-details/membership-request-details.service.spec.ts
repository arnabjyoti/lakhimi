import { TestBed } from '@angular/core/testing';

import { MembershipRequestDetailsService } from './membership-request-details.service';

describe('MembershipRequestDetailsService', () => {
  let service: MembershipRequestDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MembershipRequestDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
