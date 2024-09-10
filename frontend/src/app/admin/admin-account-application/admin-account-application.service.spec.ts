import { TestBed } from '@angular/core/testing';

import { AdminAccountApplicationService } from './admin-account-application.service';

describe('AdminAccountApplicationService', () => {
  let service: AdminAccountApplicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminAccountApplicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
