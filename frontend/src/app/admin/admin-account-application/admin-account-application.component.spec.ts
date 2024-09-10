import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAccountApplicationComponent } from './admin-account-application.component';

describe('AdminAccountApplicationComponent', () => {
  let component: AdminAccountApplicationComponent;
  let fixture: ComponentFixture<AdminAccountApplicationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminAccountApplicationComponent]
    });
    fixture = TestBed.createComponent(AdminAccountApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
