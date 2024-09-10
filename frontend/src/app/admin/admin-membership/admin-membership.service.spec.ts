import { TestBed } from '@angular/core/testing';

import { AdminMembershipService } from './admin-membership.service';

describe('AdminMembershipService', () => {
  let service: AdminMembershipService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminMembershipService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
