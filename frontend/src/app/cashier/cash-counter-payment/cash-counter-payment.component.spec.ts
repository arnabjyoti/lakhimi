import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashCounterPaymentComponent } from './cash-counter-payment.component';

describe('CashCounterPaymentComponent', () => {
  let component: CashCounterPaymentComponent;
  let fixture: ComponentFixture<CashCounterPaymentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CashCounterPaymentComponent]
    });
    fixture = TestBed.createComponent(CashCounterPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
