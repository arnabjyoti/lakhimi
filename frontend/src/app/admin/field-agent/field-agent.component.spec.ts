import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldAgentComponent } from './field-agent.component';

describe('FieldAgentComponent', () => {
  let component: FieldAgentComponent;
  let fixture: ComponentFixture<FieldAgentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FieldAgentComponent]
    });
    fixture = TestBed.createComponent(FieldAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
