import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrunchDetailsComponent } from './brunch-details.component';

describe('BrunchDetailsComponent', () => {
  let component: BrunchDetailsComponent;
  let fixture: ComponentFixture<BrunchDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BrunchDetailsComponent]
    });
    fixture = TestBed.createComponent(BrunchDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
