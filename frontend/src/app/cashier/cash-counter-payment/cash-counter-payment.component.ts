import { CommonModule, DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { CashCounterPaymentService } from './cash-counter-payment.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { brunchData } from 'src/app/admin/brunch/brunch.component';
import { CameraCaptureComponent } from 'src/app/camera-capture/camera-capture.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import jsPDF from 'jspdf';
import { NgxPrintModule } from 'ngx-print';

@Component({
  selector: 'app-cash-counter-payment',
  templateUrl: './cash-counter-payment.component.html',
  styleUrls: ['./cash-counter-payment.component.css'],
  standalone: true,
  imports: [NgxPrintModule, CameraCaptureComponent, NgxSpinnerModule, MatStepperModule, ReactiveFormsModule, RouterModule, MatTableModule, MatPaginatorModule, MatButtonModule, MatInputModule, MatSortModule, FormsModule, MatFormFieldModule, CommonModule, MatStepperModule, MatDatepickerModule, MatNativeDateModule],
})
export class CashCounterPaymentComponent implements OnInit{
  public displayedColumns: string[] = ['Sl', 'Co_op_ac_no', 'voucer_no', 'Amount', 'entry_date', 'action'];
  dataSource !: MatTableDataSource<brunchData>
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  //for camera
  @ViewChild('video') videoElement!: ElementRef;
  @ViewChild('canvas') canvasElement!: ElementRef;
  // imageSrc: string | undefined;
  imageSrc: any;
  videoStream: MediaStream | undefined;

  startDate: Date | null = null;
  endDate: Date | null = null;

  items: any[] = [];
  src: any;

  public corsProxy: any;

  videoWidth = 0;
  videoHeight = 0;

  public file:any;

  public inputForm: any = {
    Co_op_ac_no: "",
    voucer_no: "",
    amount: "",
    userId: "",
    brunchId: "",
    branch_name: "",
    entry_date: "",
  }

  public image: string = "Choose File";

  public uploadImageObjectImage: any = {
    image: '',
  }

  public cameraOpen = false;

  public isLodaing = true;
  public endpoint: any;
  public user: any;
  public userId: any;
  public brunchId: any;
  public brunchDetails: any;
  public returnMsg: any;
  public myDate: any = new Date();


  public selectedAccount:any = {
    userId: "",
    photo: "",
  }
  public showImage = false;

  constructor(
    private spinner: NgxSpinnerService,
    private CashCounterPaymentService: CashCounterPaymentService,
    private toastr: ToastrService,
    private _formBuilder: FormBuilder,
    private datePipe: DatePipe,
  ) {
    this.endpoint = environment.BASE_URL;
    this.init();
    this.myDate = this.datePipe.transform(this.myDate, "YYYY-MM-dd");
  }
  init = () => {
    let token = JSON.parse(JSON.stringify(localStorage.getItem('token')));
    token = JSON.parse(token);

    this.user = token['usr'];
    this.userId = this.user.id;

    this.inputForm.userId = this.userId;

    this.brunchDetails = token['brunch'];
    this.brunchId = this.brunchDetails.br_id;
    

    this.inputForm.brunchId = this.brunchId;
    console.log("bbbbbbbbbbbbbbbbbb",this.inputForm.brunchId);
    this.inputForm.branch_name = this.brunchDetails.br_name;

    console.log("zzzzzzzzzzzzzzzzzzzz", this.brunchId);

    console.log("Token=", token);
    if (!token.usr.accessKeyword) {
      console.log("gggggggggggggggggggggg");

      return;
    }
  }


  ngOnInit(): void {
    this.loanApplyList();
  }



  spiner() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 5000);
  }

  convertDate() {
    var date = new Date();
    const year = date.getFullYear();
    const month = this.padZero(date.getMonth() + 1); // Month starts from 0
    const day = this.padZero(date.getDate());
    const hours = this.padZero(date.getHours());
    const minutes = this.padZero(date.getMinutes());
    const seconds = this.padZero(date.getSeconds());
    return `${year}${month}${day}${hours}${minutes}${seconds}`;
  }

  padZero(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }


  loanApplyList() {
    this.CashCounterPaymentService.getCashCounterList(this.userId, (callback: any) => {
      console.log("getLoanApplyList", callback);

      this.dataSource = new MatTableDataSource(callback);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log("bbbbbbbbbb", this.dataSource);
    })
  }

  FilterChange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }


  applyFilter() {
    let isValid = this.validateFilter();
    if (isValid) {
    if (this.startDate && this.endDate) {
      let ele:any = document.getElementById('loanAccountOpeningPdf');
            ele.click();
      // Your filter logic here
      // For example, filtering an array of data based on the date range
      console.log('Filtering from', this.startDate, 'to', this.endDate);


      let requestObject = {
        userId: this.userId,
        startDate: this.startDate,
        endDate: this.endDate,
      };
      this.CashCounterPaymentService.filterDataByCashier(requestObject, (callback: any) => {
        console.log("filter data", callback);


          this.items = callback;
          // this.downloadPdf();
      })
    }
  } 
  }
  

  validateFilter(){
    if (this.startDate === null || this.startDate === undefined) {
      this.toastr.warning('Please enter start date', 'Warning', {
        disableTimeOut: false
      });
      return false;
    }
    if (this.endDate === null || this.endDate === undefined) {
      this.toastr.warning('Please enter end date', 'Warning', {
        disableTimeOut: false
      });
      return false;
    }
    return true;
  }

  // downloadPdf() {
  //   console.log("downloadPdf");
  //   this.generatePdf(this.items, 'Filtered_Items.pdf');
    
  // }


  // private getBase64ImageFromURL(url: string): Promise<string> {
  //   return new Promise((resolve, reject) => {
  //     const img = new Image();
  //     img.crossOrigin = 'Anonymous';
  //     img.src = this.corsProxy + url;
  //     console.log("aaaaaaaaaaaaaa",url);
      
  //     img.onload = () => {
  //       console.log(`Image loaded successfully from URL: ${url}`);
  //       const canvas = document.createElement('canvas');
  //       const ctx = canvas.getContext('2d')!;
  //       canvas.height = img.height;
  //       canvas.width = img.width;
  //       ctx.drawImage(img, 0, 0);
  //       const dataURL = canvas.toDataURL('image/png');
  //       resolve(dataURL);
  //     };
  
  //     img.onerror = (error) => {
  //       console.error(`Direct load failed from URL: ${url}`, error);
  //       img.src = this.corsProxy + url;
  
  //       img.onload = () => {
  //         console.log(`Image loaded successfully via proxy from URL: ${url}`);
  //         const canvas = document.createElement('canvas');
  //         const ctx = canvas.getContext('2d')!;
  //         canvas.height = img.height;
  //         canvas.width = img.width;
  //         ctx.drawImage(img, 0, 0);
  //         const dataURL = canvas.toDataURL('image/png');
  //         resolve(dataURL);
  //       };
  
  //       img.onerror = (proxyError) => {
  //         console.error(`Proxy load failed from URL: ${url}`, proxyError);
  //         reject(`Failed to load image from URL: ${url}`);
  //       };
  //     };
  //   });
  // }

  // public async generatePdf(items: any[], fileName: string): Promise<void> {
  //   const pdf = new jsPDF();
  //   pdf.setFontSize(16);
  //   pdf.text('Filtered Items', 10, 10);
  //   let yPosition = 20;

  //   for (let i = 0; i < items.length; i++) {
  //     const item = items[i];
  //     this.src = this.endpoint+"/docs/CashCounter/"+item.userId+'_/'+item.photo;
  //     console.log("srccccccccccc",this.src);
  //     pdf.rect(10, yPosition - 10, 190, 120);

  //     pdf.setFontSize(12);
  //     pdf.text(`Sl. No: ${i + 1}`, 15, yPosition);
  //     pdf.text(`Name: ${item.entry_date}`, 15, yPosition + 10);

  //     if (item.photo) {
  //       try {
  //         const corsProxy = this.endpoint;
  //         const proxiedUrl = `${corsProxy}${item.photo}`;
  //         const base64Image = await this.getBase64ImageFromURL(this.src);
  //         pdf.addImage(base64Image, 'PNG', 15, yPosition + 20, 100, 100);
  //       } catch (error) {
  //         console.error(error);
  //         pdf.text(`Failed to load image`, 15, yPosition + 20);
  //       }
  //     }

  //     yPosition += 130;
  //   }

  //   pdf.save(fileName);
  // }


  // image.src = this.endpoint+"/docs/CashCounter/"+item.userId+'_'+"/"+item.photo;

  showImageModal(row:any){
    this.showImage = true;
    console.log("Selected Project=", row);
    this.selectedAccount = row;
    console.log("selectedAccount",this.selectedAccount);
    
  }

  closeShowImage(){
    this.showImage = false;
  }

  saveData() {
    this.spiner();
    console.log("input data", this.inputForm);
    this.CashCounterPaymentService.createCashCounter(this.inputForm, (res: any) => {
      this.isLodaing = false;
      // let ele:any = document.getElementById('modalClose');
      // ele.click();
    });

  }

//camera
startCamera() {
  this.cameraOpen = true;
  // if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  //   navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } })
  //     .then(stream => {
  //       this.videoElement.nativeElement.srcObject = stream;
  //       this.videoElement.nativeElement.play();
  //     })
  //     .catch(err => {
  //       console.error("Error accessing camera: ", err);
  //     });
  // }

  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } })
      .then(stream => {
        this.videoStream = stream;
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
  
  
  this.createImageFile(this.imageSrc);
  // console.log("this.imageSrc",base64Image);
}

createImageFile(dataUrl: string) {
  const byteString = atob(dataUrl.split(',')[1]);
  const mimeString = dataUrl.split(',')[0].split(':')[1].split(';')[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);

  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  const blob = new Blob([ab], { type: mimeString });
  const fileName = "img_" + this.convertDate() + ".jpeg";
  this.file = new File([blob], fileName, { type: mimeString });

  // Print the file size, dimensions, and extension
  console.log('File Name: ', this.file.name);
  console.log('File Size: ', this.file.size, 'bytes');
  console.log('File Type: ', this.file.type);
  console.log('Image Dimensions: ', this.videoWidth, 'x', this.videoHeight);

  
}



stopCamera() {
  this.cameraOpen = false;
  // if (this.stream) {
  //   this.stream.getTracks().forEach(track => track.stop());
  // }
  // if (this.videoElement.nativeElement.srcObject) {
  //   this.videoElement.nativeElement.srcObject = null;
  // }
  if (this.videoStream) {
    this.videoStream.getTracks().forEach(track => {
      track.stop();
      console.log(`Stopped track: ${track.kind}`);
    });
    this.videoElement.nativeElement.srcObject = null;  // Clear the video element's source
    this.videoStream = undefined;
    console.log("Camera stopped");
  } else {
    console.log("No video stream to stop");
  }
}



  //for income proof
  onFileSelectedImage(event: any) {
    console.log(event.target.files[0].size);
    if (event.target.files.length > 0 && event.target.files[0].size < 2000000) {
      this.uploadImageObjectImage.image = event.target.files[0];
      const parts = event.target.files.split('.');
      var fileExtension = parts.length > 1 ? parts.pop() || '' : '';
      console.log("fileExtension",fileExtension);
      
      // var fileExtension = '.' + event.target.files[0].name.split('.')[1];
      var name = "img_" + this.convertDate() + fileExtension;
      var blob = event.target.files[0].slice(0, event.target.files[0].size, event.target.files[0].type);
      var newFile = new File([blob], name, { type: event.target.files[0].type });
      this.uploadImageObjectImage.image = newFile;
      this.image = this.uploadImageObjectImage.image
        ? this.uploadImageObjectImage.image["name"]
        : "Choose File";
      console.log("imgObject===", this.uploadImageObjectImage);
    } else {
      this.toastr.error('Image size should be less than 2MB', 'Error', {
        disableTimeOut: false
      });
    }
    return true;
  };


  save() {
    console.log("Uploading image", this.file);
    let isValid = this.validateIncm();
    if (isValid) {
      this.isAllowedFile(this.file, (res: any) => {
        console.log("res", res);
        if (res == true) {
          this.isLodaing = true;
          this.spiner();
          console.log("input data", this.file);
          // if (this.selectedMember.id != '') {
          // console.log("update", this.selectedMember.id);

          const formData = new FormData();          

          formData.append("dbid", this.userId);
          formData.append("Co_op_ac_no", this.inputForm.Co_op_ac_no);
          formData.append("voucer_no", this.inputForm.voucer_no);
          formData.append("amount", this.inputForm.amount);
          formData.append("entry_date", this.myDate);
          formData.append("brunchId", this.inputForm.brunchId);
          formData.append("branch_name", this.inputForm.branch_name);
          formData.append("file", this.file);
          console.log("FORMDATA===", formData);
          this.CashCounterPaymentService.saveCashCounter(
            formData, (response: any) => {
              this.isLodaing = false;
              this.returnMsg = response.message;
              console.log("lllllllllll", this.returnMsg);
              let ele:any = document.getElementById('modalClose');
              ele.click();
              this.loanApplyList();
              this.resetForm();
              this.stopCamera();
              
            }
          );

        }
      })
    } else {
      this.toastr.error('Invalid image file', 'Error', {
        disableTimeOut: false
      });
    }
  }

  validateIncm = () => {
    console.log("vvvvvvvv", this.uploadImageObjectImage.image);

    if (this.inputForm.Co_op_ac_no === '' || this.inputForm.Co_op_ac_no === null || this.inputForm.Co_op_ac_no === undefined) {
      this.toastr.warning('Please enter Co-op. Savings A/c No.', 'Warning', {
        disableTimeOut: false
      });
      return false;
    }
    if (this.inputForm.voucer_no === '' || this.inputForm.voucer_no === null || this.inputForm.voucer_no === undefined) {
      this.toastr.warning('Please enter voucer number', 'Warning', {
        disableTimeOut: false
      });
      return false;
    }
    if (this.inputForm.amount === '' || this.inputForm.amount === null || this.inputForm.amount === undefined) {
      this.toastr.warning('Please enter amount', 'Warning', {
        disableTimeOut: false
      });
      return false;
    }
    if (this.imageSrc === '' || this.imageSrc === null || this.imageSrc === undefined) {
      this.toastr.warning('Please capture photo', 'Warning', {
        disableTimeOut: false
      });
      return false;
    }
    return true;
  }


  isAllowedFile = (file: any, callback: any) => {
    console.log("call", file.type);
    switch (file.type) {
      case "image/jpg":
      case "image/png":
      case "image/jpeg":
        return callback(true);
      default:
        return callback(false);
    }
  };

  resetForm(){
    this.inputForm.Co_op_ac_no = "";
    this.inputForm.voucer_no = "";
    this.inputForm.amount = "";
    this.inputForm.userId = "";
    this.inputForm.brunchId = "";
    this.inputForm.branch_name = "";
    this.inputForm.entry_date = "";
    this.image = "Choose File";
    this.imageSrc = "";
  }
}
