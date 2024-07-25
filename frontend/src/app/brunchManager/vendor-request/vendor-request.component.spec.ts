import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorRequestComponent } from './vendor-request.component';

describe('VendorRequestComponent', () => {
  let component: VendorRequestComponent;
  let fixture: ComponentFixture<VendorRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VendorRequestComponent]
    });
    fixture = TestBed.createComponent(VendorRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
