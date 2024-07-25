import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ExpressLoanDetailsUpdateService } from './express-loan-details-update.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-express-loan-details-update',
  templateUrl: './express-loan-details-update.component.html',
  styleUrls: ['./express-loan-details-update.component.css'],
  standalone: true,
  imports: [RouterModule, MatTableModule, MatPaginatorModule, MatButtonModule, MatInputModule, FormsModule, MatFormFieldModule, CommonModule],
})
export class ExpressLoanDetailsUpdateComponent implements OnInit{


  public memberData: any = {
    full_name: "",
    l_emp_type: "",
    l_annual_incm: "",
    l_product_ategory: "",
    l_make: "",
    l_model: "",
    l_serial_no: "",
    l_vendor: "",
    l_vendor_new: "",
    l_product_cost: 0,
    l_down_payment_amount: 0,
    l_processing_fee: "",
    l_tenure: 12,
    l_roi: 1.135, //13.5
    l_EMI_amount: "",


    share_fee: 110,
    share_admsn_fee: 50,
    ac_admsn_fee: 50,
    insrnc: 499,
    nach: 30,

    l_total_return_amnt: "",
    emi_amnt: "",
    adv_emi: "",

    
    
    total_processing_fee: 0,
    net_finance_amnt : 0,
    tenure_in_month: 0,
    total_return: 0,
    calculated_emi: 0,
  }

  //new
  public l_product_cost_new: any = 0;
  public l_total_return_amnt_new: any = 0;
  public l_processing_fee_new: any = 0;
  public emi_amnt_new: any = 0;
  public adv_emi_new: any = 0;

  public l_roi: any = 1.135;
  public share_fee: any =  110;
  public share_admsn_fee: any =  50;
  public ac_admsn_fee: any =  50;
  public insrnc: any =  499;
  public nach: any =  30;

  public reference_number: any;

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

  public returnMsg: any;

  public vendorData: any;

  public endpoint: any;
  public myDate: any = new Date();
  public rqstId: any;
  public user: any;
  public userId: any;
  public brunchId: any;
  public brunchDetails: any;

  public isLodaing = true;

  public finalBtn: boolean = false;

  constructor(
    private spinner: NgxSpinnerService,
    private ExpressLoanDetailsUpdateService: ExpressLoanDetailsUpdateService,
    private toastr: ToastrService,
    private _formBuilder: FormBuilder,
    
    private route: ActivatedRoute,
    private datePipe: DatePipe,
  ) {
    this.endpoint = environment.BASE_URL;
    this.myDate = this.datePipe.transform(this.myDate, "YYYY-MM-dd");
    this.route.paramMap.subscribe(params => {
      this.rqstId = params.get("id");
      console.log("rqstId", this.rqstId);

    });
    this.init();
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
    this.getexpressLoanDataById();
    this.getVendor();
  }


  spiner() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 5000);
  }

  getVendor = () => {
    let requestObject = {};

    this.ExpressLoanDetailsUpdateService.getVendor(this.brunchId, (callback: any) => {
      console.log("getVendor", callback);
      this.vendorData = callback
      console.log("vvvvvvvvvvvvv", this.vendorData);
    });
  }

  getexpressLoanDataById(){
    this.isLodaing = true;
    this.spiner();
    this.ExpressLoanDetailsUpdateService.expressLoanDataById(this.rqstId, (res: any) => {
      console.log("ResDetails==", res);
      this.isLodaing = false;

      this.memberData.id = res.id;
      this.memberData.full_name = res.full_name;
      this.memberData.l_emp_type = res.l_emp_type;
      this.memberData.l_annual_incm = res.l_annual_incm;
      this.memberData.l_product_ategory = res.l_product_ategory;
      this.memberData.l_make = res.l_make;
      this.memberData.l_model = res.l_model;
      this.memberData.l_serial_no = res.l_serial_no;
      this.memberData.l_vendor = res.l_vendor;
      this.memberData.l_product_cost = res.l_product_cost;
      this.memberData.l_down_payment_amount = res.l_down_payment_amount;
      this.memberData.l_processing_fee = res.l_processing_fee;
      this.memberData.l_tenure = res.l_tenure;
      this.memberData.l_roi = res.l_roi;
      this.memberData.l_EMI_amount = res.l_EMI_amount;
      this.memberData.share_fee = res.share_fee;
      this.memberData.share_admsn_fee = res.share_admsn_fee;
      this.memberData.ac_admsn_fee = res.ac_admsn_fee;
      this.memberData.insrnc = res.insrnc;
      this.memberData.nach = res.nach;
      this.memberData.l_total_return_amnt = res.l_total_return_amnt;
      this.memberData.emi_amnt = res.emi_amnt;
      this.memberData.adv_emi = res.adv_emi;

      this.memberData.bm_status = res.bm_status;
      this.memberData.bm_reason = res.bm_reason;

      this.memberData.incm_prf = res.incm_prf;
      this.memberData.product_photo = res.product_photo;

      this.memberData.membership_id = res["membership.id"];
      this.memberData.membership_email = res["membership.email"];
      this.memberData.membership_phone_no = res["membership.phone_no"];
      this.memberData.membership_address = res["membership.address"];
      
      this.memberData.shop_name = res["vendor.shop_name"];
      this.memberData.vendorId = res["vendor.vendorId"];


}
)}


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
        formData.append("dbid", this.rqstId);
        formData.append("userId", this.memberData.membership_id);
        formData.append("file", this.uploadImageObjectIncm.image);
        console.log("FORMDATA===", formData);
        console.log("dbid===", this.rqstId);
        this.ExpressLoanDetailsUpdateService.uploadIncmrFile(
          formData, (response: any) => {
            this.isLodaing = false;
            this.successIncm = true;
            this.showProduct = true;
            this.returnMsg = response.message;
            console.log("lllllllllll", this.returnMsg);
            this.getexpressLoanDataById();
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
        formData.append("dbid", this.rqstId);
        formData.append("userId", this.memberData.membership_id);
        formData.append("reference_number", this.reference_number);
        formData.append("loan_status", "Applied");
        formData.append("file", this.uploadImageObjectProduct.image);
        console.log("FORMDATA===", formData);
        console.log("dbid===", this.rqstId);
        this.ExpressLoanDetailsUpdateService.uploadProduct(
          formData, (response: any) => {
            this.isLodaing = false;
            this.successIncm = true;
            this.returnMsg = response.message;
            console.log("lllllllllll", this.returnMsg);
            this.successProduct = true;
            this.getexpressLoanDataById();
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

Calculate(){

  if (this.l_product_cost_new < 100001) {
    this.l_processing_fee_new = Math.round(this.l_product_cost_new*0.01);
  // console.log("this.l_processing_fee",this.l_processing_fee_new);    
  this.l_total_return_amnt_new = Math.round((this.share_fee + this.share_admsn_fee + this.ac_admsn_fee + this.insrnc + this.nach + this.l_processing_fee_new + this.l_product_cost_new)*this.l_roi);
  // console.log("this.l_total_return_amnt",this.l_total_return_amnt_new);
  this.emi_amnt_new = Math.round(this.l_total_return_amnt_new/12);
  // console.log("this.emi_amnt",this.emi_amnt_new);
  this.adv_emi_new = Math.round(3*this.emi_amnt_new);
  // console.log("this.adv_emi",this.adv_emi_new);
  }else{
    this.toastr.error("Product cost maximum limit 1,00,0000", "warning!", {
      disableTimeOut: false
    });
  }

  
}



checkUploads() {
  console.log("checkUpload");
  if (this.memberData.incm_prf === null || this.memberData.product_photo === null) {
    this.finalBtn = false;
    console.log("finalSubmit",this.finalBtn);
    this.toastr.error("Please upload all the documents", "warning!", {
      disableTimeOut: false
    });
  } else {
    this.finalBtn = true;
    console.log("finalSubmit",this.finalBtn);
    this.toastr.success("Checked, You can submit the form", "success!", {
      disableTimeOut: false
    });
  }
}



updateData(){

  if (this.memberData.reference_no == null) {
    this.reference_number = this.convertDate();
    console.log("reference_number nn",this.memberData.reference_no);
    
  }else{
    this.reference_number = this.memberData.reference_no;
    console.log("reference_number oo",this.memberData.reference_no);
  }

  const requestObject = {


    mId: this.rqstId,


    l_emp_type: this.memberData.l_emp_type,
    l_annual_incm: this.memberData.l_annual_incm,
    l_product_ategory: this.memberData.l_product_ategory,
    l_make: this.memberData.l_make,
    l_model: this.memberData.l_model,
    l_serial_no: this.memberData.l_serial_no,
    l_vendor: this.memberData.l_vendor_new,
    l_product_cost: this.memberData.l_product_cost,
    l_product_cost_new: this.l_product_cost_new,
    l_total_return_amnt_new: this.l_total_return_amnt_new,
    l_processing_fee_new: this.l_processing_fee_new,
    emi_amnt_new: this.emi_amnt_new,
    adv_emi_new: this.adv_emi_new,
    
    reference_no: this.reference_number,

  }
  this.spiner();
  console.log("input data", requestObject);
  let formValidate = this.validateInputs();
  if (formValidate) {
  this.ExpressLoanDetailsUpdateService.updateExpressLoanData(requestObject, (res: any) => {
    this.isLodaing = false;
    // let ele:any = document.getElementById('modalClose');
    // ele.click();
    console.log("dbIddbIddbIddbId", res.id);

    // this.inputForm = false;
    // this.uploadForm = true;
    this.getexpressLoanDataById();
  });
}
}




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
  if (this.memberData.l_vendor_new === '' || this.memberData.l_vendor_new === null || this.memberData.l_vendor_new === undefined) {
    this.toastr.warning('Please select Vendor', 'Warning', {
      disableTimeOut: false
    });
    return false;
  }
  if (this.l_product_cost_new === '' || this.l_product_cost_new === null || this.l_product_cost_new === undefined || this.l_product_cost_new > 100001) {
    this.toastr.warning('Please type Product Cost less than 1,00,000', 'Warning', {
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

}
