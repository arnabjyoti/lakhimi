import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipRequestDetailsComponent } from './membership-request-details.component';

describe('MembershipRequestDetailsComponent', () => {
  let component: MembershipRequestDetailsComponent;
  let fixture: ComponentFixture<MembershipRequestDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MembershipRequestDetailsComponent]
    });
    fixture = TestBed.createComponent(MembershipRequestDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
