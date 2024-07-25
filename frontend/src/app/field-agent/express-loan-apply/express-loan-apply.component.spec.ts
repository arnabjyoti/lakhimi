import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpressLoanApplyComponent } from './express-loan-apply.component';

describe('ExpressLoanApplyComponent', () => {
  let component: ExpressLoanApplyComponent;
  let fixture: ComponentFixture<ExpressLoanApplyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExpressLoanApplyComponent]
    });
    fixture = TestBed.createComponent(ExpressLoanApplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
