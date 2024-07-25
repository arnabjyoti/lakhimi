import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashCounterPaymentListComponent } from './cash-counter-payment-list.component';

describe('CashCounterPaymentListComponent', () => {
  let component: CashCounterPaymentListComponent;
  let fixture: ComponentFixture<CashCounterPaymentListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CashCounterPaymentListComponent]
    });
    fixture = TestBed.createComponent(CashCounterPaymentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
