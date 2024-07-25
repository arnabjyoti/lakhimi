import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpressLoanDetailsComponent } from './express-loan-details.component';

describe('ExpressLoanDetailsComponent', () => {
  let component: ExpressLoanDetailsComponent;
  let fixture: ComponentFixture<ExpressLoanDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExpressLoanDetailsComponent]
    });
    fixture = TestBed.createComponent(ExpressLoanDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
