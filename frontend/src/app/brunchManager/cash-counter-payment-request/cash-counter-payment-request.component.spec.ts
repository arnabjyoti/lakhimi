import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashCounterPaymentRequestComponent } from './cash-counter-payment-request.component';

describe('CashCounterPaymentRequestComponent', () => {
  let component: CashCounterPaymentRequestComponent;
  let fixture: ComponentFixture<CashCounterPaymentRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CashCounterPaymentRequestComponent]
    });
    fixture = TestBed.createComponent(CashCounterPaymentRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
