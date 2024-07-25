import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { LoanRequestService } from './loan-request.service';
import { MatSort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { brunchData } from '../membership-request/membership-request.component';

@Component({
  selector: 'app-loan-request',
  templateUrl: './loan-request.component.html',
  styleUrls: ['./loan-request.component.css'],
  standalone: true,
  imports: [NgxSpinnerModule, MatStepperModule, ReactiveFormsModule, RouterModule, MatTableModule, MatPaginatorModule, MatButtonModule, MatInputModule, FormsModule, MatFormFieldModule, CommonModule],
})
export class LoanRequestComponent implements OnInit {

  public displayedColumns: string[] = ['Sl','name','membershipId','loan_amnt','referenceNo','Office', 'status','apply_date','action', 'go'];
  dataSource !: MatTableDataSource<brunchData>
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;


  public inputData: any = {
    sanction_no: "",
    interest_type: "",
    amount_of_emi: "",
    processing_fee: "",
    number_of_emi: "",
    mss_super_fee: "",
    Lapsed_eposit: "",
    others: "",
    cheque_leaf_1: "",
    cheque_leaf_2: "",
    cheque_leaf_3: "",
    loanStart: "",
    loanEnd: "",

    c_bank_name: "",
    c_br_name: "",
    c_account: "",
    c_name_in_ac: "",
    c_micr: "",
    c_ck_leave: "",
    c_commencement: "",
    c_ck_number: "",
    c_ck_amnt: "",
  }

  public acceptfileType: string = "image";

  public cheque_leaf_1: string = "Choose File";
  public cheque_leaf_2: string = "Choose File";
  public cheque_leaf_3: string = "Choose File";

  public successCkLf1: boolean = false;
  public successCkLf2: boolean = false;
  public successCkLf3: boolean = false;


  public uploadImageObjectCkLf1: any = {
    panImg: '',
    adharImg: ''
  }
  public uploadImageObjectCkLf2: any = {
    panImg: '',
    adharImg: ''
  }
  public uploadImageObjectCkLf3: any = {
    panImg: '',
    adharImg: ''
  }

  public allSet: boolean =false;
  public dbId: any;
  public loanUserId: any;

  public isLodaing = true;

  public endpoint: any;

  public user:any;
  public userId:any;
  public brunchId:any;

  public dbData:any;

  public myDate:any = new Date();


  constructor(
    private spinner: NgxSpinnerService,
    private LoanRequestService: LoanRequestService,
    private toastr: ToastrService,
    private _formBuilder: FormBuilder,
    private datePipe: DatePipe,
  ) {
    this.endpoint = environment.BASE_URL;
    this.init();
    this.myDate = this.datePipe.transform(this.myDate, "YYYY-MM-dd");
  }

  init = () =>{
    let token = JSON.parse(JSON.stringify(localStorage.getItem('token')));
    token = JSON.parse(token);

    this.user = token['usr'];
    this.userId = this.user.id;
    this.brunchId = token['brunch'].br_id;
    console.log("zzzzzzzzzzzzzzzzzzzz", this.brunchId);
    
    console.log("Token=", token);
    if(!token.usr.accessKeyword){
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

  loanApplyList(){
    this.LoanRequestService.getLoanApplyList(this.brunchId, (callback:any)=>{
      console.log("getLoanApplyList", callback);
      this.dbData = callback;
      
      this.dataSource = new MatTableDataSource(callback);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log("bbbbbbbbbb",this.dataSource);
    })
  }


  FilterChange(data:Event){
    const value=(data.target as HTMLInputElement).value;
    this.dataSource.filter=value;
  }


  showUpdateModal(element:any){
    console.log("Selected Project=", element);
    this.dbId = element.id;
    this.loanUserId = element.userId;
    this.inputData = element;
    console.log("loanUserId=", this.loanUserId);
    console.log("dbId=", this.inputData);
    this.checkUpload()
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

  checkUpload(){
    console.log("calllllllllll");
    if (this.inputData.cheque_leaf_1 != null) {
      this.successCkLf1 = true
      console.log("call",this.successCkLf1);
      
    }
    if (this.inputData.cheque_leaf_2 != null) {
      this.successCkLf2 = true
    }
    if (this.inputData.cheque_leaf_3 != null) {
      this.successCkLf3 = true
    }
    if (this.successCkLf1 == true && this.successCkLf2 == true && this.successCkLf3 == true) {
      this.allSet = true;
      console.log("this.allSet",this.allSet);
      
    }
    console.log("call1",this.successCkLf1);
    console.log("call2",this.successCkLf2);
    console.log("call3",this.successCkLf3);
  }

  onFileSelectedCkLf1(event: any){
    console.log(event.target.files[0].size);
    if (event.target.files.length > 0 && event.target.files[0].size < 300000) {
      this.uploadImageObjectCkLf1.cheque_leaf_1 = event.target.files[0];

      var fileExtension = '.' + event.target.files[0].name.split('.')[1];

      var name = "CK_LF_1_" + this.convertDate() + fileExtension;

      var blob = event.target.files[0].slice(0, event.target.files[0].size, event.target.files[0].type);

      var newFile = new File([blob], name, { type: event.target.files[0].type });
      this.uploadImageObjectCkLf1.image = newFile;

      this.cheque_leaf_1 = this.uploadImageObjectCkLf1.cheque_leaf_1
        ? this.uploadImageObjectCkLf1.cheque_leaf_1["name"]
        : "Choose File";
      console.log("imgObject===", this.uploadImageObjectCkLf1);
    } else {
      this.toastr.error('Image size should be less than 300kb', 'Error', {
        disableTimeOut: false
      });
    }
    return true;
  };

  uploadCkLf1(){
    console.log("Uploading Income proof", this.uploadImageObjectCkLf1);
    let isValid = this.validateCkLf1();
    if (isValid) {
      this.isAllowedFile(this.uploadImageObjectCkLf1.image, (res: any) => {
        console.log("res", res);
        if (res == true) {
          this.isLodaing = true;
          this.spiner();
          console.log("input data", this.uploadImageObjectCkLf1);

          const formData = new FormData();



          formData.append("dbid", this.dbId);
          formData.append("userId", this.loanUserId);
          formData.append("file", this.uploadImageObjectCkLf1.image);
          console.log("FORMDATA===", formData);
          console.log("dbid===", this.dbId);
          this.LoanRequestService.uploadCkLfFile1(
            formData, (response: any) => {
              this.isLodaing = false;
              this.successCkLf1 = true;
              this.checkUpload();
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

  validateCkLf1 = () => {
    console.log("vvvvvvvv", this.uploadImageObjectCkLf1.image);

    if (this.uploadImageObjectCkLf1.image === '' || this.uploadImageObjectCkLf1.image === null || this.uploadImageObjectCkLf1.image === undefined) {
      this.toastr.warning('Please select photo', 'Warning', {
        disableTimeOut: false
      });
      return false;
    }
    return true;
  }






  // cheque leaf 2
  onFileSelectedCkLf2(event: any){
    console.log(event.target.files[0].size);
    if (event.target.files.length > 0 && event.target.files[0].size < 300000) {
      this.uploadImageObjectCkLf2.cheque_leaf_2 = event.target.files[0];

      var fileExtension = '.' + event.target.files[0].name.split('.')[1];

      var name = "CK_LF_2_" + this.convertDate() + fileExtension;

      var blob = event.target.files[0].slice(0, event.target.files[0].size, event.target.files[0].type);

      var newFile = new File([blob], name, { type: event.target.files[0].type });
      this.uploadImageObjectCkLf2.image = newFile;

      this.cheque_leaf_2 = this.uploadImageObjectCkLf2.cheque_leaf_2
        ? this.uploadImageObjectCkLf2.cheque_leaf_2["name"]
        : "Choose File";
      console.log("imgObject===", this.uploadImageObjectCkLf2);
    } else {
      this.toastr.error('Image size should be less than 300kb', 'Error', {
        disableTimeOut: false
      });
    }
    return true;
  };

  uploadCkLf2(){
    console.log("Uploading Income proof", this.uploadImageObjectCkLf2);
    let isValid = this.validateCkLf2();
    if (isValid) {
      this.isAllowedFile(this.uploadImageObjectCkLf2.image, (res: any) => {
        console.log("res", res);
        if (res == true) {
          this.isLodaing = true;
          this.spiner();
          console.log("input data", this.uploadImageObjectCkLf2);

          const formData = new FormData();



          formData.append("dbid", this.dbId);
          formData.append("userId", this.loanUserId);
          formData.append("file", this.uploadImageObjectCkLf2.image);
          console.log("FORMDATA===", formData);
          console.log("dbid===", this.dbId);
          this.LoanRequestService.uploadCkLfFile2(
            formData, (response: any) => {
              this.isLodaing = false;
              this.successCkLf2 = true;
              this.checkUpload();
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

  validateCkLf2 = () => {
    console.log("vvvvvvvv", this.uploadImageObjectCkLf2.image);

    if (this.uploadImageObjectCkLf2.image === '' || this.uploadImageObjectCkLf2.image === null || this.uploadImageObjectCkLf2.image === undefined) {
      this.toastr.warning('Please select photo', 'Warning', {
        disableTimeOut: false
      });
      return false;
    }
    return true;
  }


  onFileSelectedCkLf3(event: any){
    console.log(event.target.files[0].size);
    if (event.target.files.length > 0 && event.target.files[0].size < 300000) {
      this.uploadImageObjectCkLf3.cheque_leaf_3 = event.target.files[0];

      var fileExtension = '.' + event.target.files[0].name.split('.')[1];

      var name = "CK_LF_3_" + this.convertDate() + fileExtension;

      var blob = event.target.files[0].slice(0, event.target.files[0].size, event.target.files[0].type);

      var newFile = new File([blob], name, { type: event.target.files[0].type });
      this.uploadImageObjectCkLf3.image = newFile;

      this.cheque_leaf_3 = this.uploadImageObjectCkLf3.cheque_leaf_3
        ? this.uploadImageObjectCkLf3.cheque_leaf_3["name"]
        : "Choose File";
      console.log("imgObject===", this.uploadImageObjectCkLf3);
    } else {
      this.toastr.error('Image size should be less than 300kb', 'Error', {
        disableTimeOut: false
      });
    }
    return true;
  };

  uploadCkLf3(){
    console.log("Uploading Income proof", this.uploadImageObjectCkLf3);
    let isValid = this.validateCkLf3();
    if (isValid) {
      this.isAllowedFile(this.uploadImageObjectCkLf3.image, (res: any) => {
        console.log("res", res);
        if (res == true) {
          this.isLodaing = true;
          this.spiner();
          console.log("input data", this.uploadImageObjectCkLf3);

          const formData = new FormData();



          formData.append("dbid", this.dbId);
          formData.append("userId", this.loanUserId);
          formData.append("file", this.uploadImageObjectCkLf3.image);
          console.log("FORMDATA===", formData);
          console.log("dbid===", this.dbId);
          this.LoanRequestService.uploadCkLfFile3(
            formData, (response: any) => {
              this.isLodaing = false;
              this.successCkLf3 = true;
              this.checkUpload();
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

  validateCkLf3 = () => {
    console.log("vvvvvvvv", this.uploadImageObjectCkLf3.image);

    if (this.uploadImageObjectCkLf3.image === '' || this.uploadImageObjectCkLf3.image === null || this.uploadImageObjectCkLf3.image === undefined) {
      this.toastr.warning('Please select photo', 'Warning', {
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




  save(){
    console.log("input data", this.inputData);
    this.checkUpload();
    let isValid = this.validateInputs();
    if (isValid) {
      if (this.allSet == true) {
        this.isLodaing = true;
          this.spiner();
        this.LoanRequestService.updateLoanOthersData(this.inputData, (res: any) => {
          this.isLodaing = false;
          let ele:any = document.getElementById('modalClose');
          ele.click();
          this.loanApplyList();
      });
      }else{
        this.toastr.warning('Please upload Cheque Leafe', 'Warning', {
          disableTimeOut: false
        });
      }
      
    }
  }

  validateInputs = () => {
    console.log("Saving project before validate", this.inputData);
    if (
      this.inputData.c_bank_name === '' ||
      this.inputData.c_bank_name === null ||
      this.inputData.c_bank_name === undefined
    ) {
      this.toastr.warning(
        'Please add Name of the drawee bank',
        'Warning',
        {
          disableTimeOut: false,
        }
      );
      return false;
    }
    if (
      this.inputData.c_br_name === '' ||
      this.inputData.c_br_name === null ||
      this.inputData.c_br_name === undefined
    ) {
      this.toastr.warning(
        'Please add Name of the drawee branch',
        'Warning',
        {
          disableTimeOut: false,
        }
      );
      return false;
    }
    if (
      this.inputData.c_account === '' ||
      this.inputData.c_account === null ||
      this.inputData.c_account === undefined
    ) {
      this.toastr.warning(
        'Please add SB A/c OR Current A/c',
        'Warning',
        {
          disableTimeOut: false,
        }
      );
      return false;
    }
    if (
      this.inputData.c_name_in_ac === '' ||
      this.inputData.c_name_in_ac === null ||
      this.inputData.c_name_in_ac === undefined
    ) {
      this.toastr.warning(
        'Please add Name in A/c',
        'Warning',
        {
          disableTimeOut: false,
        }
      );
      return false;
    }
    if (
      this.inputData.c_micr === '' ||
      this.inputData.c_micr === null ||
      this.inputData.c_micr === undefined
    ) {
      this.toastr.warning(
        'Please add MICR Sort Code (9 digits)',
        'Warning',
        {
          disableTimeOut: false,
        }
      );
      return false;
    }
    if (
      this.inputData.c_ck_leave === '' ||
      this.inputData.c_ck_leave === null ||
      this.inputData.c_ck_leave === undefined
    ) {
      this.toastr.warning(
        'Please add Number of Cheque Leavs',
        'Warning',
        {
          disableTimeOut: false,
        }
      );
      return false;
    }
    if (
      this.inputData.c_commencement === '' ||
      this.inputData.c_commencement === null ||
      this.inputData.c_commencement === undefined
    ) {
      this.toastr.warning(
        'Please add Date of Commencement',
        'Warning',
        {
          disableTimeOut: false,
        }
      );
      return false;
    }
    if (
      this.inputData.c_ck_number === '' ||
      this.inputData.c_ck_number === null ||
      this.inputData.c_ck_number === undefined
    ) {
      this.toastr.warning(
        'Please add Cheques Numbers',
        'Warning',
        {
          disableTimeOut: false,
        }
      );
      return false;
    }
    if (
      this.inputData.c_ck_amnt === '' ||
      this.inputData.c_ck_amnt === null ||
      this.inputData.c_ck_amnt === undefined
    ) {
      this.toastr.warning(
        'Please add Amount of Cheques',
        'Warning',
        {
          disableTimeOut: false,
        }
      );
      return false;
    }
    if (this.inputData.sanction_no === '' || this.inputData.sanction_no === null || this.inputData.sanction_no === undefined) {
      this.toastr.warning('Please type Sanction Number', 'Warning', {
        disableTimeOut: false
      });
      return false;
    }
    if (this.inputData.interest_type === '' || this.inputData.interest_type === null || this.inputData.interest_type === undefined) {
      this.toastr.warning('Please select Interest Type', 'Warning', {
        disableTimeOut: false
      });
      return false;
    }
    if (this.inputData.loanStart === '' || this.inputData.loanStart === null || this.inputData.loanStart === undefined) {
      this.toastr.warning('Please type loan start date', 'Warning', {
        disableTimeOut: false
      });
      return false;
    }
    if (this.inputData.loanEnd === '' || this.inputData.loanEnd === null || this.inputData.loanEnd === undefined) {
      this.toastr.warning('Please type loan end date', 'Warning', {
        disableTimeOut: false
      });
      return false;
    }
    if (this.inputData.amount_of_emi === '' || this.inputData.amount_of_emi === null || this.inputData.amount_of_emi === undefined) {
      this.toastr.warning('Please type Amount of EMI', 'Warning', {
        disableTimeOut: false
      });
      return false;
    }
    if (this.inputData.number_of_emi === '' || this.inputData.number_of_emi === null || this.inputData.number_of_emi === undefined) {
      this.toastr.warning('Please type Number of EMI', 'Warning', {
        disableTimeOut: false
      });
      return false;
    }
    if (this.inputData.processing_fee === '' || this.inputData.processing_fee === null || this.inputData.processing_fee === undefined) {
      this.toastr.warning('Please type Processing Fee', 'Warning', {
        disableTimeOut: false
      });
      return false;
    }
    if (this.inputData.mss_super_fee === '' || this.inputData.mss_super_fee === null || this.inputData.mss_super_fee === undefined) {
      this.toastr.warning('Please type MSS Super Fee', 'Warning', {
        disableTimeOut: false
      });
      return false;
    }
    if (this.inputData.Lapsed_eposit === '' || this.inputData.Lapsed_eposit === null || this.inputData.Lapsed_eposit === undefined) {
      this.toastr.warning('Please type Lapsed Deposit', 'Warning', {
        disableTimeOut: false
      });
      return false;
    }
    // if (this.inputData.cheque_leaf_1 === '' || this.inputData.cheque_leaf_1 === null || this.inputData.cheque_leaf_1 === undefined) {
    //   this.toastr.warning('Please upload Cheque Leafe 1', 'Warning', {
    //     disableTimeOut: false
    //   });
    //   return false;
    // }
    // if (this.inputData.cheque_leaf_2 === '' || this.inputData.cheque_leaf_2 === null || this.inputData.cheque_leaf_2 === undefined) {
    //   this.toastr.warning('Please upload Cheque Leafe 2', 'Warning', {
    //     disableTimeOut: false
    //   });
    //   return false;
    // }
    // if (this.inputData.cheque_leaf_3 === '' || this.inputData.cheque_leaf_3 === null || this.inputData.cheque_leaf_3 === undefined) {
    //   this.toastr.warning('Please upload Cheque Leafe 3', 'Warning', {
    //     disableTimeOut: false
    //   });
    //   return false;
    // }
    // if (this.inputData.others === '' || this.inputData.others === null || this.inputData.others === undefined) {
    //   this.toastr.warning('Please type Others', 'Warning', {
    //     disableTimeOut: false
    //   });
    //   return false;
    // }
    return true;
  }
}
