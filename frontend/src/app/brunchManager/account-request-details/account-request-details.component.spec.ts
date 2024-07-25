import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountRequestDetailsComponent } from './account-request-details.component';

describe('AccountRequestDetailsComponent', () => {
  let component: AccountRequestDetailsComponent;
  let fixture: ComponentFixture<AccountRequestDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccountRequestDetailsComponent]
    });
    fixture = TestBed.createComponent(AccountRequestDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
