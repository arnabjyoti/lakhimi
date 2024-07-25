import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipApprovelComponent } from './membership-approvel.component';

describe('MembershipApprovelComponent', () => {
  let component: MembershipApprovelComponent;
  let fixture: ComponentFixture<MembershipApprovelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MembershipApprovelComponent]
    });
    fixture = TestBed.createComponent(MembershipApprovelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
