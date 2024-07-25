import { TestBed } from '@angular/core/testing';

import { FieldAgentService } from './field-agent.service';

describe('FieldAgentService', () => {
  let service: FieldAgentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FieldAgentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
