import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseAccountDetailsComponent } from './close-account-details.component';

describe('CloseAccountDetailsComponent', () => {
  let component: CloseAccountDetailsComponent;
  let fixture: ComponentFixture<CloseAccountDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CloseAccountDetailsComponent]
    });
    fixture = TestBed.createComponent(CloseAccountDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
