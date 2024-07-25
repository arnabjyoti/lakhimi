import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpressLoanRequestComponent } from './express-loan-request.component';

describe('ExpressLoanRequestComponent', () => {
  let component: ExpressLoanRequestComponent;
  let fixture: ComponentFixture<ExpressLoanRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExpressLoanRequestComponent]
    });
    fixture = TestBed.createComponent(ExpressLoanRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
