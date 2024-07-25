import { TestBed } from '@angular/core/testing';

import { MembershipApprovelService } from './membership-approvel.service';

describe('MembershipApprovelService', () => {
  let service: MembershipApprovelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MembershipApprovelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
