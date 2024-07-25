import { TestBed } from '@angular/core/testing';

import { BrunchDetailsService } from './brunch-details.service';

describe('BrunchDetailsService', () => {
  let service: BrunchDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrunchDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
