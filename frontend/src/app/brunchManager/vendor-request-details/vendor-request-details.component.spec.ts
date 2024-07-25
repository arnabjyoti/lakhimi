import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorRequestDetailsComponent } from './vendor-request-details.component';

describe('VendorRequestDetailsComponent', () => {
  let component: VendorRequestDetailsComponent;
  let fixture: ComponentFixture<VendorRequestDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VendorRequestDetailsComponent]
    });
    fixture = TestBed.createComponent(VendorRequestDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
