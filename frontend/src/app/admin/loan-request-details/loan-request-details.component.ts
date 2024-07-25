import { Component, OnInit } from '@angular/core';
import { LoanRequestDetailsService } from './loan-request-details.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { NgxPrintModule } from 'ngx-print';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-loan-request-details',
  templateUrl: './loan-request-details.component.html',
  styleUrls: ['./loan-request-details.component.css'],
  standalone: true,
  imports: [NgxPrintModule, NgxSpinnerModule, RouterModule, MatTableModule, MatPaginatorModule, MatButtonModule, MatInputModule, FormsModule, MatFormFieldModule, CommonModule],
})
export class LoanRequestDetailsComponent implements OnInit {

  showProgressBar: boolean = true; // Set to true to show progress bar
  progressWidthFa: string = '20%';
  progressWidthBm: string = '40%';
  progressWidthLo: string = '60%';
  progressWidthMd: string = '80%';
  progressWidthCm: string = '100%';

  public loanData: any = {};

  public bmInput: any = {
    bm_proposed_amnt: "",
    bm_reason: "",
    action: "",
  };

  public loInput: any = {
    lo_proposed_amnt: "",
    lo_reason: "",
  };

  public mdInput: any = {
    md_proposed_amnt: "",
    lo_reason: "",
  };

  public cmInput: any = {
    cm_proposed_amnt: "",
    cm_reason: "",
  };

  public isFA = false;
  public isBM = false;
  public isCM = false;
  public isMD = false;
  public isLO = false;

  public isLodaing = true;
  public user: any;
  public role: any;
  public brunchFormData: any;
  public isSaving: boolean = false;
  public endpoint: any;
  public userList: any;
  public data: any;
  public rqstId: any;

  public myDate: any = new Date();

  public userId: any;
  public tokenData: any;

  constructor(
    private LoanRequestDetailsService: LoanRequestDetailsService,
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
    this.LoanRequestDetailsService.LoanDataById(this.rqstId, (res: any) => {
      console.log("ResDetails==", res);
      this.isLodaing = false;

      this.loanData.full_name = res.full_name;
      this.loanData.apply_amount = res.apply_amount;
      this.loanData.full_name = res.full_name;
      this.loanData.age = res.age;

      this.loanData.a_occupation = res.a_occupation;
      this.loanData.a_maried = res.a_maried;
      this.loanData.a_resident = res.a_resident;
      this.loanData.a_stay_since = res.a_stay_since;
      this.loanData.a_house_owner = res.a_house_owner;
      this.loanData.a_house_owner_phone = res.a_house_owner_phone;
      this.loanData.a_education = res.a_education;
      this.loanData.a_temp_address = res.a_temp_address;
      this.loanData.a_Depend_family = res.a_Depend_family;

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

      this.loanData.address = res["membership.address"];
      this.loanData.email = res["membership.user.email"];
      this.loanData.memberF_name = res["membership.user.f_name"];
      this.loanData.memberL_name = res["membership.user.l_name"];
      this.loanData.membership_id = res["membership.membership_id"];
      this.loanData.membershipId = res["membership.id"];
      this.loanData.brunch_name = res["membership.brunch.brunch_name"];
      this.loanData.fathers_name = res["membership.fathers_name"];
      this.loanData.phone_no = res["membership.phone_no"];
      this.loanData.gender = res["membership.gender"];
      this.loanData.dob = res["membership.dob"];
      this.loanData.adharNo = res["membership.adharNo"];
      this.loanData.panNo = res["membership.panNo"];

      // user name
      this.loanData.fieldAgent_frm_applied = res["user.f_name"]+ " "+res["user.l_name"];

      // branch name
      this.loanData.branch_frm_applied = res["brunch.brunch_name"];
      this.loanData.branchCode_frm_applied = res["brunch.brunch_code"];

      // images
      this.loanData.panCard = res["membership.panCard"];
      this.loanData.photo = res["membership.photo"];
      this.loanData.sign = res["membership.sign"];
      this.loanData.adharCard = res["membership.adharCard"];

      // docs
      this.loanData.l_income_proof = res["loan_basic_first.l_income_proof"];
      this.loanData.l_bank_stmnt = res["loan_basic_first.l_bank_stmnt"];
      this.loanData.l_occu_proof = res["loan_basic_first.l_occu_proof"];

      this.loanData.g_photo = res["loan_guarantor.g_photo"];
      this.loanData.g_id_proof = res["loan_guarantor.g_id_proof"];
      this.loanData.g_sign = res["loan_guarantor.g_sign"];
      this.loanData.g_address_proof = res["loan_guarantor.g_address_proof"];
      this.loanData.g_FS = res["loan_guarantor.g_FS"];

      this.loanData.n_photo = res["loan_nominee.n_photo"];
      this.loanData.n_id_proof = res["loan_nominee.n_id_proof"];
      this.loanData.n_sign = res["loan_nominee.n_sign"];
      this.loanData.n_address_proof = res["loan_nominee.n_address_proof"];
      this.loanData.n_FS = res["loan_nominee.n_FS"];


      this.loanData.l_loan_scheme = res["loan_basic_first.l_loan_scheme"];
      this.loanData.l_aapply_amount = res["loan_basic_first.l_aapply_amount"];
      this.loanData.l_expected_month = res["loan_basic_first.l_expected_month"];
      this.loanData.l_loan_scheme_intrst = res["loan_basic_first.l_loan_scheme_intrst"];
      this.loanData.l_mode_repay = res["loan_basic_first.l_mode_repay"];
      this.loanData.l_customer_id = res["loan_basic_first.l_customer_id"];
      this.loanData.l_share_amt = res["loan_basic_first.l_share_amt"];
      this.loanData.l_br_name = res["loan_basic_first.l_br_name"];
      this.loanData.l_fresh_loan = res["loan_basic_first.l_fresh_loan"];
      this.loanData.l_last_loan_amt = res["loan_basic_first.l_last_loan_amt"];
      this.loanData.l_last_purpose = res["loan_basic_first.l_last_purpose"];
      this.loanData.l_deposit_acNo = res["loan_basic_first.l_deposit_acNo"];
      this.loanData.l_deposit_balance = parseInt(res["loan_basic_first.l_deposit_balance"]);
      this.loanData.l_deposit_scheme = res["loan_basic_first.l_deposit_scheme"];
      this.loanData.l_deposit_status = res["loan_basic_first.l_deposit_status"];
      this.loanData.l_deposit_maturity = res["loan_basic_first.l_deposit_maturity"];
      this.loanData.l_deposit_acNo1 = res["loan_basic_first.l_deposit_acNo1"];
      this.loanData.l_deposit_balance1 = parseInt(res["loan_basic_first.l_deposit_balance1"]);
      this.loanData.l_deposit_scheme1 = res["loan_basic_first.l_deposit_scheme1"];
      this.loanData.l_deposit_status1 = res["loan_basic_first.l_deposit_status1"];
      this.loanData.l_deposit_maturity1 = res["loan_basic_first.l_deposit_maturity1"];
      this.loanData.l_deposit_acNo2 = res["loan_basic_first.l_deposit_acNo2"];
      this.loanData.l_deposit_balance2 = parseInt(res["loan_basic_first.l_deposit_balance2"]);
      this.loanData.l_deposit_scheme2 = res["loan_basic_first.l_deposit_scheme2"];
      this.loanData.l_deposit_status2 = res["loan_basic_first.l_deposit_status2"];
      this.loanData.l_deposit_maturity2 = res["loan_basic_first.l_deposit_maturity2"];
      this.loanData.l_deposit_acNo3 = res["loan_basic_first.l_deposit_acNo3"];
      this.loanData.l_deposit_balance3 = parseInt(res["loan_basic_first.l_deposit_balance3"]);
      this.loanData.l_deposit_scheme3 = res["loan_basic_first.l_deposit_scheme3"];
      this.loanData.l_deposit_status3 = res["loan_basic_first.l_deposit_status3"];
      this.loanData.l_deposit_maturity3 = res["loan_basic_first.l_deposit_maturity3"];
      this.loanData.l_deposit_acN4 = res["loan_basic_first.l_deposit_acN4"];
      this.loanData.l_deposit_balance4 = parseInt(res["loan_basic_first.l_deposit_balance4"]);
      this.loanData.l_deposit_schem4 = res["loan_basic_first.l_deposit_schem4"];
      this.loanData.l_deposit_statu4 = res["loan_basic_first.l_deposit_statu4"];
      this.loanData.l_deposit_maturit4 = res["loan_basic_first.l_deposit_maturit4"];
      this.loanData.l_goods_type = res["loan_basic_first.l_goods_type"];
      this.loanData.l_brand_name = res["loan_basic_first.l_brand_name"];
      this.loanData.l_model_no = res["loan_basic_first.l_model_no"];
      this.loanData.l_goods_colour = res["loan_basic_first.l_goods_colour"];
      this.loanData.l_warrentee = res["loan_basic_first.l_warrentee"];

      this.loanData.l_balance_sum = (this.loanData.l_deposit_balance || 0) + (this.loanData.l_deposit_balance1 || 0) + (this.loanData.l_deposit_balance2 || 0) + (this.loanData.l_deposit_balance3 || 0) + (this.loanData.l_deposit_balance4 || 0)

     //loan basic form 2
     this.loanData.l_employee_type = res["loan_basic_second.l_employee_type"];
      this.loanData.l_emp_emp_type = res["loan_basic_second.l_emp_emp_type"];
      this.loanData.l_emp_mode_salary = res["loan_basic_second.l_emp_mode_salary"];
      this.loanData.l_emp_net_salary = res["loan_basic_second.l_emp_net_salary"];
      this.loanData.l_emp_othr_incm = res["loan_basic_second.l_emp_othr_incm"];
      this.loanData.l_self_bsns_type = res["loan_basic_second.l_self_bsns_type"];
      this.loanData.l_self_bsns_start = res["loan_basic_second.l_self_bsns_start"];
      this.loanData.l_self_prfsn = res["loan_basic_second.l_self_prfsn"];
      this.loanData.l_self_practice_start = res["loan_basic_second.l_self_practice_start"];
      this.loanData.l_emp_anual_incm = res["loan_basic_second.l_emp_anual_incm"];
      this.loanData.l_emp_anual_expnd = res["loan_basic_second.l_emp_anual_expnd"];
      this.loanData.l_emp_net_income = res["loan_basic_second.l_emp_net_income"];
      this.loanData.l_self_reg_no = res["loan_basic_second.l_self_reg_no"];
      this.loanData.l_emp_name = res["loan_basic_second.l_emp_name"];
      this.loanData.l_emp_loan_amnt = parseInt(res["loan_basic_second.l_emp_loan_amnt"]);
      this.loanData.l_emp_emi = parseInt(res["loan_basic_second.l_emp_emi"]);
      this.loanData.l_emp_balance = parseInt(res["loan_basic_second.l_emp_balance"]);
      this.loanData.l_emp_startDate = res["loan_basic_second.l_emp_startDate"];
      this.loanData.l_emp_name1 = res["loan_basic_second.l_emp_name1"];
      this.loanData.l_emp_loan_amnt1 = parseInt(res["loan_basic_second.l_emp_loan_amnt1"]);
      this.loanData.l_emp_emi1 = parseInt(res["loan_basic_second.l_emp_emi1"]);
      this.loanData.l_emp_balance1 = parseInt(res["loan_basic_second.l_emp_balance1"]);
      this.loanData.l_emp_startDate1 = res["loan_basic_second.l_emp_startDate1"];
      this.loanData.l_emp_name2 = res["loan_basic_second.l_emp_name2"];
      this.loanData.l_emp_loan_amnt2 = parseInt(res["loan_basic_second.l_emp_loan_amnt2"]);
      this.loanData.l_emp_emi2 = parseInt(res["loan_basic_second.l_emp_emi2"]);
      this.loanData.l_emp_balance2 = parseInt(res["loan_basic_second.l_emp_balance2"]);
      this.loanData.l_emp_startDate2 = res["loan_basic_second.l_emp_startDate2"];
      this.loanData.l_emp_name3 = res["loan_basic_second.l_emp_name3"];
      this.loanData.l_emp_loan_amnt3 = parseInt(res["loan_basic_second.l_emp_loan_amnt3"]);
      this.loanData.l_emp_emi3 = parseInt(res["loan_basic_second.l_emp_emi3"]);
      this.loanData.l_emp_balance3 = parseInt(res["loan_basic_second.l_emp_balance3"]);
      this.loanData.l_emp_startDate3 = res["loan_basic_second.l_emp_startDate3"];
      this.loanData.l_emp_name4 = res["loan_basic_second.l_emp_name4"];
      this.loanData.l_emp_loan_amnt4 = parseInt(res["loan_basic_second.l_emp_loan_amnt4"]);
      this.loanData.l_emp_emi4 = parseInt(res["loan_basic_second.l_emp_emi4"]);
      this.loanData.l_emp_balance4 = parseInt(res["loan_basic_second.l_emp_balance4"]);
      this.loanData.l_emp_startDate4 = res["loan_basic_second.l_emp_startDate4"];
      this.loanData.l_make = res["loan_basic_second.l_make"];
      this.loanData.l_model = res["loan_basic_second.l_model"];
      this.loanData.l_colour = res["loan_basic_second.l_colour"];
      this.loanData.l_engine_no = res["loan_basic_second.l_engine_no"];
      this.loanData.l_chassis_no = res["loan_basic_second.l_chassis_no"];
      this.loanData.l_ac_name = res["loan_basic_second.l_ac_name"];
      this.loanData.l_ac_type = res["loan_basic_second.l_ac_type"];
      this.loanData.l_ac_no = res["loan_basic_second.l_ac_no"];
      this.loanData.l_ac_ifsc = res["loan_basic_second.l_ac_ifsc"];
      this.loanData.l_ac_bankName = res["loan_basic_second.l_ac_bankName"];
      this.loanData.l_ac_brName = res["loan_basic_second.l_ac_brName"];

      this.loanData.l_emp_loan_amnt_sum = (this.loanData.l_emp_loan_amnt || 0) + (this.loanData.l_emp_loan_amnt1 || 0) + (this.loanData.l_emp_loan_amnt2 || 0) + (this.loanData.l_emp_loan_amnt3 || 0) + (this.loanData.l_emp_loan_amnt4 || 0)

      this.loanData.l_emp_balance_sum = (this.loanData.l_emp_balance || 0) + (this.loanData.l_emp_balance1 || 0) + (this.loanData.l_emp_balance2 || 0) + (this.loanData.l_emp_balance3 || 0) + (this.loanData.l_emp_balance4 || 0)

      this.loanData.l_emp_emi_sum = (this.loanData.l_emp_emi || 0) + (this.loanData.l_emp_emi1 || 0) + (this.loanData.l_emp_emi2 || 0) + (this.loanData.l_emp_emi3 || 0) + (this.loanData.l_emp_emi4 || 0)



      //guarantor
      this.loanData.g_f_name = res["loan_guarantor.g_f_name"];
      this.loanData.g_email = res["loan_guarantor.g_email"];
      this.loanData.g_fathers_name = res["loan_guarantor.g_fathers_name"];
      this.loanData.g_phone_no = res["loan_guarantor.g_phone_no"];
      this.loanData.g_address = res["loan_guarantor.g_address"];
      this.loanData.g_occupation = res["loan_guarantor.g_occupation"];
      this.loanData.g_dob = res["loan_guarantor.g_dob"];
      this.loanData.g_gender = res["loan_guarantor.g_gender"];
      this.loanData.g_maried = res["loan_guarantor.g_maried"];
      this.loanData.g_resident = res["loan_guarantor.g_resident"];
      this.loanData.g_house_owner = res["loan_guarantor.g_house_owner"]; //
      this.loanData.g_house_owner_phone = res["loan_guarantor.g_house_owner_phone"]; //
      this.loanData.g_stay_since = res["loan_guarantor.g_stay_since"];
      this.loanData.g_edu = res["loan_guarantor.g_edu"];
      this.loanData.g_temp_address = res["loan_guarantor.g_temp_address"];
      this.loanData.g_Depend_family = res["loan_guarantor.g_Depend_family"];
      this.loanData.g_ac_no = res["loan_guarantor.g_ac_no"];
      this.loanData.g_br_name = res["loan_guarantor.g_br_name"];
      this.loanData.g_scheme = res["loan_guarantor.g_scheme"];
      this.loanData.g_start = res["loan_guarantor.g_start"];
      this.loanData.g_customer_id = res["loan_guarantor.g_customer_id"];
      this.loanData.g_end = res["loan_guarantor.g_end"];
      this.loanData.g_total_amnt = res["loan_guarantor.g_total_amnt"];
      this.loanData.g_csp_msp = res["loan_guarantor.g_csp_msp"];
      this.loanData.g_adharNo = res["loan_guarantor.g_adharNo"];
      this.loanData.g_panNo = res["loan_guarantor.g_panNo"];
      this.loanData.g_employee_type = res["loan_guarantor.g_employee_type"];
      this.loanData.g_emp_emp_type = res["loan_guarantor.g_emp_emp_type"]; //
      this.loanData.g_emp_mode_salary = res["loan_guarantor.g_emp_mode_salary"];
      this.loanData.g_emp_net_salary = res["loan_guarantor.g_emp_net_salary"];
      this.loanData.g_emp_othr_incm = res["loan_guarantor.g_emp_othr_incm"];
      this.loanData.g_self_bsns_type = res["loan_guarantor.g_self_bsns_type"];
      this.loanData.g_self_bsns_start = res["loan_guarantor.g_self_bsns_start"];
      this.loanData.g_self_prfsn = res["loan_guarantor.g_self_prfsn"];
      this.loanData.g_self_practice_start = res["loan_guarantor.g_self_practice_start"];
      this.loanData.g_self_anual_incm = res["loan_guarantor.g_self_anual_incm"];
      this.loanData.g_self_anual_expnd = res["loan_guarantor.g_self_anual_expnd"];
      this.loanData.g_self_net_income = res["loan_guarantor.g_self_net_income"];
      this.loanData.g_LA_name = res["loan_guarantor.g_LA_name"];
      this.loanData.g_LA_loan_amnt = parseInt(res["loan_guarantor.g_LA_loan_amnt"]);
      this.loanData.g_LA_emi = parseInt(res["loan_guarantor.g_LA_emi"]);
      this.loanData.g_LA_balance = parseInt(res["loan_guarantor.g_LA_balance"]);
      this.loanData.g_LA_startDate = res["loan_guarantor.g_LA_startDate"];
      this.loanData.g_LA_name1 = res["loan_guarantor.g_LA_name1"];
      this.loanData.g_LA_loan_amnt1 = parseInt(res["loan_guarantor.g_LA_loan_amnt1"]);
      this.loanData.g_LA_emi1 = parseInt(res["loan_guarantor.g_LA_emi1"]);
      this.loanData.g_LA_balance1 = parseInt(res["loan_guarantor.g_LA_balance1"]);
      this.loanData.g_LA_startDate1 = res["loan_guarantor.g_LA_startDate1"];
      this.loanData.g_LA_name2 = res["loan_guarantor.g_LA_name2"];
      this.loanData.g_LA_loan_amnt2 = parseInt(res["loan_guarantor.g_LA_loan_amnt2"]);
      this.loanData.g_LA_emi2 = parseInt(res["loan_guarantor.g_LA_emi2"]);
      this.loanData.g_LA_balance2 = parseInt(res["loan_guarantor.g_LA_balance2"]);
      this.loanData.g_LA_startDate2 = res["loan_guarantor.g_LA_startDate2"];
      this.loanData.g_LA_name3 = res["loan_guarantor.g_LA_name3"];
      this.loanData.g_LA_loan_amnt3 = parseInt(res["loan_guarantor.g_LA_loan_amnt3"]);
      this.loanData.g_LA_emi3 = parseInt(res["loan_guarantor.g_LA_emi3"]);
      this.loanData.g_LA_balance3 = parseInt(res["loan_guarantor.g_LA_balance3"]);
      this.loanData.g_LA_startDate3 = res["loan_guarantor.g_LA_startDate3"];
      this.loanData.g_LA_name4 = res["loan_guarantor.g_LA_name4"];
      this.loanData.g_LA_loan_amnt4 = parseInt(res["loan_guarantor.g_LA_loan_amnt4"]);
      this.loanData.g_LA_emi4 = parseInt(res["loan_guarantor.g_LA_emi4"]);
      this.loanData.g_LA_balance4 = parseInt(res["loan_guarantor.g_LA_balance4"]);
      this.loanData.g_LA_startDate4 = res["loan_guarantor.g_LA_startDate4"];

      this.loanData.g_LA_loan_amnt_sum = (this.loanData.g_LA_loan_amnt || 0) + (this.loanData.g_LA_loan_amnt1 || 0) + (this.loanData.g_LA_loan_amnt2 || 0) + (this.loanData.g_LA_loan_amnt3 || 0) + (this.loanData.g_LA_loan_amnt4 || 0)

      this.loanData.g_LA_emi_sum = (this.loanData.g_LA_emi || 0) + (this.loanData.g_LA_emi1 || 0) + (this.loanData.g_LA_emi2 || 0) + (this.loanData.g_LA_emi3 || 0) + (this.loanData.g_LA_emi4 || 0)

      this.loanData.g_LA_balance_sum = (this.loanData.g_LA_balance || 0) + (this.loanData.g_LA_balance1 || 0) + (this.loanData.g_LA_balance2 || 0) + (this.loanData.g_LA_balance3 || 0) + (this.loanData.g_LA_balance4 || 0)

      //post dated
      this.loanData.c_bank_name = res["loan_post_dated.c_bank_name"];
      this.loanData.c_br_name = res["loan_post_dated.c_br_name"];
      this.loanData.c_account = res["loan_post_dated.c_account"];
      this.loanData.c_name_in_ac = res["loan_post_dated.c_name_in_ac"];
      this.loanData.c_micr = res["loan_post_dated.c_micr"];
      this.loanData.c_ck_leave = res["loan_post_dated.c_ck_leave"];
      this.loanData.c_commencement = res["loan_post_dated.c_commencement"];
      this.loanData.c_ck_number = res["loan_post_dated.c_ck_number"];
      this.loanData.c_ck_amnt = res["loan_post_dated.c_ck_amnt"];

      //nominee
      this.loanData.n_nominee_name = res["loan_nominee.n_nominee_name"];
      this.loanData.n_fathers_name = res["loan_nominee.n_fathers_name"];
      this.loanData.n_dob = res["loan_nominee.n_dob"];
      this.loanData.n_gender = res["loan_nominee.n_gender"];
      this.loanData.n_adhar = res["loan_nominee.n_adhar"];
      this.loanData.n_pnone_no = res["loan_nominee.n_pnone_no"];
      this.loanData.n_pan = res["loan_nominee.n_pan"];
      this.loanData.n_email = res["loan_nominee.n_email"];
      this.loanData.n_address = res["loan_nominee.n_address"];
      this.loanData.n_relation = res["loan_nominee.n_relation"];
      this.loanData.n_margin = res["loan_nominee.n_margin"];
      this.loanData.n_margin_qty = res["loan_nominee.n_margin_qty"];
      this.loanData.n_margin_value = res["loan_nominee.n_margin_value"];
      this.loanData.n_gold = res["loan_nominee.n_gold"];
      this.loanData.n_gold_qty = res["loan_nominee.n_gold_qty"];
      this.loanData.n_gold_value = res["loan_nominee.n_gold_value"];
      this.loanData.n_land = res["loan_nominee.n_land"];
      this.loanData.n_land_qty = res["loan_nominee.n_land_qty"];
      this.loanData.n_land_value = res["loan_nominee.n_land_value"];
      this.loanData.n_land_buildings = res["loan_nominee.n_land_buildings"];
      this.loanData.n_land_buildings_qty = res["loan_nominee.n_land_buildings_qty"];
      this.loanData.n_land_buildings_value = res["loan_nominee.n_land_buildings_value"];

      //msp
      this.loanData.msp_name = res["loan_msp.msp_name"];
      this.loanData.msp_nick_name = res["loan_msp.msp_nick_name"];
      this.loanData.msp_permanent_rsd = res["loan_msp.msp_permanent_rsd"];
      this.loanData.msp_temporary_rsd = res["loan_msp.msp_temporary_rsd"];
      this.loanData.msp_resident = res["loan_msp.msp_resident"];
      this.loanData.msp_bsns_resident = res["loan_msp.msp_bsns_resident"];
      this.loanData.msp_bsns_type = res["loan_msp.msp_bsns_type"];
      this.loanData.msp_knwn_since = res["loan_msp.msp_knwn_since"];
      this.loanData.msp_owner_bsns = res["loan_msp.msp_owner_bsns"];
      this.loanData.msp_bsns_coFndr = res["loan_msp.msp_bsns_coFndr"];
      this.loanData.msp_estbls_name = res["loan_msp.msp_estbls_name"];
      this.loanData.msp_mltpl_bsns = res["loan_msp.msp_mltpl_bsns"];
      this.loanData.msp_stock_value = res["loan_msp.msp_stock_value"];
      this.loanData.msp_size_bsns = res["loan_msp.msp_size_bsns"];
      this.loanData.no_of_ac = res["loan_msp.no_of_ac"];
      this.loanData.msp_reg_deposit = res["loan_msp.msp_reg_deposit"];
      this.loanData.msp_reg_deposit_bsns = res["loan_msp.msp_reg_deposit_bsns"];
      this.loanData.msp_intrst_savings = res["loan_msp.msp_intrst_savings"];
      this.loanData.msp_reg_intrst_loan = res["loan_msp.msp_reg_intrst_loan"];
      this.loanData.msp_aprx_incm = res["loan_msp.msp_aprx_incm"];
      this.loanData.msp_cordnt = res["loan_msp.msp_cordnt"];
      this.loanData.msp_behaviour = res["loan_msp.msp_behaviour"];
      this.loanData.msp_inters_us = res["loan_msp.msp_inters_us"];
      this.loanData.msp_service_satisfied = res["loan_msp.msp_service_satisfied"];
      this.loanData.msp_thnk_abt_us = res["loan_msp.msp_thnk_abt_us"];
      this.loanData.msp_criminal_hstry = res["loan_msp.msp_criminal_hstry"];
      this.loanData.msp_financ_knwldg = res["loan_msp.msp_financ_knwldg"]
      this.loanData.msp_mind_belief = res["loan_msp.msp_mind_belief"];
      this.loanData.msp_literate = res["loan_msp.msp_literate"];
      this.loanData.msp_code = res["loan_msp.msp_code"];
      this.loanData.msp_branch_name = res["loan_msp.msp_branch_name"];
      this.loanData.msp_apply_date = res["loan_msp.msp_apply_date"];
      this.loanData.msp_place = res["loan_msp.msp_place"];

      //others
      this.loanData.mss_super_fee = parseInt(res["loan_other.mss_super_fee"]);
      this.loanData.number_of_emi = res["loan_other.number_of_emi"];
      this.loanData.processing_fee = parseInt(res["loan_other.processing_fee"]);
      this.loanData.sanction_no = res["loan_other.sanction_no"];
      this.loanData.Lapsed_eposit = parseInt(res["loan_other.Lapsed_eposit"]);

      this.loanData.amount_of_emi = res["loan_other.amount_of_emi"];
      this.loanData.cheque_leaf_1 = res["loan_other.cheque_leaf_1"];
      this.loanData.cheque_leaf_2 = res["loan_other.cheque_leaf_2"];
      this.loanData.cheque_leaf_3 = res["loan_other.cheque_leaf_3"];
      this.loanData.interest_type = res["loan_other.interest_type"];
      this.loanData.others = parseInt(res["loan_other.others"]);


      this.loanData.total_deduction = (this.loanData.others || 0) + (this.loanData.mss_super_fee || 0) + (this.loanData.processing_fee || 0) + (this.loanData.Lapsed_eposit || 0)

      this.loanData.totalSum = (this.loanData.cm_proposed_amnt || 0) - (this.loanData.total_deduction || 0)
    })
  }


  // convertNumberToText(num: number): string {
  //   const numberWords = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
  //   const numStr = num.toString();
  //   let text = '';
    
  //   for (let i = 0; i < numStr.length; i++) {
  //     const digit = parseInt(numStr[i]);
  //     text += numberWords[digit];
  //     if (i < numStr.length - 1) {
  //       text += ', ';
  //     }
  //   }
    
  //   return text;
  // }
  convertNumberToText(num: number): string {
    // if (isNaN(value)) return null;

    // Convert number to string
    const numStr = num.toString();

    // Split number into parts for crore, lakh, and thousand
    const crores = Math.floor(num / 10000000);
    const lakhs = Math.floor((num % 10000000) / 100000);
    const thousands = Math.floor((num % 100000) / 1000);
    const ones = Math.floor(num % 1000);

    // Format parts to Indian currency
    let result = '';
    if (crores > 0) {
      result += this.formatNumber(crores) + ' crore ';
    }
    if (lakhs > 0) {
      result += this.formatNumber(lakhs) + ' lakh ';
    }
    if (thousands > 0) {
      result += this.formatNumber(thousands) + ' thousand ';
    }
    if (ones > 0) {
      result += this.formatNumber(ones);
    }

    result = result.charAt(0).toUpperCase() + result.slice(1);

    return result.trim();
  }

  private formatNumber(num: number): string {
    const onesMap = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    const teensMap = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
    const tensMap = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

    let result = '';
    const hundreds = Math.floor(num / 100);
    const tensUnits = num % 100;

    if (hundreds > 0) {
      result += onesMap[hundreds] + ' hundred ';
    }

    if (tensUnits > 0) {
      if (tensUnits < 10) {
        result += onesMap[tensUnits];
      } else if (tensUnits < 20) {
        result += teensMap[tensUnits - 10];
      } else {
        const tens = Math.floor(tensUnits / 10);
        const units = tensUnits % 10;
        result += tensMap[tens];
        if (units > 0) {
          result += ' ' + onesMap[units];
        }
      }
    }

    return result;
  }


  updateBMStatus() {
    this.bmInput.bm_fwd_date = this.myDate;
    this.bmInput.id = this.rqstId;
    this.bmInput.bm_status = "Forwarded";
    console.log("bmInput", this.bmInput);

    let isValid = this.validateInputsBM();
    if (isValid) {

      this.LoanRequestDetailsService.updateBMstatus(this.bmInput, (res: any) => {

        this.getLoanDataById();
      })
    }
  }



  validateInputsBM = () => {
    if (this.bmInput.bm_proposed_amnt === '' || this.bmInput.bm_proposed_amnt === null || this.bmInput.bm_proposed_amnt === undefined) {
      this.toastr.warning('Please Enter proposed amount', 'Warning', {
        disableTimeOut: false
      });
      return false;
    }
    if (this.bmInput.bm_proposed_amnt > this.loanData.apply_amount) {
      this.toastr.warning('Please Enter equal or less than apply amount', 'Warning', {
        disableTimeOut: false
      });
      return false;
    }
    return true;
  }

  rejectBMStatus() {
    this.bmInput.bm_fwd_date = this.myDate;
    this.bmInput.id = this.rqstId;
    this.bmInput.bm_status = "Rejected";
    console.log("bmInput", this.bmInput);

    let isValid = this.validateInputsBMreject();
    if (isValid) {

      this.LoanRequestDetailsService.rejectBMstatus(this.bmInput, (res: any) => {

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

    let isValid = this.validateInputsLO();
    if (isValid) {

      this.LoanRequestDetailsService.updateLOstatus(this.loInput, (res: any) => {

        this.getLoanDataById();
      })
    }
  }


  validateInputsLO = () => {
    if (this.loInput.lo_proposed_amnt === '' || this.loInput.lo_proposed_amnt === null || this.loInput.lo_proposed_amnt === undefined) {
      this.toastr.warning('Please Enter proposed amount', 'Warning', {
        disableTimeOut: false
      });
      return false;
    }
    if (this.loInput.lo_proposed_amnt > this.loanData.bm_proposed_amnt) {
      this.toastr.warning('Please Enter equal or less than Branch Manager amount', 'Warning', {
        disableTimeOut: false
      });
      return false;
    }
    return true;
  }

  rejectLOStatus() {
    this.loInput.lo_fwd_date = this.myDate;
    this.loInput.id = this.rqstId;
    this.loInput.lo_status = "Rejected";
    console.log("bmInput", this.loInput);

    let isValid = this.validateInputsLOreject();
    if (isValid) {

      this.LoanRequestDetailsService.rejectLOstatus(this.loInput, (res: any) => {

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

    let isValid = this.validateInputsMD();
    if (isValid) {

      this.LoanRequestDetailsService.updateMDstatus(this.mdInput, (res: any) => {

        this.getLoanDataById();
      })
    }
  }


  validateInputsMD = () => {
    if (this.mdInput.md_proposed_amnt === '' || this.mdInput.md_proposed_amnt === null || this.mdInput.md_proposed_amnt === undefined) {
      this.toastr.warning('Please Enter proposed amount', 'Warning', {
        disableTimeOut: false
      });
      return false;
    }
    if (this.mdInput.md_proposed_amnt > this.loanData.lo_proposed_amnt) {
      this.toastr.warning('Please Enter equal or less than Loan Officer amount', 'Warning', {
        disableTimeOut: false
      });
      return false;
    }
    return true;
  }


  rejectMDStatus() {
    this.mdInput.md_fwd_date = this.myDate;
    this.mdInput.id = this.rqstId;
    this.mdInput.md_status = "Rejected";
    console.log("mdInput", this.mdInput);

    let isValid = this.validateInputsMDreject();
    if (isValid) {

      this.LoanRequestDetailsService.rejectMDstatus(this.mdInput, (res: any) => {

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

    let isValid = this.validateInputsCM();
    if (isValid) {

      this.LoanRequestDetailsService.updateCMstatus(this.cmInput, (res: any) => {

        this.getLoanDataById();
      })
    }
  }


  validateInputsCM = () => {
    if (this.cmInput.cm_proposed_amnt === '' || this.cmInput.cm_proposed_amnt === null || this.cmInput.cm_proposed_amnt === undefined) {
      this.toastr.warning('Please Enter proposed amount', 'Warning', {
        disableTimeOut: false
      });
      return false;
    }
    if (this.cmInput.cm_proposed_amnt > this.loanData.md_proposed_amnt) {
      this.toastr.warning('Please Enter equal or less than Managing Director amount', 'Warning', {
        disableTimeOut: false
      });
      return false;
    }
    return true;
  }


  rejectCMStatus() {
    this.cmInput.cm_fwd_date = this.myDate;
    this.cmInput.id = this.rqstId;
    this.cmInput.cm_status = "Rejected";
    console.log("cmInput", this.cmInput);

    let isValid = this.validateInputsCMreject();
    if (isValid) {

      this.LoanRequestDetailsService.rejectCMstatus(this.cmInput, (res: any) => {

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



