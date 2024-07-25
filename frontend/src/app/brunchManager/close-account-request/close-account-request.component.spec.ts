import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseAccountRequestComponent } from './close-account-request.component';

describe('CloseAccountRequestComponent', () => {
  let component: CloseAccountRequestComponent;
  let fixture: ComponentFixture<CloseAccountRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CloseAccountRequestComponent]
    });
    fixture = TestBed.createComponent(CloseAccountRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
