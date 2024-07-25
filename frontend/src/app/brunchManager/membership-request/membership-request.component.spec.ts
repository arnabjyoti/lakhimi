import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipRequestComponent } from './membership-request.component';

describe('MembershipRequestComponent', () => {
  let component: MembershipRequestComponent;
  let fixture: ComponentFixture<MembershipRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MembershipRequestComponent]
    });
    fixture = TestBed.createComponent(MembershipRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
