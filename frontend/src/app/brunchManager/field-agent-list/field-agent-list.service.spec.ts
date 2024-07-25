import { TestBed } from '@angular/core/testing';

import { FieldAgentListService } from './field-agent-list.service';

describe('FieldAgentListService', () => {
  let service: FieldAgentListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FieldAgentListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
