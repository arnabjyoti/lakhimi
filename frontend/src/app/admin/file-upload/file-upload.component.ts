import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { FileUploadService } from './file-upload.service';
import { MatSort } from '@angular/material/sort';

export interface brunchData {
  id: string,
}

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css'],
  standalone: true,
  imports: [NgxSpinnerModule, RouterModule, MatTableModule, MatPaginatorModule, MatButtonModule, MatInputModule, FormsModule, MatFormFieldModule, CommonModule],
})
export class FileUploadComponent implements OnInit {
  public displayedColumns: string[] = ['Sl', 'file_name', 'view', 'delete'];
  dataSource !: MatTableDataSource<brunchData>
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;


  public selectedData: any = {
    id: "",
  }
  public file_name: any;

  public uploadImageObject: any = {
    panImg: '',
    adharImg: ''
  }
  public file: string = "Choose File";
  public chooseFile: string = "Choose File";
  public acceptfileType: string = "image";

  public isSaving: boolean = false;
  public endpoint: any;
  public isLodaing = true;
  constructor(
    private spinner: NgxSpinnerService,
    private FileUploadService: FileUploadService,
    private toastr: ToastrService,
  ) {
    this.endpoint = environment.BASE_URL;
  }


  ngOnInit(): void {
    this.getFileUploadData();
  }

  spiner() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 5000);
  }


  getFileUploadData() {
    let requestObject = {};
    this.FileUploadService.getFileUploadData(requestObject, (callback: any) => {
      this.isLodaing = false;
      console.log("bbbbbbbbbbbbbbbbbbbb", callback);
      this.dataSource = new MatTableDataSource(callback);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log("bbbbbbbbbb", this.dataSource);

    });
  }

  FilterChange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
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

  //for PAN Card
  onFileSelect(event: any) {
    console.log(event.target.files[0].size);
    // if (event.target.files.length > 0 && event.target.files[0].size < 2000000) {
      this.uploadImageObject.file = event.target.files[0];


      const file = event.target.files[0];
      const fileName = file.name;
      const fileExtension = fileName.split('.').pop().toLowerCase();
      var name = "FILE_" + this.convertDate()+ "."+fileExtension;
      console.log("name", name);

      var blob = event.target.files[0].slice(0, event.target.files[0].size, event.target.files[0].type);
      console.log("blob", blob);

      var newFile = new File([blob], name, { type: event.target.files[0].type });
      console.log("newfile", newFile);
      this.uploadImageObject.image = newFile;




      this.file = this.uploadImageObject.file
        ? this.uploadImageObject.file["name"]
        : "Choose File";
      console.log("Choose", this.chooseFile);
      console.log("imgObject===", this.uploadImageObject);
    // } else {
    //   this.toastr.error('Image size should be less than 200kb', 'Error', {
    //     disableTimeOut: false
    //   });
    // }
    return true;
  };


  saveData() {
    console.log("file_name",this.file_name);
    
    this.isSaving = true;
    let isValid = this.validateInputs();
    if(isValid){
      const formData = new FormData();
      formData.append("file_name", this.file_name);
      formData.append("file", this.uploadImageObject.image);
      console.log("FORMDATA===", formData);
    this.FileUploadService.fileUpload(formData, this.acceptfileType, (res: any) => {
      console.log(res);
      
      this.isSaving = false;
      this.resetForm();
      this.getFileUploadData();
      let ele: any = document.getElementById('modalClose');
      ele.click();
    });
    }else{
        this.isSaving = false;
      }
  }

  validateInputs = () => {
    if (this.file_name === '' || this.file_name === null || this.file_name === undefined) {
      this.toastr.warning('Please type file name.', 'Warning', {
        disableTimeOut: false
      });
      return false;
    }
    return true;
  }

  resetForm(){
    this.file = "Choose File";
    this.file_name =  "";
  }


  deleteData(row: any) {
    console.log("Selected Project=", row);
    this.selectedData = row;
    console.log("selectedData",this.selectedData);
    this.FileUploadService.deleteFileUpload(this.selectedData.id, (res: any) => {
      this.getFileUploadData();
    })
    
  }
}
