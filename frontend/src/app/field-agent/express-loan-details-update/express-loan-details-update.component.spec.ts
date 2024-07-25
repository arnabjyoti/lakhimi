import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpressLoanDetailsUpdateComponent } from './express-loan-details-update.component';

describe('ExpressLoanDetailsUpdateComponent', () => {
  let component: ExpressLoanDetailsUpdateComponent;
  let fixture: ComponentFixture<ExpressLoanDetailsUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExpressLoanDetailsUpdateComponent]
    });
    fixture = TestBed.createComponent(ExpressLoanDetailsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
