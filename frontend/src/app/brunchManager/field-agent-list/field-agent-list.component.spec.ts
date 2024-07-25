import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldAgentListComponent } from './field-agent-list.component';

describe('FieldAgentListComponent', () => {
  let component: FieldAgentListComponent;
  let fixture: ComponentFixture<FieldAgentListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FieldAgentListComponent]
    });
    fixture = TestBed.createComponent(FieldAgentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
