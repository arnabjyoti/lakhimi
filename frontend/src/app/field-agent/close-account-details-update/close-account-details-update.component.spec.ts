import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseAccountDetailsUpdateComponent } from './close-account-details-update.component';

describe('CloseAccountDetailsUpdateComponent', () => {
  let component: CloseAccountDetailsUpdateComponent;
  let fixture: ComponentFixture<CloseAccountDetailsUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CloseAccountDetailsUpdateComponent]
    });
    fixture = TestBed.createComponent(CloseAccountDetailsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
