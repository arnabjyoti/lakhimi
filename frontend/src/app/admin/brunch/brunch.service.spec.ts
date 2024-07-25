import { TestBed } from '@angular/core/testing';

import { BrunchService } from './brunch.service';

describe('BrunchService', () => {
  let service: BrunchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrunchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
