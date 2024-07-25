import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-camera-capture',
  templateUrl: './camera-capture.component.html',
  styleUrls: ['./camera-capture.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class CameraCaptureComponent implements AfterViewInit {
  @ViewChild('video') videoElement!: ElementRef;
  @ViewChild('canvas') canvasElement!: ElementRef;
  imageSrc: string | undefined;

  videoWidth = 0;
  videoHeight = 0;

  @Output() added = new EventEmitter<any>();
  ngAfterViewInit(): void {
    // this.startCamera();
  }

  startCamera() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } })
        .then(stream => {
          this.videoElement.nativeElement.srcObject = stream;
          this.videoElement.nativeElement.play();
        })
        .catch(err => {
          console.error("Error accessing camera: ", err);
        });
    }
  }

  capture() {
    this.videoWidth = this.videoElement.nativeElement.videoWidth;
    this.videoHeight = this.videoElement.nativeElement.videoHeight;

    const context = this.canvasElement.nativeElement.getContext('2d');
    this.canvasElement.nativeElement.width = this.videoWidth;
    this.canvasElement.nativeElement.height = this.videoHeight;
    context.drawImage(this.videoElement.nativeElement, 0, 0, this.videoWidth, this.videoHeight);
    this.imageSrc = this.canvasElement.nativeElement.toDataURL('image/png');
  }
}
