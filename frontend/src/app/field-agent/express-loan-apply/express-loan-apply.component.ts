import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
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
import { ExpressLoanApplyService } from './express-loan-apply.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { brunchData } from '../new-membership/new-membership.component';

@Component({
  selector: 'app-express-loan-apply',
  templateUrl: './express-loan-apply.component.html',
  styleUrls: ['./express-loan-apply.component.css'],
  standalone: true,
  imports: [NgxSpinnerModule, MatStepperModule, ReactiveFormsModule, RouterModule, MatTableModule, MatPaginatorModule, MatButtonModule, MatInputModule, MatSortModule, FormsModule, MatFormFieldModule, CommonModule],
})
export class ExpressLoanApplyComponent implements OnInit{

  public displayedColumns: string[] = ['Sl', 'full_name', 'membership_id', 'l_product_cost', 'reference_no', 'fwd_status', 'loan_status', 'apply_date', 'action'];
  dataSource !: MatTableDataSource<brunchData>
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;


  public ckInput: any = {
    // Reference_no: "20231117184340",
    Reference_no: "",  
  }

  public reference_number: any;
  
  public inputForm: boolean = true;
  public uploadForm: boolean = false;

  public found: boolean = false;
  public notFound: boolean = false;

  public memberData: any = {
    full_name: "",
    l_emp_type: "",
    l_annual_incm: "",
    l_product_ategory: "",
    l_make: "",
    l_model: "",
    l_serial_no: "",
    l_vendor: "",
    l_product_cost: 0,
    l_down_payment_amount: 0,
    l_processing_fee: "",
    l_tenure: 3,
    l_roi: 1.1575, // 13.5 change to 15.75
    l_EMI_amount: "",

    intro_name: "",
    intro_email: "",
    intro_telephone: "",
    intro_phone: "",
    intro_gender: "",
    intro_age: "",
    intro_address: "",


    share_fee: 110,
    share_admsn_fee: 50,
    ac_admsn_fee: 50,
    insrnc: 0,
    emi_card_fee: '',
    nach: 118,

    l_total_return_amnt: "",
    emi_amnt: "",
    adv_emi: "",
    
    total_processing_fee: 0,
    net_finance_amnt : 0,
    tenure_in_month: 0,
    total_return: 0,
    calculated_emi: 0,
  }

  // public finance_amnt:number = 0;
  public gst:number = 0;
  // public total_processing_fee:number = 0;
  // public net_finance_amnt:number = 0;
  // public tenure_in_month:number = 0;
  public rate:number = 0.02;
  // public total_return:number = 0;
  // public calculated_emi:number = 0;

  public acceptfileType: string = "image";

  public EXP_incm_proof: string = "Choose File";
  public Exp_product_photo: string = "Choose File";

  public uploadImageObjectIncm: any = {
    image: '',
  }

  public uploadImageObjectProduct: any = {
    image: '',
  }

  public successIncm: boolean = false;
  public successProduct: boolean = false;

  public showIncm: boolean = false;
  public showProduct: boolean = false;

  public dbId: any;


  public isLodaing = true;

  public myDate: any = new Date();

  public mId: any;

  public branchData: any;

  public vendorData: any;

  public endpoint: any;
  public user: any;
  public userId: any;
  public brunchId: any;
  public brunchDetails: any;
  public returnMsg: any;
  
  public isSaving: boolean = false;
  
  constructor(
    private spinner: NgxSpinnerService,
    private ExpressLoanApplyService: ExpressLoanApplyService,
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

    this.memberData.userId = this.userId;

    this.brunchDetails = token['brunch'];
    this.brunchId = this.brunchDetails.br_id;

    this.memberData.brunchId = this.brunchId;
    this.memberData.branch_name = this.brunchDetails.br_name;

    console.log("zzzzzzzzzzzzzzzzzzzz", this.brunchId);

    console.log("Token=", token);
    if (!token.usr.accessKeyword) {
      console.log("gggggggggggggggggggggg");

      return;
    }
  }


  ngOnInit(): void {
    // this.checkMember();
    this.loanApplyList();
    this.getVendor();
  }


  spiner() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 5000);
  }


  Calculate(){

    if (this.memberData.l_product_cost < 100001) {
      this.memberData.l_processing_fee = Math.round(this.memberData.l_product_cost*0.010);
    console.log("this.memberData.l_processing_fee",this.memberData.l_processing_fee);    
    this.memberData.l_total_return_amnt = Math.round((this.memberData.share_fee + this.memberData.share_admsn_fee + this.memberData.ac_admsn_fee + this.memberData.insrnc + Number(this.memberData.emi_card_fee) + this.memberData.nach + this.memberData.l_processing_fee + this.memberData.l_product_cost)*this.memberData.l_roi);
    console.log("this.memberData.l_total_return_amnt",this.memberData.l_total_return_amnt);
    this.memberData.emi_amnt = Math.round(this.memberData.l_total_return_amnt/12);
    // console.log("this.memberData.emi_amnt",this.memberData.emi_amnt);
    this.memberData.adv_emi = Math.round(this.memberData.l_tenure*this.memberData.emi_amnt);
    // console.log("this.memberData.adv_emi",this.memberData.adv_emi);
    }else{
      this.toastr.error("Product cost maximum limit 1,00,0000", "warning!", {
        disableTimeOut: false
      });
    }

    
  }

  loanApplyList() {
    this.ExpressLoanApplyService.getExpressLoanApplyList(this.userId, (callback: any) => {
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

  getVendor = () => {
    let requestObject = {};

    this.ExpressLoanApplyService.getVendor(this.brunchId, (callback: any) => {
      console.log("getVendor", callback);
      this.vendorData = callback
      console.log("vvvvvvvvvvvvv", this.vendorData);
    });
  }

  checkMember() {
    this.ckInput.brunchId = this.brunchId;
    console.log("check input data", this.ckInput);

    this.ExpressLoanApplyService.checkMemberReferenceData(this.ckInput, (res: any) => {
      this.returnMsg = res;
      console.log("lllllllllll", this.returnMsg);
      if (res == null) {
        this.notFound = true;
        this.found = false;
      } else {
        this.found = true;
        this.notFound = false;

        this.getBrunch();


        console.log("ccccccccccccc", res);

        this.mId = res.id,
          console.log("mId", this.mId);

          this.memberData.id = res.id,
          this.memberData.f_name = res.f_name,
          this.memberData.l_name = res.l_name,
          this.memberData.email = res.email,
          this.memberData.fathers_name = res.fathers_name,
          this.memberData.address = res.address,
          this.memberData.phone_no = res.phone_no,

          this.memberData.msp_apply_date = this.myDate,
          this.memberData.msp_code = this.user.f_name + " " + this.user.l_name,

          this.memberData.membershipId = this.ckInput.membershipId;

        // this.memberData.reference_no = this.convertDate();
        this.memberData.full_name = this.memberData.f_name + " " + this.memberData.l_name;
        console.log("aitu", this.memberData);

        const birthdateObj = new Date(this.memberData.dob);
        const currentDate = new Date();

        // Calculate age
        let age = currentDate.getFullYear() - birthdateObj.getFullYear();

        // Check if birthday has occurred this year
        if (
          currentDate.getMonth() < birthdateObj.getMonth() ||
          (currentDate.getMonth() === birthdateObj.getMonth() && currentDate.getDate() < birthdateObj.getDate())
        ) {
          age--;
        }

        this.memberData.age = age;



      }
    })
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

  getBrunch = () => {
    let requestObject = {};

    this.ExpressLoanApplyService.getBrunch(requestObject, (callback: any) => {
      console.log("getBrunch", callback);
      this.branchData = callback;
      console.log("vvvvvvvvvvvvv", this.branchData);
    });
  }


  saveData() {
    this.Calculate();
    this.isSaving = true;
    this.memberData.reference_no = this.ckInput.Reference_no;
    console.log("input data", this.memberData);
    let isValid = this.validateInputs();
    if(isValid){
    this.ExpressLoanApplyService.createExpressLoan(this.memberData, (res: any) => {
      console.log("res", res);      
    // this.spiner();
        if (res) {
      this.isLodaing = false;
      this.dbId = res.id;
      console.log("dbIddbIddbIddbId", res.id);
      this.inputForm = false;
      this.uploadForm = true;
      this.showIncm = true;
        }

    });
  }else{
    this.isSaving = false;
  }

  } 

  onFileSelectedIncm(event: any){
    console.log(event.target.files[0].size);
    if (event.target.files.length > 0 && event.target.files[0].size < 2000000) {
      this.uploadImageObjectIncm.EXP_incm_proof = event.target.files[0];
      var fileExtension = '.' + event.target.files[0].name.split('.')[1];
      var name = "EXP_INCM_PRF_" + this.convertDate() + fileExtension;
      var blob = event.target.files[0].slice(0, event.target.files[0].size, event.target.files[0].type);
      var newFile = new File([blob], name, { type: event.target.files[0].type });
      this.uploadImageObjectIncm.image = newFile;
      this.EXP_incm_proof = this.uploadImageObjectIncm.EXP_incm_proof
        ? this.uploadImageObjectIncm.EXP_incm_proof["name"]
        : "Choose File";
      console.log("imgObject===", this.uploadImageObjectIncm);
    } else {
      this.toastr.error('Image size should be less than 2 MB', 'Error', {
        disableTimeOut: false
      });
    }
    return true;
  };

  uploadIncm() {
    console.log("Uploading Income proof", this.uploadImageObjectIncm);
    let isValid = this.validateIncm();
    if (isValid) {
      this.isAllowedFilePdf(this.uploadImageObjectIncm.image, (res: any) => {
        console.log("res", res);
        if (res == true) {
          this.isLodaing = true;
          this.spiner();
          console.log("input data", this.uploadImageObjectIncm);
          const formData = new FormData();
          formData.append("dbid", this.dbId);
          formData.append("userId", this.memberData.id);
          formData.append("file", this.uploadImageObjectIncm.image);
          console.log("FORMDATA===", formData);
          console.log("dbid===", this.dbId);
          this.ExpressLoanApplyService.uploadIncmrFile(
            formData, (response: any) => {
              this.isLodaing = false;
              this.successIncm = true;
              this.showProduct = true;
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

  validateIncm = () => {
    console.log("vvvvvvvv", this.uploadImageObjectIncm.image);

    if (this.uploadImageObjectIncm.image === '' || this.uploadImageObjectIncm.image === null || this.uploadImageObjectIncm.image === undefined) {
      this.toastr.warning('Please select the file', 'Warning', {
        disableTimeOut: false
      });
      return false;
    }
    return true;
  }

  onFileSelectedProduct(event: any){
    console.log(event.target.files[0].size);
    if (event.target.files.length > 0 && event.target.files[0].size < 200000) {
      this.uploadImageObjectProduct.Exp_product_photo = event.target.files[0];
      var fileExtension = '.' + event.target.files[0].name.split('.')[1];
      var name = "EXP_PRDCT_" + this.convertDate() + fileExtension;
      var blob = event.target.files[0].slice(0, event.target.files[0].size, event.target.files[0].type);
      var newFile = new File([blob], name, { type: event.target.files[0].type });
      this.uploadImageObjectProduct.image = newFile;
      this.Exp_product_photo = this.uploadImageObjectProduct.Exp_product_photo
        ? this.uploadImageObjectProduct.Exp_product_photo["name"]
        : "Choose File";
      console.log("imgObject===", this.uploadImageObjectProduct);
    } else {
      this.toastr.error('Image size should be less than 200kb', 'Error', {
        disableTimeOut: false
      });
    }
    return true;
  };


  uploadProduct(){
    console.log("Uploading product image", this.uploadImageObjectProduct);
    this.reference_number = this.convertDate();
    let isValid = this.validateProduct();
    if (isValid) {
      this.isAllowedFile(this.uploadImageObjectProduct.image, (res: any) => {
        console.log("res", res);
        if (res == true) {
          this.isLodaing = true;
          this.spiner();
          console.log("input data", this.uploadImageObjectProduct);
          const formData = new FormData();
          formData.append("dbid", this.dbId);
          formData.append("userId", this.memberData.id);
          formData.append("reference_number", this.reference_number);
          formData.append("loan_status", "Applied");
          formData.append("file", this.uploadImageObjectProduct.image);
          console.log("FORMDATA===", formData);
          console.log("dbid===", this.dbId);
          this.ExpressLoanApplyService.uploadProduct(
            formData, (response: any) => {
              this.isLodaing = false;
              this.successIncm = true;
              this.returnMsg = response.message;
              console.log("lllllllllll", this.returnMsg);
              let ele:any = document.getElementById('modalClose');
              ele.click();
              this.inputForm = true;
              this.uploadForm = false;

              this.successIncm = false;
              this.successProduct = false;
              this.showProduct = false;
              this.loanApplyList();
              this.resetForm();
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


  validateProduct = () => {
    console.log("vvvvvvvv", this.uploadImageObjectIncm.image);

    if (this.uploadImageObjectProduct.image === '' || this.uploadImageObjectProduct.image === null || this.uploadImageObjectProduct.image === undefined) {
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

  isAllowedFilePdf = (file: any, callback: any) => {
    console.log("call", file.type);
    switch (file.type) {
      case "application/pdf":
        return callback(true);
      default:
        return callback(false);
    }
  };


  validateInputs = () => {
    console.log("Saving project before validate", this.memberData);
    if (this.memberData.l_emp_type === '' || this.memberData.l_emp_type === null || this.memberData.l_emp_type === undefined) {
      this.toastr.warning('Please select employement type.', 'Warning', {
        disableTimeOut: false
      });
      return false;
    }
    if (this.memberData.l_annual_incm === '' || this.memberData.l_annual_incm === null || this.memberData.l_annual_incm === undefined) {
      this.toastr.warning('Please type annual income.', 'Warning', {
        disableTimeOut: false
      });
      return false;
    }
    if (this.memberData.l_product_ategory === '' || this.memberData.l_product_ategory === null || this.memberData.l_product_ategory === undefined) {
      this.toastr.warning('Please select product category', 'Warning', {
        disableTimeOut: false
      });
      return false;
    }
    if (this.memberData.l_make === '' || this.memberData.l_make === null || this.memberData.l_make === undefined) {
      this.toastr.warning('Please type make', 'Warning', {
        disableTimeOut: false
      });
      return false;
    }
    if (this.memberData.l_model === '' || this.memberData.l_model === null || this.memberData.l_model === undefined) {
      this.toastr.warning('Please type model', 'Warning', {
        disableTimeOut: false
      });
      return false;
    }
    if (this.memberData.l_serial_no === '' || this.memberData.l_serial_no === null || this.memberData.l_serial_no === undefined) {
      this.toastr.warning('Please type Serial No.', 'Warning', {
        disableTimeOut: false
      });
      return false;
    }
    if (this.memberData.l_vendor === '' || this.memberData.l_vendor === null || this.memberData.l_vendor === undefined) {
      this.toastr.warning('Please select Vendor', 'Warning', {
        disableTimeOut: false
      });
      return false;
    }
    if (this.memberData.l_product_cost === '' || this.memberData.l_product_cost === null || this.memberData.l_product_cost === undefined || this.memberData.l_product_cost > 100001) {
      this.toastr.warning('Please type Product Cost less than 1,00,000', 'Warning', {
        disableTimeOut: false
      });
      return false;
    }
    if (this.memberData.emi_card_fee === '' || this.memberData.emi_card_fee === null || this.memberData.emi_card_fee === undefined) {
      this.toastr.warning('Please select EMI card fee/Renewal fee', 'Warning', {
        disableTimeOut: false
      });
      return false;
    }
    // if (this.memberData.l_down_payment_amount === '' || this.memberData.l_down_payment_amount === null || this.memberData.l_down_payment_amount === undefined) {
    //   this.toastr.warning('Please type Down Payment Amount', 'Warning', {
    //     disableTimeOut: false
    //   });
    //   return false;
    // }
    // if (this.memberData.l_processing_fee === '' || this.memberData.l_processing_fee === null || this.memberData.l_processing_fee === undefined) {
    //   this.toastr.warning('Please type Processing Fee', 'Warning', {
    //     disableTimeOut: false
    //   });
    //   return false;
    // }
    // if (this.memberData.l_tenure === '' || this.memberData.l_tenure === null || this.memberData.l_tenure === undefined) {
    //   this.toastr.warning('Please select Tenure', 'Warning', {
    //     disableTimeOut: false
    //   });
    //   return false;
    // }
    return true;
  }

  resetForm() {
    this.ckInput.Reference_no = "";
    this.found = false;

    this.memberData.full_name= "";
    this.memberData.l_emp_type= "";
    this.memberData.l_annual_incm= "";
    this.memberData.l_product_ategory= "";
    this.memberData.l_make= "";
    this.memberData.l_model= "";
    this.memberData.l_serial_no= "";
    this.memberData.l_vendor= "";
    this.memberData.l_product_cost= "";
    this.memberData.l_down_payment_amount= "";
    this.memberData.l_processing_fee= "";
    this.memberData.l_tenure= "";
    this.memberData.l_roi= "";
    this.memberData.l_EMI_amount = "";
    this.EXP_incm_proof = "Choose File";
    this.Exp_product_photo = "Choose File";
    this.uploadImageObjectIncm.image = "";
    this.uploadImageObjectProduct.image = "";
  }









  Calculate_not_use_in_this_project(){

    if (this.memberData.l_product_cost <= 64022) {
      this.memberData.l_down_payment_amount = 0.25*this.memberData.l_product_cost;

      this.memberData.finance_amnt = this.memberData.l_product_cost - this.memberData.l_down_payment_amount;

      this.memberData.l_processing_fee = 0.035*this.memberData.finance_amnt;

      this.gst = 0.18*this.memberData.l_processing_fee;

      this.memberData.total_processing_fee = Math.round(this.gst + this.memberData.l_processing_fee);

      this.memberData.net_finance_amnt = this.memberData.total_processing_fee + this.memberData.finance_amnt;
      
      this.memberData.tenure_in_month = this.memberData.l_tenure/12;

      // formula =====> principal * Math.pow((1 + rate / timesCompounded), timesCompounded * years);
      // this.memberData.total_return = this.memberData.net_finance_amnt * Math.pow((1 + this.rate / 1), 1 * this.memberData.tenure_in_month);

      // this.memberData.calculated_emi = this.memberData.total_return / this.memberData.l_tenure;

      this.memberData.calculated_emi = Math.round(this.memberData.net_finance_amnt * 0.02 * ((Math.pow(1 + this.rate,this.memberData.l_tenure)) / (Math.pow(1 + this.rate,this.memberData.l_tenure) - 1)));

      // P * r * (Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1));
    }else {
      
      this.memberData.l_down_payment_amount = this.memberData.l_product_cost - 48017;

      this.memberData.finance_amnt = 48017;

      this.memberData.l_processing_fee = 1680.50;

      this.gst = 302.50;

      this.memberData.total_processing_fee = Math.round(this.gst + this.memberData.l_processing_fee);

      this.memberData.net_finance_amnt = this.memberData.total_processing_fee + this.memberData.finance_amnt;
      
      this.memberData.tenure_in_month = this.memberData.l_tenure/12;

      // formula =====> principal * Math.pow((1 + rate / timesCompounded), timesCompounded * years);
      // this.memberData.total_return = this.memberData.net_finance_amnt * Math.pow((1 + this.rate / 1), 1 * this.memberData.tenure_in_month);

      // this.memberData.calculated_emi = this.memberData.total_return / this.memberData.l_tenure;

      this.memberData.calculated_emi = Math.round(this.memberData.net_finance_amnt * 0.02 * ((Math.pow(1 + this.rate,this.memberData.l_tenure)) / (Math.pow(1 + this.rate,this.memberData.l_tenure) - 1)));
    }
    
  }
}
