import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseAccountApplyComponent } from './close-account-apply.component';

describe('CloseAccountApplyComponent', () => {
  let component: CloseAccountApplyComponent;
  let fixture: ComponentFixture<CloseAccountApplyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CloseAccountApplyComponent]
    });
    fixture = TestBed.createComponent(CloseAccountApplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
