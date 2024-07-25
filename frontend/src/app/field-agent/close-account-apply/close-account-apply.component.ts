import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { brunchData } from '../new-membership/new-membership.component';
import { CloseAccountApplyService } from './close-account-apply.service';

@Component({
  selector: 'app-close-account-apply',
  templateUrl: './close-account-apply.component.html',
  styleUrls: ['./close-account-apply.component.css'],
  standalone: true,
  imports: [NgxSpinnerModule, MatStepperModule, ReactiveFormsModule, RouterModule, MatTableModule, MatPaginatorModule, MatButtonModule, MatInputModule, MatSortModule, FormsModule, MatFormFieldModule, CommonModule],
})
export class CloseAccountApplyComponent implements OnInit {

  public displayedColumns: string[] = ['Sl', 'claiming_ac_holder_name', 'closing_type', 'reference_no', 'fwd_status', 'closing_status', 'apply_date', 'action'];
  dataSource !: MatTableDataSource<brunchData>
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  public inputForm: any = {
    closing_type: "",
    claim_for: "",
    type_of_ac: "",
    specify: "",
    new_ac_no: "",
    open_date: "",
    end_date: "",
    claiming_ac_holder_name: "",
    claiming_ac_no: "",
    claiming_c_id: "",
    claiming_opening_date: "",
    claiming_closing_date: "",
    claiming_agent_name: "",
    claiming_code: "",
    claiming_branch_name: "",
    nominee_name: "",
    address: "",
    cause: "",
    bank_name: "",
    br_name: "",
    name_ac: "",
    ac_no: "",
    ifsc: "",
    apply_date: "",
  }

  public myDate: any = new Date();

  public cloneInputForm: any;

  public inputFormBtn: boolean = true;

  public uploadForm: boolean = false;
  public successLakhimi: boolean = false;
  public Lakhimi_pass: string = "Choose File";
  public cloneLakhimi_pass: any;

  public uploadImageObjectLakhimi: any = {
    Lakhimi_pass: '',
  }


  public passbook_bank: boolean = false;
  public successBank: boolean = false;
  public bankPass: string = "Choose File";

  public uploadImageObjectBank: any = {
    bankPass: '',
  }

  public dbId: any;



  public isLodaing = true;

  public endpoint: any;
  public user: any;
  public userId: any;
  public brunchId: any;
  public brunchDetails: any;
  public returnMsg: any;

  public isSaving: boolean = false;

  constructor(
    private spinner: NgxSpinnerService,
    private CloseAccountApplyService: CloseAccountApplyService,
    private toastr: ToastrService,
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
    this.inputForm.branch_name = this.brunchDetails.br_name;

    console.log("zzzzzzzzzzzzzzzzzzzz", this.brunchId);

    console.log("Token=", token);
    if (!token.usr.accessKeyword) {
      console.log("gggggggggggggggggggggg");

      return;
    }
  }


  ngOnInit(): void {
    this.CloseAcApplyList();



    // this.cloneInputForm = _.cloneDeep(this.inputForm);
    // this.cloneLakhimi_pass = _.cloneDeep(this.Lakhimi_pass);
  }


  spiner() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 5000);
  }



  CloseAcApplyList() {
    this.CloseAccountApplyService.getCloseAcEOList(this.userId, (callback: any) => {
      console.log("getCloseAcApplyList", callback);

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


  saveData() {
    this.isSaving = true;
    this.inputForm.apply_date = this.myDate;
    this.inputForm.reference_no = this.convertDate();
    console.log("input data", this.inputForm);
    let isValid = this.validateInputs();
    if (isValid) {
      this.CloseAccountApplyService.createEOcloseAc(this.inputForm, (res: any) => {
        console.log("res", res);
        // this.spiner();
        if (res) {
          this.isLodaing = false;
          this.dbId = res.message;
          console.log("dbIddbIddbIddbId", this.dbId);
          // this.inputForm = false;
          this.inputFormBtn = false;
          this.uploadForm = true;
          this.successLakhimi = false;
        }

      });
    } else {
      this.isSaving = false;
    }

  }


  onFileSelectedLakhimi(event: any) {
    console.log(event.target.files[0].size);
    if (event.target.files.length > 0 && event.target.files[0].size < 200000) {
      this.uploadImageObjectLakhimi.Lakhimi_pass = event.target.files[0];
      var fileExtension = '.' + event.target.files[0].name.split('.')[1];
      var name = "lakhimi_" + this.convertDate() + fileExtension;
      var blob = event.target.files[0].slice(0, event.target.files[0].size, event.target.files[0].type);
      var newFile = new File([blob], name, { type: event.target.files[0].type });
      this.uploadImageObjectLakhimi.image = newFile;
      this.Lakhimi_pass = this.uploadImageObjectLakhimi.Lakhimi_pass
        ? this.uploadImageObjectLakhimi.Lakhimi_pass["name"]
        : "Choose File";
      console.log("imgObject===", this.uploadImageObjectLakhimi);
    } else {
      this.toastr.error('Image size should be less than 200kb', 'Error', {
        disableTimeOut: false
      });
    }
    return true;
  };

  uploadLakhimiPass() {
    console.log("Uploading Income proof", this.uploadImageObjectLakhimi);
    let isValid = this.validateLakhimiPass();
    if (isValid) {
      this.isAllowedFile(this.uploadImageObjectLakhimi.image, (res: any) => {
        console.log("res", res);
        if (res == true) {
          this.isLodaing = true;
          this.spiner();
          console.log("input data", this.uploadImageObjectLakhimi);
          const formData = new FormData();
          formData.append("dbid", this.dbId);
          // formData.append("userId", this.inputForm.id);
          formData.append("file", this.uploadImageObjectLakhimi.image);
          console.log("FORMDATA===", formData);
          console.log("dbid===", this.dbId);
          this.CloseAccountApplyService.uploadLakhimiPass(
            formData, (response: any) => {
              this.isLodaing = false;
              this.successLakhimi = true;
              this.passbook_bank = true;
              this.returnMsg = response.message;
              console.log("lllllllllll", this.returnMsg);
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

  validateLakhimiPass = () => {
    console.log("vvvvvvvv", this.uploadImageObjectLakhimi.image);

    if (this.uploadImageObjectLakhimi.image === '' || this.uploadImageObjectLakhimi.image === null || this.uploadImageObjectLakhimi.image === undefined) {
      this.toastr.warning('Please select the file', 'Warning', {
        disableTimeOut: false
      });
      return false;
    }
    return true;
  }


  onFileSelectedBank(event: any) {
    console.log(event.target.files[0].size);
    if (event.target.files.length > 0 && event.target.files[0].size < 200000) {
      this.uploadImageObjectBank.bankPass = event.target.files[0];
      var fileExtension = '.' + event.target.files[0].name.split('.')[1];
      var name = "bank_" + this.convertDate() + fileExtension;
      var blob = event.target.files[0].slice(0, event.target.files[0].size, event.target.files[0].type);
      var newFile = new File([blob], name, { type: event.target.files[0].type });
      this.uploadImageObjectBank.image = newFile;
      this.bankPass = this.uploadImageObjectBank.bankPass
        ? this.uploadImageObjectBank.bankPass["name"]
        : "Choose File";
      console.log("imgObject===", this.uploadImageObjectBank);
    } else {
      this.toastr.error('Image size should be less than 200kb', 'Error', {
        disableTimeOut: false
      });
    }
    return true;
  };

  uploadBankPass() {
    console.log("Uploading Income proof", this.uploadImageObjectBank);
    let isValid = this.validateBankPass();
    if (isValid) {
      this.isAllowedFile(this.uploadImageObjectBank.image, (res: any) => {
        console.log("res", res);
        if (res == true) {
          this.isLodaing = true;
          this.spiner();
          console.log("input data", this.uploadImageObjectBank);
          const formData = new FormData();
          formData.append("dbid", this.dbId);
          formData.append("closing_status", "Applied");
          formData.append("file", this.uploadImageObjectBank.image);
          console.log("FORMDATA===", formData);
          console.log("dbid===", this.dbId);
          this.CloseAccountApplyService.uploadBankPass(
            formData, (response: any) => {
              let ele: any = document.getElementById('modalClose');
              ele.click();
              this.isLodaing = false;
              this.inputFormBtn = true;
              this.uploadForm = false;
              this.passbook_bank = false;
              this.successBank = true;
              this.returnMsg = response.message;
              console.log("lllllllllll", this.returnMsg);
              this.resetForm();
              this.CloseAcApplyList();
              // this.inputForm = _.cloneDeep(this.cloneInputForm);
              // this.Lakhimi_pass = _.cloneDeep(this.cloneLakhimi_pass);
              // console.log("cccccccccccccccc", this.Lakhimi_pass);
              
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


  validateBankPass = () => {
    console.log("vvvvvvvv", this.uploadImageObjectBank.image);

    if (this.uploadImageObjectBank.image === '' || this.uploadImageObjectBank.image === null || this.uploadImageObjectBank.image === undefined) {
      this.toastr.warning('Please select the file', 'Warning', {
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


  validateInputs = () => {
    console.log("Saving project before validate", this.inputForm);
    if (this.inputForm.closing_type === '' || this.inputForm.closing_type === null || this.inputForm.closing_type === undefined) {
      this.toastr.warning('Please select closing type.', 'Warning', {
        disableTimeOut: false
      });
      return false;
    }
    if (this.inputForm.claim_for === '' || this.inputForm.claim_for === null || this.inputForm.claim_for === undefined) {
      this.toastr.warning('Please select claim for.', 'Warning', {
        disableTimeOut: false
      });
      return false;
    }
    if (this.inputForm.type_of_ac === '' || this.inputForm.type_of_ac === null || this.inputForm.type_of_ac === undefined) {
      this.toastr.warning('Please select type of account', 'Warning', {
        disableTimeOut: false
      });
      return false;
    }
    if (this.inputForm.type_of_ac == "Others") {
      if (this.inputForm.specify === '' || this.inputForm.specify === null || this.inputForm.specify === undefined) {
        this.toastr.warning('Please specify type of account', 'Warning', {
          disableTimeOut: false
        });
        return false;
      }
    }
    if (this.inputForm.new_ac_no === '' || this.inputForm.new_ac_no === null || this.inputForm.new_ac_no === undefined) {
      this.toastr.warning('Please type new account no.', 'Warning', {
        disableTimeOut: false
      });
      return false;
    }
    if (this.inputForm.open_date === '' || this.inputForm.open_date === null || this.inputForm.open_date === undefined) {
      this.toastr.warning('Please type open date', 'Warning', {
        disableTimeOut: false
      });
      return false;
    }
    if (this.inputForm.end_date === '' || this.inputForm.end_date === null || this.inputForm.end_date === undefined) {
      this.toastr.warning('Please type end date.', 'Warning', {
        disableTimeOut: false
      });
      return false;
    }
    // if (this.inputForm.cause === '' || this.inputForm.cause === null || this.inputForm.cause === undefined) {
    //   this.toastr.warning('Please type cause of pre-maturity', 'Warning', {
    //     disableTimeOut: false
    //   });
    //   return false;
    // }
    if (this.inputForm.claiming_ac_holder_name === '' || this.inputForm.claiming_ac_holder_name === null || this.inputForm.claiming_ac_holder_name === undefined) {
      this.toastr.warning('Please type Ac Holder Name', 'Warning', {
        disableTimeOut: false
      });
      return false;
    }
    if (this.inputForm.claiming_ac_no === '' || this.inputForm.claiming_ac_no === null || this.inputForm.claiming_ac_no === undefined) {
      this.toastr.warning('Please type Account No.', 'Warning', {
        disableTimeOut: false
      });
      return false;
    }
    if (this.inputForm.claiming_c_id === '' || this.inputForm.claiming_c_id === null || this.inputForm.claiming_c_id === undefined) {
      this.toastr.warning('Please type C. ID', 'Warning', {
        disableTimeOut: false
      });
      return false;
    }
    if (this.inputForm.claiming_opening_date === '' || this.inputForm.claiming_opening_date === null || this.inputForm.claiming_opening_date === undefined) {
      this.toastr.warning('Please type Opening Date', 'Warning', {
        disableTimeOut: false
      });
      return false;
    }
    if (this.inputForm.claiming_closing_date === '' || this.inputForm.claiming_closing_date === null || this.inputForm.claiming_closing_date === undefined) {
      this.toastr.warning('Please type Closing Date', 'Warning', {
        disableTimeOut: false
      });
      return false;
    }
    if (this.inputForm.claiming_agent_name === '' || this.inputForm.claiming_agent_name === null || this.inputForm.claiming_agent_name === undefined) {
      this.toastr.warning('Please type Agent Name', 'Warning', {
        disableTimeOut: false
      });
      return false;
    }
    if (this.inputForm.claiming_code === '' || this.inputForm.claiming_code === null || this.inputForm.claiming_code === undefined) {
      this.toastr.warning('Please type Code', 'Warning', {
        disableTimeOut: false
      });
      return false;
    }
    if (this.inputForm.claiming_branch_name === '' || this.inputForm.claiming_branch_name === null || this.inputForm.claiming_branch_name === undefined) {
      this.toastr.warning('Please type Branch Name', 'Warning', {
        disableTimeOut: false
      });
      return false;
    }
    if (this.inputForm.nominee_name === '' || this.inputForm.nominee_name === null || this.inputForm.nominee_name === undefined) {
      this.toastr.warning('Please type Nominee Name', 'Warning', {
        disableTimeOut: false
      });
      return false;
    }
    if (this.inputForm.address === '' || this.inputForm.address === null || this.inputForm.address === undefined) {
      this.toastr.warning('Please type address', 'Warning', {
        disableTimeOut: false
      });
      return false;
    }
    if (this.inputForm.bank_name === '' || this.inputForm.bank_name === null || this.inputForm.bank_name === undefined) {
      this.toastr.warning('Please type Bank Name', 'Warning', {
        disableTimeOut: false
      });
      return false;
    }
    if (this.inputForm.br_name === '' || this.inputForm.br_name === null || this.inputForm.br_name === undefined) {
      this.toastr.warning('Please type Branch Name', 'Warning', {
        disableTimeOut: false
      });
      return false;
    }
    if (this.inputForm.name_ac === '' || this.inputForm.name_ac === null || this.inputForm.name_ac === undefined) {
      this.toastr.warning('Please type Name in Account', 'Warning', {
        disableTimeOut: false
      });
      return false;
    }
    if (this.inputForm.ac_no === '' || this.inputForm.ac_no === null || this.inputForm.ac_no === undefined) {
      this.toastr.warning('Please type Account number', 'Warning', {
        disableTimeOut: false
      });
      return false;
    }
    if (this.inputForm.ifsc === '' || this.inputForm.ifsc === null || this.inputForm.ifsc === undefined) {
      this.toastr.warning('Please type IFSC Code No.', 'Warning', {
        disableTimeOut: false
      });
      return false;
    }
    return true;
  }

  resetForm() {
    this.inputForm.closing_type = "";
    this.inputForm.claim_for = "";
    this.inputForm.type_of_ac = "";
    this.inputForm.new_ac_no = "";
    this.inputForm.open_date = "";
    this.inputForm.end_date = "";
    this.inputForm.claiming_ac_holder_name = "";
    this.inputForm.claiming_ac_no = "";
    this.inputForm.claiming_c_id = "";
    this.inputForm.claiming_opening_date = "";
    this.inputForm.claiming_closing_date = "";
    this.inputForm.claiming_agent_name = "";
    this.inputForm.claiming_code = "";
    this.inputForm.claiming_branch_name = "";
    this.inputForm.nominee_name = "";
    this.inputForm.address = "";
    this.inputForm.cause = "";
    this.inputForm.bank_name = "";
    this.inputForm.br_name = "";
    this.inputForm.name_ac = "";
    this.inputForm.ac_no = "";
    this.inputForm.ifsc = "";
    this.inputForm.apply_date = "";
    this.Lakhimi_pass = "Choose File";
    this.bankPass = "Choose File";
    this.uploadImageObjectLakhimi.Lakhimi_pass = "";
    this.uploadImageObjectBank.bankPass = "";
    this.successLakhimi = false;
    this.successBank = false;
  }
}

