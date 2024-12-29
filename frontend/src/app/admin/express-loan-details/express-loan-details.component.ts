import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NgxPrintModule } from 'ngx-print';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { ExpressLoanDetailsService } from './express-loan-details.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-express-loan-details',
  templateUrl: './express-loan-details.component.html',
  styleUrls: ['./express-loan-details.component.css'],
  standalone: true,
  imports: [NgxPrintModule, NgxSpinnerModule, RouterModule, MatTableModule, MatPaginatorModule, MatButtonModule, MatInputModule, FormsModule, MatFormFieldModule, CommonModule],
})
export class ExpressLoanDetailsComponent implements OnInit{

  showProgressBar: boolean = true; // Set to true to show progress bar
  progressWidthFa: string = '20%';
  progressWidthBm: string = '40%';
  progressWidthLo: string = '60%';
  progressWidthMd: string = '80%';
  progressWidthCm: string = '100%';

  public bmInput: any = {
    bm_proposed_amnt: "",
    bm_reason: "",
    action: "",
  };

  public loInput: any = {
    lo_proposed_amnt: "",
    lo_reason: "",
    action: "",
  };

  public mdInput: any = {
    md_proposed_amnt: "",
    lo_reason: "",
    action: "",
  };

  public cmInput: any = {
    cm_proposed_amnt: "",
    cm_reason: "",
    action: "",
  };

  public endpoint: any;
  public myDate: any = new Date();
  public rqstId: any;
  public user: any;
  public role: any;

  public loanData: any = {};
  public tokenData: any;
  public isFA = false;
  public isBM = false;
  public isCM = false;
  public isMD = false;
  public isLO = false;
  public userId: any;

  public isLodaing = true;

  constructor(
    private ExpressLoanDetailsService: ExpressLoanDetailsService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
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
    this.role = this.user.role;
    console.log("Token=", token);
    if (!token.usr.accessKeyword) {
      console.log("gggggggggggggggggggggg");

      return;
    }
  }

  ngOnInit(): void {
    this.getLoanDataById();
    this.getUserDetails();
  }


  getUserDetails = () => {
    let token = JSON.parse(JSON.stringify(localStorage.getItem('token')));
    token = JSON.parse(token);

    this.tokenData = token;

    if (token) {
      this.user = token['usr'];
      this.userId = this.user.id;
      console.log("usr name=", this.user.f_name);
    } else {
      console.log("Token not");
    }


    if (token['usr'].position == "Field Agent") {
      if (this.loanData.userId == this.userId) {
        this.isFA = true;
        console.log("caaaaaaaaaaaaaaaaaaaaaaaaaa");
      } else {
        console.log("else part")
      }
    }
    if (token['usr'].position == "Branch Manager") {
      if (this.loanData.brunchId == token['brunch'].brunchId) {
        this.isBM = true;
        console.log("caaaaaaaaaaaaaaaaaaaaaaaaaa");
      } else {
        console.log("else part")
      }

    }
    if (token['usr'].position == "Head office") {
      console.log("zzzzzzzzzzzzzzzzzzzzzzz");
      if (token['usr'].designation == "Chairman") {
        this.isCM = true;
      }
      if (token['usr'].designation == "Managing Director") {
        this.isMD = true;
      }
      if (token['usr'].designation == "Loan Officer") {
        this.isLO = true;
        console.log("zzzzzzzzzzzzzzzzzzzzzzz");

      }
    }
  }

  spiner() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 5000);
  }


  getLoanDataById() {
    this.isLodaing = true;
    this.spiner();
    this.ExpressLoanDetailsService.ExpressLoanDataById(this.rqstId, (res: any) => {
      console.log("ResDetails==", res);
      this.isLodaing = false;

      this.loanData.full_name = res.full_name;
      this.loanData.l_emp_type = res.l_emp_type;
      this.loanData.l_annual_incm = res.l_annual_incm;
      this.loanData.l_product_ategory = res.l_product_ategory;
      this.loanData.l_make = res.l_make;
      this.loanData.l_model = res.l_model;
      this.loanData.l_serial_no = res.l_serial_no;
      this.loanData.l_product_cost = res.l_product_cost;
      this.loanData.l_down_payment_amount = res.l_down_payment_amount;
      this.loanData.l_processing_fee = res.l_processing_fee;
      this.loanData.l_tenure = res.l_tenure;
      this.loanData.l_roi = res.l_roi;

      this.loanData.intro_name = res.intro_name;
      this.loanData.intro_email = res.intro_email;
      this.loanData.intro_telephone = res.intro_telephone;
      this.loanData.intro_phone = res.intro_phone;
      this.loanData.intro_gender = res.intro_gender;
      this.loanData.intro_age = res.intro_age;
      this.loanData.intro_address = res.intro_address;

      // this.loanData.l_EMI_amount = res.l_EMI_amount;
      // this.loanData.total_processing_fee = res.total_processing_fee;
      // this.loanData.net_finance_amnt = res.net_finance_amnt;
      // this.loanData.calculated_emi = res.calculated_emi;

      this.loanData.share_fee = res.share_fee;
      this.loanData.share_admsn_fee = res.share_admsn_fee;
      this.loanData.ac_admsn_fee = res.ac_admsn_fee;
      this.loanData.insrnc = res.insrnc;
      this.loanData.l_total_return_amnt = res.l_total_return_amnt;
      this.loanData.emi_amnt = res.emi_amnt;
      this.loanData.adv_emi = res.adv_emi;
      
      this.loanData.reference_no = res.reference_no;

      this.loanData.fwd_status = res.fwd_status;

      this.loanData.fa_status = res.fa_status;
      this.loanData.apply_date = res.apply_date;
      this.loanData.apply_amount = res.apply_amount;
      this.loanData.loan_status = res.loan_status;
      this.loanData.loan_approve_date = res.loan_approve_date;
      this.loanData.membership_id = res.membership_id;
      this.loanData.brunch_name = res.brunch_name;

      this.loanData.bm_proposed_amnt = res.bm_proposed_amnt;
      this.loanData.bm_status = res.bm_status;
      this.loanData.bm_reason = res.bm_reason;
      this.loanData.bm_fwd_date = res.bm_fwd_date;

      this.loanData.lo_proposed_amnt = res.lo_proposed_amnt;
      this.loanData.lo_status = res.lo_status;
      this.loanData.lo_reason = res.lo_reason;
      this.loanData.lo_fwd_date = res.lo_fwd_date;

      this.loanData.md_proposed_amnt = res.md_proposed_amnt;
      this.loanData.md_status = res.md_status;
      this.loanData.md_reason = res.md_reason;
      this.loanData.md_fwd_date = res.md_fwd_date;

      this.loanData.cm_proposed_amnt = parseInt(res.cm_proposed_amnt);
      this.loanData.cm_status = res.cm_status;
      this.loanData.cm_reason = res.cm_reason;
      this.loanData.cm_fwd_date = res.cm_fwd_date;

      // user name
      this.loanData.fieldAgent_frm_applied = res["user.f_name"]+ " "+res["user.l_name"];

      // branch name
      this.loanData.branch_frm_applied = res["brunch.brunch_name"];
      this.loanData.branchCode_frm_applied = res["brunch.brunch_code"];

      this.loanData.address = res["membership.address"];
      this.loanData.email = res["membership.email"];
      this.loanData.memberF_name = res["membership.user.f_name"];
      this.loanData.memberL_name = res["membership.user.l_name"];
      // this.loanData.membership_id = res["membership.membership_id"];
      this.loanData.membershipId = res["membership.id"];
      this.loanData.memberBrunch_name = res["membership.brunch.brunch_name"];
      this.loanData.fathers_name = res["membership.fathers_name"];
      this.loanData.phone_no = res["membership.phone_no"];
      this.loanData.gender = res["membership.gender"];
      this.loanData.dob = res["membership.dob"];
      this.loanData.adharNo = res["membership.adharNo"];
      this.loanData.panNo = res["membership.panNo"];

      // images
      this.loanData.product_photo = res.product_photo;
      this.loanData.incm_prf = res.incm_prf;

      this.loanData.panCard = res["membership.panCard"];
      this.loanData.photo = res["membership.photo"];
      this.loanData.sign = res["membership.sign"];
      this.loanData.adharCard = res["membership.adharCard"];

      //vendor
      this.loanData.shop_name = res["vendor.shop_name"];
      this.loanData.proprietor_name = res["vendor.proprietor_name"];
      this.loanData.ac_name = res["vendor.ac_name"];
      this.loanData.ac_number = res["vendor.ac_number"];
      this.loanData.vendor_address = res["vendor.address"];
      this.loanData.bank_branch = res["vendor.bank_branch"];
      this.loanData.bank_name = res["vendor.bank_name"];
      this.loanData.city = res["vendor.city"];
      this.loanData.contact_number_1 = res["vendor.contact_number_1"];
      this.loanData.contact_number_2 = res["vendor.contact_number_2"];
      this.loanData.contact_number_3 = res["vendor.contact_number_3"];
      this.loanData.gst_number = res["vendor.gst_number"];
      this.loanData.ifsc = res["vendor.ifsc"];
      this.loanData.p_o = res["vendor.p_o"];
      this.loanData.district = res["vendor.district"];
      this.loanData.state = res["vendor.state"];
      this.loanData.pin_code = res["vendor.pin_code"];

      console.log("loanData",this.loanData);
      
    })
  }

  updateBMStatus() {
    this.bmInput.bm_fwd_date = this.myDate;
    this.bmInput.id = this.rqstId;
    this.bmInput.bm_status = "Forwarded";
    console.log("bmInput", this.bmInput);


      this.ExpressLoanDetailsService.updateBMstatus(this.bmInput, (res: any) => {

        this.getLoanDataById();
      })
  }


  rejectBMStatus() {
    this.bmInput.bm_fwd_date = this.myDate;
    this.bmInput.id = this.rqstId;
    this.bmInput.bm_status = "Rejected";
    console.log("bmInput", this.bmInput);

    let isValid = this.validateInputsBMreject();
    if (isValid) {

      this.ExpressLoanDetailsService.rejectBMstatus(this.bmInput, (res: any) => {

        this.getLoanDataById();
      })
    }
  }


  validateInputsBMreject = () => {
    if (this.bmInput.bm_reason === '' || this.bmInput.bm_reason === null || this.bmInput.bm_reason === undefined) {
      this.toastr.warning('Please Enter reason', 'Warning', {
        disableTimeOut: false
      });
      return false;
    }
    return true;
  }

  updateLOStatus() {
    this.loInput.lo_fwd_date = this.myDate;
    this.loInput.id = this.rqstId;
    this.loInput.lo_status = "Forwarded";
    console.log("loInput", this.loInput);

      this.ExpressLoanDetailsService.updateLOstatus(this.loInput, (res: any) => {

        this.getLoanDataById();
      })
  }


  rejectLOStatus() {
    this.loInput.lo_fwd_date = this.myDate;
    this.loInput.id = this.rqstId;
    this.loInput.lo_status = "Rejected";
    console.log("bmInput", this.loInput);

    let isValid = this.validateInputsLOreject();
    if (isValid) {

      this.ExpressLoanDetailsService.rejectLOstatus(this.loInput, (res: any) => {

        this.getLoanDataById();
      })
    }
  }


  validateInputsLOreject = () => {
    if (this.loInput.lo_reason === '' || this.loInput.lo_reason === null || this.loInput.lo_reason === undefined) {
      this.toastr.warning('Please Enter reason', 'Warning', {
        disableTimeOut: false
      });
      return false;
    }
    return true;
  }


  updateMDStatus() {
    this.mdInput.md_fwd_date = this.myDate;
    this.mdInput.id = this.rqstId;
    this.mdInput.md_status = "Forwarded";
    console.log("mdInput", this.mdInput);

      this.ExpressLoanDetailsService.updateMDstatus(this.mdInput, (res: any) => {

        this.getLoanDataById();
      })
  }



  rejectMDStatus() {
    this.mdInput.md_fwd_date = this.myDate;
    this.mdInput.id = this.rqstId;
    this.mdInput.md_status = "Rejected";
    console.log("mdInput", this.mdInput);

    let isValid = this.validateInputsMDreject();
    if (isValid) {

      this.ExpressLoanDetailsService.rejectMDstatus(this.mdInput, (res: any) => {

        this.getLoanDataById();
      })
    }
  }


  validateInputsMDreject = () => {
    if (this.mdInput.md_reason === '' || this.mdInput.md_reason === null || this.mdInput.md_reason === undefined) {
      this.toastr.warning('Please Enter reason', 'Warning', {
        disableTimeOut: false
      });
      return false;
    }
    return true;
  }

  updateCMStatus() {
    this.cmInput.cm_fwd_date = this.myDate;
    this.cmInput.id = this.rqstId;
    this.cmInput.cm_reason = "Approved";
    console.log("cmInput", this.cmInput);

      this.ExpressLoanDetailsService.updateCMstatus(this.cmInput, (res: any) => {

        this.getLoanDataById();
      })
  }



  rejectCMStatus() {
    this.cmInput.cm_fwd_date = this.myDate;
    this.cmInput.id = this.rqstId;
    this.cmInput.cm_status = "Rejected";
    console.log("cmInput", this.cmInput);

    let isValid = this.validateInputsCMreject();
    if (isValid) {

      this.ExpressLoanDetailsService.rejectCMstatus(this.cmInput, (res: any) => {

        this.getLoanDataById();
      })
    }
  }


  validateInputsCMreject = () => {
    if (this.cmInput.cm_reason === '' || this.cmInput.cm_reason === null || this.cmInput.cm_reason === undefined) {
      this.toastr.warning('Please Enter reason', 'Warning', {
        disableTimeOut: false
      });
      return false;
    }
    return true;
  }
}
