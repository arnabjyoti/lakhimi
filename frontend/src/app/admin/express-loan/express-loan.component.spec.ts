import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpressLoanComponent } from './express-loan.component';

describe('ExpressLoanComponent', () => {
  let component: ExpressLoanComponent;
  let fixture: ComponentFixture<ExpressLoanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExpressLoanComponent]
    });
    fixture = TestBed.createComponent(ExpressLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
