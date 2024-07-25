import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CameraCaptureComponent } from './camera-capture.component';

describe('CameraCaptureComponent', () => {
  let component: CameraCaptureComponent;
  let fixture: ComponentFixture<CameraCaptureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CameraCaptureComponent]
    });
    fixture = TestBed.createComponent(CameraCaptureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
