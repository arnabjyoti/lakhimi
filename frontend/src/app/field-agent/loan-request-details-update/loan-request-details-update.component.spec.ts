import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanRequestDetailsUpdateComponent } from './loan-request-details-update.component';

describe('LoanRequestDetailsUpdateComponent', () => {
  let component: LoanRequestDetailsUpdateComponent;
  let fixture: ComponentFixture<LoanRequestDetailsUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoanRequestDetailsUpdateComponent]
    });
    fixture = TestBed.createComponent(LoanRequestDetailsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
