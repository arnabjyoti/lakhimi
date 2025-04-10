import { Component, OnInit } from '@angular/core';
import { LoanRequestDetailsUpdateService } from './loan-request-details-update.service';
import { CommonModule, DatePipe } from '@angular/common';
import { FormBuilder, FormsModule } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-loan-request-details-update',
  templateUrl: './loan-request-details-update.component.html',
  styleUrls: ['./loan-request-details-update.component.css'],
  standalone: true,
  imports: [RouterModule, MatTableModule, MatPaginatorModule, MatButtonModule, MatInputModule, FormsModule, MatFormFieldModule, CommonModule],
})
export class LoanRequestDetailsUpdateComponent implements OnInit{

  public memberData: any = {
    id: "",
    branch_name: "",
    f_name: "",
    l_name: "",
    email: "",
    fathers_name: "",
    phone_no: "",
    address: "",
    occupation: "",
    dob: "",
    age: "",
    gender: "",
    a_maried: "",
    a_resident: "",
    a_stay_since: "",
    a_house_owner: "",
    a_house_owner_phone: "",
    a_education: "",
    a_temp_address: "",
    a_Depend_family: "",
    

    l_loan_scheme: "",
    l_loan_scheme_intrst: "",
    l_aapply_amount: "",
    l_expected_month: "",
    l_mode_repay: "",
    l_customer_id: "",
    l_share_amt: "",
    l_br_name: "",
    adharNo: "",
    panNo: "",
    l_fresh_loan: "",
    l_last_loan_amt: "",
    l_last_purpose: "",
    l_deposit_acNo: "",
    l_deposit_balance: "",
    l_deposit_scheme: "",
    l_deposit_status: "",
    l_deposit_maturity: null,

    l_deposit_acNo1: "",
    l_deposit_balance1: "",
    l_deposit_scheme1: "",
    l_deposit_status1: "",
    l_deposit_maturity1: null,

    l_deposit_acNo2: "",
    l_deposit_balance2: "",
    l_deposit_scheme2: "",
    l_deposit_status2: "",
    l_deposit_maturity2: null,

    l_deposit_acNo3: "",
    l_deposit_balance3: "",
    l_deposit_scheme3: "",
    l_deposit_status3: "",
    l_deposit_maturity3: null,
    l_deposit_acN4: "",
    l_deposit_balance4: "",
    l_deposit_schem4: "",
    l_deposit_statu4: "",
    l_deposit_maturit4: null,
    l_employee_type: "",
    l_emp_emp_type: "",
    l_emp_mode_salary: "",
    l_emp_net_salary: "",
    l_emp_othr_incm: "",
    l_self_bsns_type: "",
    l_self_bsns_start: null,
    l_self_prfsn: "",
    l_self_practice_start: null,
    l_emp_anual_incm: "",
    l_emp_anual_expnd: "",
    l_emp_net_income: "",
    l_self_reg_no: "",
    l_emp_name: "",
    l_emp_loan_amnt: "",
    l_emp_emi: "",
    l_emp_balance: "",
    l_emp_startDate: null,
    l_emp_name1: "",
    l_emp_loan_amnt1: "",
    l_emp_emi1: "",
    l_emp_balance1: "",
    l_emp_startDate1: null,
    l_emp_name2: "",
    l_emp_loan_amnt2: "",
    l_emp_emi2: "",
    l_emp_balance2: "",
    l_emp_startDate2: null,
    l_emp_name3: "",
    l_emp_loan_amnt3: "",
    l_emp_emi3: "",
    l_emp_balance3: "",
    l_emp_startDate3: null,
    l_emp_name4: "",
    l_emp_loan_amnt4: "",
    l_emp_emi4: "",
    l_emp_balance4: "",
    l_emp_startDate4: null,
    l_make: "",
    l_model: "",
    l_colour: "",
    l_engine_no: "",
    l_chassis_no: "",
    l_goods_type: "",
    l_brand_name: "",
    l_model_no: "",
    l_goods_colour: "",
    l_warrentee: "",
    l_ac_name: "",
    l_ac_type: "",
    l_ac_no: "",
    l_ac_ifsc: "",
    l_ac_bankName: "",
    l_ac_brName: "",

    g_f_name: "",
    g_email: "",
    g_fathers_name: "",
    g_phone_no: "",
    g_address: "",
    g_occupation: "",
    g_dob: "",
    g_gender: "",
    g_maried: "",
    g_resident: "",
    g_house_owner: "",
    g_house_owner_phone: "",
    g_stay_since: "",
    g_edu: "",
    g_temp_address: "",
    g_Depend_family: "",
    g_ac_no: "",
    g_br_name: "",
    g_scheme: "",
    g_start: "",
    g_customer_id: "",
    g_end: "",
    g_total_amnt: "",
    g_csp_msp: "",
    g_adharNo: "",
    g_panNo: "",
    g_employee_type: "",
    g_emp_emp_type: "",
    g_emp_mode_salary: "",
    g_emp_net_salary: "",
    g_emp_othr_incm: "",
    g_self_bsns_type: "",
    g_self_bsns_start: null,
    g_self_prfsn: "",
    g_self_practice_start: null,
    g_self_anual_incm: "",
    g_self_anual_expnd: "",
    g_self_net_income: "",
    g_LA_name: "",
    g_LA_loan_amnt: "",
    g_LA_emi: "",
    g_LA_balance: "",
    g_LA_startDate: null,
    g_LA_name1: "",
    g_LA_loan_amnt1: "",
    g_LA_emi1: "",
    g_LA_balance1: "",
    g_LA_startDate1: null,
    g_LA_name2: "",
    g_LA_loan_amnt2: "",
    g_LA_emi2: "",
    g_LA_balance2: "",
    g_LA_startDate2: null,
    g_LA_name3: "",
    g_LA_loan_amnt3: "",
    g_LA_emi3: "",
    g_LA_balance3: "",
    g_LA_startDate3: null,
    g_LA_name4: "",
    g_LA_loan_amnt4: "",
    g_LA_emi4: "",
    g_LA_balance4: "",
    g_LA_startDate4: null,

    n_nominee_name: "",
    n_fathers_name: "",
    n_dob: "",
    n_gender: "",
    n_adhar: "",
    n_pnone_no: "",
    n_pan: "",
    n_email: "",
    n_address: "",
    n_relation: "",
    n_margin: "",
    n_margin_qty: "",
    n_margin_value: "",
    n_gold: "",
    n_gold_qty: "",
    n_gold_value: "",
    n_land: "",
    n_land_qty: "",
    n_land_value: "",
    n_land_buildings: "",
    n_land_buildings_qty: "",
    n_land_buildings_value: "",

    c_bank_name: "",
    c_br_name: "",
    c_account: "",
    c_name_in_ac: "",
    c_micr: "",
    c_ck_leave: "",
    c_commencement: "",
    c_ck_number: "",
    c_ck_amnt: "",

    msp_name: "",
    msp_nick_name: "",
    msp_permanent_rsd: "",
    msp_temporary_rsd: "",
    msp_resident: "",
    msp_bsns_resident: "",
    msp_bsns_type: "",
    msp_knwn_since: "",
    msp_owner_bsns: "",
    msp_bsns_coFndr: "",
    msp_estbls_name: "",
    msp_mltpl_bsns: "",
    msp_stock_value: "",
    msp_size_bsns: "",
    membershipId: "",
    msp_reg_deposit: "",
    msp_reg_deposit_bsns: "",
    msp_intrst_savings: "",
    msp_reg_intrst_loan: "",
    msp_aprx_incm: "",
    msp_cordnt: "",
    msp_behaviour: "",
    msp_inters_us: "",
    msp_service_satisfied: "",
    msp_thnk_abt_us: "",
    msp_criminal_hstry: "",
    msp_financ_knwldg: "",
    msp_mind_belief: "",
    msp_literate: "",
    msp_code: "",
    msp_branch_name: "",
    msp_apply_date: "",
    msp_place: "",

    userId: "",
    brunchId: "",

    purpose: "",
    introducer: "",
    introducer_id: "",
    class: "",
    classPrice: "",
    classAdminFee: 50,
    nomineeName: "",
    nomineeDOB: "",
    nomineeGender: "",
    nomineePhnoe: "",
    nomineeRelation: "",
    opening_balance: "",
    type: "",
    scheme: "",
    dep_period: "",
    dep_frequency: "",
    startDate: "",
    endDate: "",
    first_instlmnt: "",
    openingFee: "",
    brName: "",
    csp_msp: "",
    ac_name: "",
    ac_type: "",
    ac_no: "",
    ac_ifsc: "",
    ac_bankName: "",
    ac_brName: "",
    account_no: "",
    status: "",
    acCount: "",
  }
  
  public reference_number: any;

  public acceptfileType: string = "image";

  public l_ac_incm_proof: string = "Choose File";
  public l_ac_bank_stmnt: string = "Choose File";
  public l_ac_occupation_proof: string = "Choose File";

  public g_ac_photo: string = "Choose File";
  public g_ac_id: string = "Choose File";
  public g_ac_sign: string = "Choose File";
  public g_ac_address: string = "Choose File";
  public g_ac_fs: string = "Choose File";

  public n_ac_photo: string = "Choose File";
  public n_ac_id: string = "Choose File";
  public n_ac_sign: string = "Choose File";
  public n_ac_address: string = "Choose File";
  public n_ac_fs: string = "Choose File";

  public uploadImageObjectIncm: any = {
    panImg: '',
    adharImg: ''
  }

  public uploadImageObjectBnkStmnt: any = {
    panImg: '',
    adharImg: ''
  }
  public uploadImageObjectOccPrf: any = {
    panImg: '',
    adharImg: ''
  }

  public uploadImageObjectGphoto: any = {
    panImg: '',
    adharImg: ''
  }

  public uploadImageObjectGid: any = {
    panImg: '',
    adharImg: ''
  }
  public uploadImageObjectGsign: any = {
    panImg: '',
    adharImg: ''
  }
  public uploadImageObjectGadrs: any = {
    panImg: '',
    adharImg: ''
  }
  public uploadImageObjectGfs: any = {
    panImg: '',
    adharImg: ''
  }

  public uploadImageObjectNphoto: any = {
    panImg: '',
    adharImg: ''
  }

  public uploadImageObjectNid: any = {
    panImg: '',
    adharImg: ''
  }
  public uploadImageObjectNsign: any = {
    panImg: '',
    adharImg: ''
  }
  public uploadImageObjectNadrs: any = {
    panImg: '',
    adharImg: ''
  }
  public uploadImageObjectNfs: any = {
    panImg: '',
    adharImg: ''
  }



  public inputForm: boolean = true;
  public uploadForm: boolean = false;


public successIncm: boolean = false;
public successStmnt: boolean = false;
public successOccu: boolean = false;
public successGphoto: boolean = false;
public successGid: boolean = false;
public successGsign: boolean = false;
public successGadrs: boolean = false;
public successGfs: boolean = false;
public successNphoto: boolean = false;
public successNid: boolean = false;
public successNsign: boolean = false;
public successNadrs: boolean = false;
public successNfs: boolean = false;


public finalBtn: boolean = false;



  // public memberData: any = {};

  public branchData: any;

  public finalSubmit: boolean = false;

  public returnMsg: any;

  public isLodaing = true;
  public rqstId: any;
  public user: any;
  public userId: any;
  public brunchId: any;
  public brunchDetails: any;
  public endpoint: any;
  public myDate: any = new Date();


  constructor(
    private spinner: NgxSpinnerService,
    private LoanRequestDetailsUpdateService: LoanRequestDetailsUpdateService,
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
    this.getmemberDataById();
    this.getBrunch();
  }

  spiner() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 5000);
  }

  getmemberDataById() {
    this.isLodaing = true;
    this.spiner();
    this.LoanRequestDetailsUpdateService.LoanDataById(this.rqstId, (res: any) => {
      console.log("ResDetails==", res);
      this.isLodaing = false;

      this.memberData.id = res.id;

      this.memberData.full_name = res.full_name;
      this.memberData.apply_amount = res.apply_amount;
      this.memberData.full_name = res.full_name;
      this.memberData.age = res.age;

      this.memberData.a_occupation = res.a_occupation;
      this.memberData.a_maried = res.a_maried;
      this.memberData.a_resident = res.a_resident;
      this.memberData.a_stay_since = res.a_stay_since;
      this.memberData.a_house_owner = res.a_house_owner;
      this.memberData.a_house_owner_phone = res.a_house_owner_phone;
      this.memberData.a_education = res.a_education;
      this.memberData.a_temp_address = res.a_temp_address;
      this.memberData.a_Depend_family = res.a_Depend_family;

      this.memberData.reference_no = res.reference_no;

      this.memberData.fwd_status = res.fwd_status;

      this.memberData.fa_status = res.fa_status;
      this.memberData.apply_date = res.apply_date;
      this.memberData.apply_amount = res.apply_amount;
      this.memberData.loan_status = res.loan_status;
      this.memberData.loan_approve_date = res.loan_approve_date;
      this.memberData.membership_id = res.membership_id;
      this.memberData.brunch_name = res.brunch_name;

      this.memberData.bm_proposed_amnt = res.bm_proposed_amnt;
      this.memberData.bm_status = res.bm_status;
      this.memberData.bm_reason = res.bm_reason;
      this.memberData.bm_fwd_date = res.bm_fwd_date;

      this.memberData.lo_proposed_amnt = res.lo_proposed_amnt;
      this.memberData.lo_status = res.lo_status;
      this.memberData.lo_reason = res.lo_reason;
      this.memberData.lo_fwd_date = res.lo_fwd_date;

      this.memberData.md_proposed_amnt = res.md_proposed_amnt;
      this.memberData.md_status = res.md_status;
      this.memberData.md_reason = res.md_reason;
      this.memberData.md_fwd_date = res.md_fwd_date;

      this.memberData.cm_proposed_amnt = parseInt(res.cm_proposed_amnt);
      this.memberData.cm_status = res.cm_status;
      this.memberData.cm_reason = res.cm_reason;
      this.memberData.cm_fwd_date = res.cm_fwd_date;

      this.memberData.address = res["membership.address"];
      this.memberData.email = res["membership.user.email"];
      this.memberData.memberF_name = res["membership.user.f_name"];
      this.memberData.memberL_name = res["membership.user.l_name"];
      this.memberData.membership_id = res["membership.membership_id"];
      this.memberData.membershipId = res["membership.id"];
      this.memberData.brunch_name = res["membership.brunch.brunch_name"];
      this.memberData.fathers_name = res["membership.fathers_name"];
      this.memberData.phone_no = res["membership.phone_no"];
      this.memberData.gender = res["membership.gender"];
      this.memberData.dob = res["membership.dob"];
      this.memberData.adharNo = res["membership.adharNo"];
      this.memberData.panNo = res["membership.panNo"];

      // images
      this.memberData.panCard = res["membership.panCard"];
      this.memberData.photo = res["membership.photo"];
      this.memberData.sign = res["membership.sign"];
      this.memberData.adharCard = res["membership.adharCard"];

      // docs
      this.memberData.l_income_proof = res["loan_basic_first.l_income_proof"];
      this.memberData.l_bank_stmnt = res["loan_basic_first.l_bank_stmnt"];
      this.memberData.l_occu_proof = res["loan_basic_first.l_occu_proof"];

      this.memberData.g_photo = res["loan_guarantor.g_photo"];
      this.memberData.g_id_proof = res["loan_guarantor.g_id_proof"];
      this.memberData.g_sign = res["loan_guarantor.g_sign"];
      this.memberData.g_address_proof = res["loan_guarantor.g_address_proof"];
      this.memberData.g_FS = res["loan_guarantor.g_FS"];

      this.memberData.n_photo = res["loan_nominee.n_photo"];
      this.memberData.n_id_proof = res["loan_nominee.n_id_proof"];
      this.memberData.n_sign = res["loan_nominee.n_sign"];
      this.memberData.n_address_proof = res["loan_nominee.n_address_proof"];
      this.memberData.n_FS = res["loan_nominee.n_FS"];


      this.memberData.l_loan_scheme = res["loan_basic_first.l_loan_scheme"];
      this.memberData.l_aapply_amount = res["loan_basic_first.l_aapply_amount"];
      this.memberData.l_expected_month = res["loan_basic_first.l_expected_month"];
      this.memberData.l_loan_scheme_intrst = res["loan_basic_first.l_loan_scheme_intrst"];
      this.memberData.l_mode_repay = res["loan_basic_first.l_mode_repay"];
      this.memberData.l_customer_id = res["loan_basic_first.l_customer_id"];
      this.memberData.l_share_amt = res["loan_basic_first.l_share_amt"];
      this.memberData.l_br_name = res["loan_basic_first.l_br_name"];
      this.memberData.l_fresh_loan = res["loan_basic_first.l_fresh_loan"];
      this.memberData.l_last_loan_amt = res["loan_basic_first.l_last_loan_amt"];
      this.memberData.l_last_purpose = res["loan_basic_first.l_last_purpose"];
      this.memberData.l_deposit_acNo = res["loan_basic_first.l_deposit_acNo"];
      this.memberData.l_deposit_balance = parseInt(res["loan_basic_first.l_deposit_balance"]);
      this.memberData.l_deposit_scheme = res["loan_basic_first.l_deposit_scheme"];
      this.memberData.l_deposit_status = res["loan_basic_first.l_deposit_status"];
      this.memberData.l_deposit_maturity = res["loan_basic_first.l_deposit_maturity"];
      this.memberData.l_deposit_acNo1 = res["loan_basic_first.l_deposit_acNo1"];
      this.memberData.l_deposit_balance1 = parseInt(res["loan_basic_first.l_deposit_balance1"]);
      this.memberData.l_deposit_scheme1 = res["loan_basic_first.l_deposit_scheme1"];
      this.memberData.l_deposit_status1 = res["loan_basic_first.l_deposit_status1"];
      this.memberData.l_deposit_maturity1 = res["loan_basic_first.l_deposit_maturity1"];
      this.memberData.l_deposit_acNo2 = res["loan_basic_first.l_deposit_acNo2"];
      this.memberData.l_deposit_balance2 = parseInt(res["loan_basic_first.l_deposit_balance2"]);
      this.memberData.l_deposit_scheme2 = res["loan_basic_first.l_deposit_scheme2"];
      this.memberData.l_deposit_status2 = res["loan_basic_first.l_deposit_status2"];
      this.memberData.l_deposit_maturity2 = res["loan_basic_first.l_deposit_maturity2"];
      this.memberData.l_deposit_acNo3 = res["loan_basic_first.l_deposit_acNo3"];
      this.memberData.l_deposit_balance3 = parseInt(res["loan_basic_first.l_deposit_balance3"]);
      this.memberData.l_deposit_scheme3 = res["loan_basic_first.l_deposit_scheme3"];
      this.memberData.l_deposit_status3 = res["loan_basic_first.l_deposit_status3"];
      this.memberData.l_deposit_maturity3 = res["loan_basic_first.l_deposit_maturity3"];
      this.memberData.l_deposit_acN4 = res["loan_basic_first.l_deposit_acN4"];
      this.memberData.l_deposit_balance4 = parseInt(res["loan_basic_first.l_deposit_balance4"]);
      this.memberData.l_deposit_schem4 = res["loan_basic_first.l_deposit_schem4"];
      this.memberData.l_deposit_statu4 = res["loan_basic_first.l_deposit_statu4"];
      this.memberData.l_deposit_maturit4 = res["loan_basic_first.l_deposit_maturit4"];
      this.memberData.l_goods_type = res["loan_basic_first.l_goods_type"];
      this.memberData.l_brand_name = res["loan_basic_first.l_brand_name"];
      this.memberData.l_model_no = res["loan_basic_first.l_model_no"];
      this.memberData.l_goods_colour = res["loan_basic_first.l_goods_colour"];
      this.memberData.l_warrentee = res["loan_basic_first.l_warrentee"];

      this.memberData.l_balance_sum = (this.memberData.l_deposit_balance || 0) + (this.memberData.l_deposit_balance1 || 0) + (this.memberData.l_deposit_balance2 || 0) + (this.memberData.l_deposit_balance3 || 0) + (this.memberData.l_deposit_balance4 || 0)

     //loan basic form 2
     this.memberData.l_employee_type = res["loan_basic_second.l_employee_type"];
      this.memberData.l_emp_emp_type = res["loan_basic_second.l_emp_emp_type"];
      this.memberData.l_emp_mode_salary = res["loan_basic_second.l_emp_mode_salary"];
      this.memberData.l_emp_net_salary = res["loan_basic_second.l_emp_net_salary"];
      this.memberData.l_emp_othr_incm = res["loan_basic_second.l_emp_othr_incm"];
      this.memberData.l_self_bsns_type = res["loan_basic_second.l_self_bsns_type"];
      this.memberData.l_self_bsns_start = res["loan_basic_second.l_self_bsns_start"];
      this.memberData.l_self_prfsn = res["loan_basic_second.l_self_prfsn"];
      this.memberData.l_self_practice_start = res["loan_basic_second.l_self_practice_start"];
      this.memberData.l_emp_anual_incm = res["loan_basic_second.l_emp_anual_incm"];
      this.memberData.l_emp_anual_expnd = res["loan_basic_second.l_emp_anual_expnd"];
      this.memberData.l_emp_net_income = res["loan_basic_second.l_emp_net_income"];
      this.memberData.l_self_reg_no = res["loan_basic_second.l_self_reg_no"];
      this.memberData.l_emp_name = res["loan_basic_second.l_emp_name"];
      this.memberData.l_emp_loan_amnt = parseInt(res["loan_basic_second.l_emp_loan_amnt"]);
      this.memberData.l_emp_emi = parseInt(res["loan_basic_second.l_emp_emi"]);
      this.memberData.l_emp_balance = parseInt(res["loan_basic_second.l_emp_balance"]);
      this.memberData.l_emp_startDate = res["loan_basic_second.l_emp_startDate"];
      this.memberData.l_emp_name1 = res["loan_basic_second.l_emp_name1"];
      this.memberData.l_emp_loan_amnt1 = parseInt(res["loan_basic_second.l_emp_loan_amnt1"]);
      this.memberData.l_emp_emi1 = parseInt(res["loan_basic_second.l_emp_emi1"]);
      this.memberData.l_emp_balance1 = parseInt(res["loan_basic_second.l_emp_balance1"]);
      this.memberData.l_emp_startDate1 = res["loan_basic_second.l_emp_startDate1"];
      this.memberData.l_emp_name2 = res["loan_basic_second.l_emp_name2"];
      this.memberData.l_emp_loan_amnt2 = parseInt(res["loan_basic_second.l_emp_loan_amnt2"]);
      this.memberData.l_emp_emi2 = parseInt(res["loan_basic_second.l_emp_emi2"]);
      this.memberData.l_emp_balance2 = parseInt(res["loan_basic_second.l_emp_balance2"]);
      this.memberData.l_emp_startDate2 = res["loan_basic_second.l_emp_startDate2"];
      this.memberData.l_emp_name3 = res["loan_basic_second.l_emp_name3"];
      this.memberData.l_emp_loan_amnt3 = parseInt(res["loan_basic_second.l_emp_loan_amnt3"]);
      this.memberData.l_emp_emi3 = parseInt(res["loan_basic_second.l_emp_emi3"]);
      this.memberData.l_emp_balance3 = parseInt(res["loan_basic_second.l_emp_balance3"]);
      this.memberData.l_emp_startDate3 = res["loan_basic_second.l_emp_startDate3"];
      this.memberData.l_emp_name4 = res["loan_basic_second.l_emp_name4"];
      this.memberData.l_emp_loan_amnt4 = parseInt(res["loan_basic_second.l_emp_loan_amnt4"]);
      this.memberData.l_emp_emi4 = parseInt(res["loan_basic_second.l_emp_emi4"]);
      this.memberData.l_emp_balance4 = parseInt(res["loan_basic_second.l_emp_balance4"]);
      this.memberData.l_emp_startDate4 = res["loan_basic_second.l_emp_startDate4"];
      this.memberData.l_make = res["loan_basic_second.l_make"];
      this.memberData.l_model = res["loan_basic_second.l_model"];
      this.memberData.l_colour = res["loan_basic_second.l_colour"];
      this.memberData.l_engine_no = res["loan_basic_second.l_engine_no"];
      this.memberData.l_chassis_no = res["loan_basic_second.l_chassis_no"];
      this.memberData.l_ac_name = res["loan_basic_second.l_ac_name"];
      this.memberData.l_ac_type = res["loan_basic_second.l_ac_type"];
      this.memberData.l_ac_no = res["loan_basic_second.l_ac_no"];
      this.memberData.l_ac_ifsc = res["loan_basic_second.l_ac_ifsc"];
      this.memberData.l_ac_bankName = res["loan_basic_second.l_ac_bankName"];
      this.memberData.l_ac_brName = res["loan_basic_second.l_ac_brName"];

      this.memberData.l_emp_loan_amnt_sum = (this.memberData.l_emp_loan_amnt || 0) + (this.memberData.l_emp_loan_amnt1 || 0) + (this.memberData.l_emp_loan_amnt2 || 0) + (this.memberData.l_emp_loan_amnt3 || 0) + (this.memberData.l_emp_loan_amnt4 || 0)

      this.memberData.l_emp_balance_sum = (this.memberData.l_emp_balance || 0) + (this.memberData.l_emp_balance1 || 0) + (this.memberData.l_emp_balance2 || 0) + (this.memberData.l_emp_balance3 || 0) + (this.memberData.l_emp_balance4 || 0)

      this.memberData.l_emp_emi_sum = (this.memberData.l_emp_emi || 0) + (this.memberData.l_emp_emi1 || 0) + (this.memberData.l_emp_emi2 || 0) + (this.memberData.l_emp_emi3 || 0) + (this.memberData.l_emp_emi4 || 0)



      //guarantor
      this.memberData.g_f_name = res["loan_guarantor.g_f_name"];
      this.memberData.g_email = res["loan_guarantor.g_email"];
      this.memberData.g_fathers_name = res["loan_guarantor.g_fathers_name"];
      this.memberData.g_phone_no = res["loan_guarantor.g_phone_no"];
      this.memberData.g_address = res["loan_guarantor.g_address"];
      this.memberData.g_occupation = res["loan_guarantor.g_occupation"];
      this.memberData.g_dob = res["loan_guarantor.g_dob"];
      this.memberData.g_gender = res["loan_guarantor.g_gender"];
      this.memberData.g_maried = res["loan_guarantor.g_maried"];
      this.memberData.g_resident = res["loan_guarantor.g_resident"];
      this.memberData.g_house_owner = res["loan_guarantor.g_house_owner"]; //
      this.memberData.g_house_owner_phone = res["loan_guarantor.g_house_owner_phone"]; //
      this.memberData.g_stay_since = res["loan_guarantor.g_stay_since"];
      this.memberData.g_edu = res["loan_guarantor.g_edu"];
      this.memberData.g_temp_address = res["loan_guarantor.g_temp_address"];
      this.memberData.g_Depend_family = res["loan_guarantor.g_Depend_family"];
      this.memberData.g_ac_no = res["loan_guarantor.g_ac_no"];
      this.memberData.g_br_name = res["loan_guarantor.g_br_name"];
      this.memberData.g_scheme = res["loan_guarantor.g_scheme"];
      this.memberData.g_start = res["loan_guarantor.g_start"];
      this.memberData.g_customer_id = res["loan_guarantor.g_customer_id"];
      this.memberData.g_end = res["loan_guarantor.g_end"];
      this.memberData.g_total_amnt = res["loan_guarantor.g_total_amnt"];
      this.memberData.g_csp_msp = res["loan_guarantor.g_csp_msp"];
      this.memberData.g_adharNo = res["loan_guarantor.g_adharNo"];
      this.memberData.g_panNo = res["loan_guarantor.g_panNo"];
      this.memberData.g_employee_type = res["loan_guarantor.g_employee_type"];
      this.memberData.g_emp_emp_type = res["loan_guarantor.g_emp_emp_type"]; //
      this.memberData.g_emp_mode_salary = res["loan_guarantor.g_emp_mode_salary"];
      this.memberData.g_emp_net_salary = res["loan_guarantor.g_emp_net_salary"];
      this.memberData.g_emp_othr_incm = res["loan_guarantor.g_emp_othr_incm"];
      this.memberData.g_self_bsns_type = res["loan_guarantor.g_self_bsns_type"];
      this.memberData.g_self_bsns_start = res["loan_guarantor.g_self_bsns_start"];
      this.memberData.g_self_prfsn = res["loan_guarantor.g_self_prfsn"];
      this.memberData.g_self_practice_start = res["loan_guarantor.g_self_practice_start"];
      this.memberData.g_self_anual_incm = res["loan_guarantor.g_self_anual_incm"];
      this.memberData.g_self_anual_expnd = res["loan_guarantor.g_self_anual_expnd"];
      this.memberData.g_self_net_income = res["loan_guarantor.g_self_net_income"];
      this.memberData.g_LA_name = res["loan_guarantor.g_LA_name"];
      this.memberData.g_LA_loan_amnt = parseInt(res["loan_guarantor.g_LA_loan_amnt"]);
      this.memberData.g_LA_emi = parseInt(res["loan_guarantor.g_LA_emi"]);
      this.memberData.g_LA_balance = parseInt(res["loan_guarantor.g_LA_balance"]);
      this.memberData.g_LA_startDate = res["loan_guarantor.g_LA_startDate"];
      this.memberData.g_LA_name1 = res["loan_guarantor.g_LA_name1"];
      this.memberData.g_LA_loan_amnt1 = parseInt(res["loan_guarantor.g_LA_loan_amnt1"]);
      this.memberData.g_LA_emi1 = parseInt(res["loan_guarantor.g_LA_emi1"]);
      this.memberData.g_LA_balance1 = parseInt(res["loan_guarantor.g_LA_balance1"]);
      this.memberData.g_LA_startDate1 = res["loan_guarantor.g_LA_startDate1"];
      this.memberData.g_LA_name2 = res["loan_guarantor.g_LA_name2"];
      this.memberData.g_LA_loan_amnt2 = parseInt(res["loan_guarantor.g_LA_loan_amnt2"]);
      this.memberData.g_LA_emi2 = parseInt(res["loan_guarantor.g_LA_emi2"]);
      this.memberData.g_LA_balance2 = parseInt(res["loan_guarantor.g_LA_balance2"]);
      this.memberData.g_LA_startDate2 = res["loan_guarantor.g_LA_startDate2"];
      this.memberData.g_LA_name3 = res["loan_guarantor.g_LA_name3"];
      this.memberData.g_LA_loan_amnt3 = parseInt(res["loan_guarantor.g_LA_loan_amnt3"]);
      this.memberData.g_LA_emi3 = parseInt(res["loan_guarantor.g_LA_emi3"]);
      this.memberData.g_LA_balance3 = parseInt(res["loan_guarantor.g_LA_balance3"]);
      this.memberData.g_LA_startDate3 = res["loan_guarantor.g_LA_startDate3"];
      this.memberData.g_LA_name4 = res["loan_guarantor.g_LA_name4"];
      this.memberData.g_LA_loan_amnt4 = parseInt(res["loan_guarantor.g_LA_loan_amnt4"]);
      this.memberData.g_LA_emi4 = parseInt(res["loan_guarantor.g_LA_emi4"]);
      this.memberData.g_LA_balance4 = parseInt(res["loan_guarantor.g_LA_balance4"]);
      this.memberData.g_LA_startDate4 = res["loan_guarantor.g_LA_startDate4"];

      this.memberData.g_LA_loan_amnt_sum = (this.memberData.g_LA_loan_amnt || 0) + (this.memberData.g_LA_loan_amnt1 || 0) + (this.memberData.g_LA_loan_amnt2 || 0) + (this.memberData.g_LA_loan_amnt3 || 0) + (this.memberData.g_LA_loan_amnt4 || 0)

      this.memberData.g_LA_emi_sum = (this.memberData.g_LA_emi || 0) + (this.memberData.g_LA_emi1 || 0) + (this.memberData.g_LA_emi2 || 0) + (this.memberData.g_LA_emi3 || 0) + (this.memberData.g_LA_emi4 || 0)

      this.memberData.g_LA_balance_sum = (this.memberData.g_LA_balance || 0) + (this.memberData.g_LA_balance1 || 0) + (this.memberData.g_LA_balance2 || 0) + (this.memberData.g_LA_balance3 || 0) + (this.memberData.g_LA_balance4 || 0)

      //post dated
      this.memberData.c_bank_name = res["loan_post_dated.c_bank_name"];
      this.memberData.c_br_name = res["loan_post_dated.c_br_name"];
      this.memberData.c_account = res["loan_post_dated.c_account"];
      this.memberData.c_name_in_ac = res["loan_post_dated.c_name_in_ac"];
      this.memberData.c_micr = res["loan_post_dated.c_micr"];
      this.memberData.c_ck_leave = res["loan_post_dated.c_ck_leave"];
      this.memberData.c_commencement = res["loan_post_dated.c_commencement"];
      this.memberData.c_ck_number = res["loan_post_dated.c_ck_number"];
      this.memberData.c_ck_amnt = res["loan_post_dated.c_ck_amnt"];

      //nominee
      this.memberData.n_nominee_name = res["loan_nominee.n_nominee_name"];
      this.memberData.n_fathers_name = res["loan_nominee.n_fathers_name"];
      this.memberData.n_dob = res["loan_nominee.n_dob"];
      this.memberData.n_gender = res["loan_nominee.n_gender"];
      this.memberData.n_adhar = res["loan_nominee.n_adhar"];
      this.memberData.n_pnone_no = res["loan_nominee.n_pnone_no"];
      this.memberData.n_pan = res["loan_nominee.n_pan"];
      this.memberData.n_email = res["loan_nominee.n_email"];
      this.memberData.n_address = res["loan_nominee.n_address"];
      this.memberData.n_relation = res["loan_nominee.n_relation"];
      this.memberData.n_margin = res["loan_nominee.n_margin"];
      this.memberData.n_margin_qty = res["loan_nominee.n_margin_qty"];
      this.memberData.n_margin_value = res["loan_nominee.n_margin_value"];
      this.memberData.n_gold = res["loan_nominee.n_gold"];
      this.memberData.n_gold_qty = res["loan_nominee.n_gold_qty"];
      this.memberData.n_gold_value = res["loan_nominee.n_gold_value"];
      this.memberData.n_land = res["loan_nominee.n_land"];
      this.memberData.n_land_qty = res["loan_nominee.n_land_qty"];
      this.memberData.n_land_value = res["loan_nominee.n_land_value"];
      this.memberData.n_land_buildings = res["loan_nominee.n_land_buildings"];
      this.memberData.n_land_buildings_qty = res["loan_nominee.n_land_buildings_qty"];
      this.memberData.n_land_buildings_value = res["loan_nominee.n_land_buildings_value"];

      //msp
      this.memberData.msp_name = res["loan_msp.msp_name"];
      this.memberData.msp_nick_name = res["loan_msp.msp_nick_name"];
      this.memberData.msp_permanent_rsd = res["loan_msp.msp_permanent_rsd"];
      this.memberData.msp_temporary_rsd = res["loan_msp.msp_temporary_rsd"];
      this.memberData.msp_resident = res["loan_msp.msp_resident"];
      this.memberData.msp_bsns_resident = res["loan_msp.msp_bsns_resident"];
      this.memberData.msp_bsns_type = res["loan_msp.msp_bsns_type"];
      this.memberData.msp_knwn_since = res["loan_msp.msp_knwn_since"];
      this.memberData.msp_owner_bsns = res["loan_msp.msp_owner_bsns"];
      this.memberData.msp_bsns_coFndr = res["loan_msp.msp_bsns_coFndr"];
      this.memberData.msp_estbls_name = res["loan_msp.msp_estbls_name"];
      this.memberData.msp_mltpl_bsns = res["loan_msp.msp_mltpl_bsns"];
      this.memberData.msp_stock_value = res["loan_msp.msp_stock_value"];
      this.memberData.msp_size_bsns = res["loan_msp.msp_size_bsns"];
      this.memberData.no_of_ac = res["loan_msp.no_of_ac"];
      this.memberData.msp_reg_deposit = res["loan_msp.msp_reg_deposit"];
      this.memberData.msp_reg_deposit_bsns = res["loan_msp.msp_reg_deposit_bsns"];
      this.memberData.msp_intrst_savings = res["loan_msp.msp_intrst_savings"];
      this.memberData.msp_reg_intrst_loan = res["loan_msp.msp_reg_intrst_loan"];
      this.memberData.msp_aprx_incm = res["loan_msp.msp_aprx_incm"];
      this.memberData.msp_cordnt = res["loan_msp.msp_cordnt"];
      this.memberData.msp_behaviour = res["loan_msp.msp_behaviour"];
      this.memberData.msp_inters_us = res["loan_msp.msp_inters_us"];
      this.memberData.msp_service_satisfied = res["loan_msp.msp_service_satisfied"];
      this.memberData.msp_thnk_abt_us = res["loan_msp.msp_thnk_abt_us"];
      this.memberData.msp_criminal_hstry = res["loan_msp.msp_criminal_hstry"];
      this.memberData.msp_financ_knwldg = res["loan_msp.msp_financ_knwldg"]
      this.memberData.msp_mind_belief = res["loan_msp.msp_mind_belief"];
      this.memberData.msp_literate = res["loan_msp.msp_literate"];
      this.memberData.msp_code = res["loan_msp.msp_code"];
      this.memberData.msp_branch_name = res["loan_msp.msp_branch_name"];
      this.memberData.msp_apply_date = res["loan_msp.msp_apply_date"];
      this.memberData.msp_place = res["loan_msp.msp_place"];

      //others
      this.memberData.mss_super_fee = parseInt(res["loan_other.mss_super_fee"]);
      this.memberData.number_of_emi = res["loan_other.number_of_emi"];
      this.memberData.processing_fee = parseInt(res["loan_other.processing_fee"]);
      this.memberData.sanction_no = res["loan_other.sanction_no"];
      this.memberData.Lapsed_eposit = parseInt(res["loan_other.Lapsed_eposit"]);

      this.memberData.amount_of_emi = res["loan_other.amount_of_emi"];
      this.memberData.cheque_leaf_1 = res["loan_other.cheque_leaf_1"];
      this.memberData.cheque_leaf_2 = res["loan_other.cheque_leaf_2"];
      this.memberData.cheque_leaf_3 = res["loan_other.cheque_leaf_3"];
      this.memberData.interest_type = res["loan_other.interest_type"];
      this.memberData.others = parseInt(res["loan_other.others"]);


      this.memberData.total_deduction = (this.memberData.others || 0) + (this.memberData.mss_super_fee || 0) + (this.memberData.processing_fee || 0) + (this.memberData.Lapsed_eposit || 0)

      this.memberData.totalSum = (this.memberData.cm_proposed_amnt || 0) - (this.memberData.total_deduction || 0)
    })
    console.log("memberData",this.memberData);
    

    // // this.checkUpload();
  }

  getBrunch = () => {
    let requestObject = {};

    this.LoanRequestDetailsUpdateService.getBrunch(requestObject, (callback: any) => {
      console.log("getBrunch", callback);
      this.branchData = callback
      console.log("vvvvvvvvvvvvv", this.branchData);
    });
  }


  clearResidentField() {
    console.log("checkkkkkkkkkkkk", this.memberData.a_resident);
    if (this.memberData.a_resident == "Owned") {
      this.memberData.a_house_owner = "";
      this.memberData.a_house_owner_phone = "";
    }
  }

  clearfreshLoanField() {
    console.log("checkkkkkkkkkkkk", this.memberData.l_fresh_loan);
    if (this.memberData.l_fresh_loan == "Yes") {
      this.memberData.l_last_loan_amt = "";
      this.memberData.l_last_purpose = "";
    }
  }

  clearLoanEmpField() {
    console.log("checkkkkkkkkkkkk", this.memberData.l_employee_type);
    if (this.memberData.l_employee_type == "Self Employed") {
      this.memberData.l_emp_emp_type = "";
      this.memberData.l_emp_mode_salary = "";
      this.memberData.l_emp_net_salary = "";
      this.memberData.l_emp_othr_incm = "";
    }
    if (this.memberData.l_employee_type == "Employed") {
      this.memberData.l_self_bsns_type = "";
      this.memberData.l_self_bsns_start = "";
      this.memberData.l_self_prfsn = "";
      this.memberData.l_self_practice_start = "";
      this.memberData.l_self_reg_no = "";
    }
  }

  clearGuarantorsEmpField() {
    console.log("checkkkkkkkkkkkk", this.memberData.g_employee_type);
    if (this.memberData.g_employee_type == "Self Employed") {
      this.memberData.g_emp_emp_type = "";
      this.memberData.g_emp_mode_salary = "";
      this.memberData.g_emp_net_salary = "";
      this.memberData.g_emp_othr_incm = "";
    }
    if (this.memberData.g_employee_type == "Employed") {
      this.memberData.g_self_bsns_type = "";
      this.memberData.g_self_bsns_start = "";
      this.memberData.g_self_prfsn = "";
      this.memberData.g_self_practice_start = "";
    }
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
      
      reference_no: this.reference_number,
      a_occupation  : this.memberData.a_occupation,
      a_maried : this.memberData.a_maried,
      a_resident : this.memberData.a_resident,
      a_stay_since : this.memberData.a_stay_since,
      a_house_owner : this.memberData.a_house_owner,
      a_house_owner_phone : this.memberData.a_house_owner_phone,
      a_education : this.memberData.a_education,
      a_temp_address : this.memberData.a_temp_address,
      a_Depend_family : this.memberData.a_Depend_family,
      l_loan_scheme : this.memberData.l_loan_scheme,
      l_loan_scheme_intrst : this.memberData.l_loan_scheme_intrst,
      l_aapply_amount : this.memberData.l_aapply_amount,
      l_expected_month : this.memberData.l_expected_month,
      l_mode_repay : this.memberData.l_mode_repay,
      l_share_amt : this.memberData.l_share_amt,
      l_fresh_loan : this.memberData.l_fresh_loan,
      l_last_loan_amt : this.memberData.l_last_loan_amt,
      l_last_purpose : this.memberData.l_last_purpose,
      l_deposit_acNo : this.memberData.l_deposit_acNo,
      l_deposit_balance : this.memberData.l_deposit_balance,
      l_deposit_scheme : this.memberData.l_deposit_scheme,
      l_deposit_status : this.memberData.l_deposit_status,
      l_deposit_maturity : this.memberData.l_deposit_maturity,
      l_deposit_acNo1 : this.memberData.l_deposit_acNo1,
      l_deposit_balance1 : this.memberData.l_deposit_balance1,
      l_deposit_scheme1 : this.memberData.l_deposit_scheme1,
      l_deposit_status1 : this.memberData.l_deposit_status1,
      l_deposit_maturity1 : this.memberData.l_deposit_maturity1,
      l_deposit_acNo2 : this.memberData.l_deposit_acNo2,
      l_deposit_balance2 : this.memberData.l_deposit_balance2,
      l_deposit_scheme2 : this.memberData.l_deposit_scheme2,
      l_deposit_status2 : this.memberData.l_deposit_status2,
      l_deposit_maturity2 : this.memberData.l_deposit_maturity2,
      l_deposit_acNo3 : this.memberData.l_deposit_acNo3,
      l_deposit_balance3 : this.memberData.l_deposit_balance3,
      l_deposit_scheme3 : this.memberData.l_deposit_scheme3,
      l_deposit_status3 : this.memberData.l_deposit_status3,
      l_deposit_maturity3 : this.memberData.l_deposit_maturity3,
      l_deposit_acN4 : this.memberData.l_deposit_acN4,
      l_deposit_balance4 : this.memberData.l_deposit_balance4,
      l_deposit_schem4 : this.memberData.l_deposit_schem4,
      l_deposit_statu4 : this.memberData.l_deposit_statu4,
      l_deposit_maturit4 : this.memberData.l_deposit_maturit4,
      l_employee_type : this.memberData.l_employee_type,
      l_emp_emp_type : this.memberData.l_emp_emp_type,
      l_emp_mode_salary : this.memberData.l_emp_mode_salary,
      l_emp_net_salary : this.memberData.l_emp_net_salary,
      l_emp_othr_incm : this.memberData.l_emp_othr_incm,
      l_self_bsns_type : this.memberData.l_self_bsns_type,
      l_self_bsns_start : this.memberData.l_self_bsns_start,
      l_self_prfsn : this.memberData.l_self_prfsn,
      l_self_practice_start : this.memberData.l_self_practice_start,
      l_emp_anual_incm : this.memberData.l_emp_anual_incm,
      l_emp_anual_expnd : this.memberData.l_emp_anual_expnd,
      l_emp_net_income : this.memberData.l_emp_net_income,
      l_self_reg_no : this.memberData.l_self_reg_no,
      l_emp_name : this.memberData.l_emp_name,
      l_emp_loan_amnt : this.memberData.l_emp_loan_amnt,
      l_emp_emi : this.memberData.l_emp_emi,
      l_emp_balance : this.memberData.l_emp_balance,
      l_emp_startDate : this.memberData.l_emp_startDate,
      l_emp_name1 : this.memberData.l_emp_name1,
      l_emp_loan_amnt1 : this.memberData.l_emp_loan_amnt1,
      l_emp_emi1 : this.memberData.l_emp_emi1,
      l_emp_balance1 : this.memberData.l_emp_balance1,
      l_emp_startDate1 : this.memberData.l_emp_startDate1,
      l_emp_name2 : this.memberData.l_emp_name2,
      l_emp_loan_amnt2 : this.memberData.l_emp_loan_amnt2,
      l_emp_emi2 : this.memberData.l_emp_emi2,
      l_emp_balance2 : this.memberData.l_emp_balance2,
      l_emp_startDate2 : this.memberData.l_emp_startDate2,
      l_emp_name3 : this.memberData.l_emp_name3,
      l_emp_loan_amnt3 : this.memberData.l_emp_loan_amnt3,
      l_emp_emi3 : this.memberData.l_emp_emi3,
      l_emp_balance3 : this.memberData.l_emp_balance3,
      l_emp_startDate3 : this.memberData.l_emp_startDate3,
      l_emp_name4 : this.memberData.l_emp_name4,
      l_emp_loan_amnt4 : this.memberData.l_emp_loan_amnt4,
      l_emp_emi4 : this.memberData.l_emp_emi4,
      l_emp_balance4 : this.memberData.l_emp_balance4,
      l_emp_startDate4 : this.memberData.l_emp_startDate4,
      l_make : this.memberData.l_make,
      l_model : this.memberData.l_model,
      l_colour : this.memberData.l_colour,
      l_engine_no : this.memberData.l_engine_no,
      l_chassis_no : this.memberData.l_chassis_no,
      l_goods_type : this.memberData.l_goods_type,
      l_brand_name : this.memberData.l_brand_name,
      l_model_no : this.memberData.l_model_no,
      l_goods_colour : this.memberData.l_goods_colour,
      l_warrentee : this.memberData.l_warrentee,
      l_ac_name : this.memberData.l_ac_name,
      l_ac_type : this.memberData.l_ac_type,
      l_ac_no : this.memberData.l_ac_no,
      l_ac_ifsc : this.memberData.l_ac_ifsc,
      l_ac_bankName : this.memberData.l_ac_bankName,
      l_ac_brName : this.memberData.l_ac_brName,

      g_f_name : this.memberData.g_f_name,
      g_email : this.memberData.g_email,
      g_fathers_name : this.memberData.g_fathers_name,
      g_phone_no : this.memberData.g_phone_no,
      g_address : this.memberData.g_address,
      g_occupation : this.memberData.g_occupation,
      g_dob : this.memberData.g_dob,
      g_gender : this.memberData.g_gender,
      g_maried : this.memberData.g_maried,
      g_resident : this.memberData.g_resident,
      g_house_owner : this.memberData.g_house_owner,
      g_house_owner_phone : this.memberData.g_house_owner_phone,
      g_stay_since : this.memberData.g_stay_since,
      g_edu : this.memberData.g_edu,
      g_temp_address : this.memberData.g_temp_address,
      g_Depend_family : this.memberData.g_Depend_family,
      g_ac_no : this.memberData.g_ac_no,
      g_br_name : this.memberData.g_br_name,
      g_scheme : this.memberData.g_scheme,
      g_start : this.memberData.g_start,
      g_customer_id : this.memberData.g_customer_id,
      g_end : this.memberData.g_end,
      g_total_amnt : this.memberData.g_total_amnt,
      g_csp_msp : this.memberData.g_csp_msp,
      g_adharNo : this.memberData.g_adharNo,
      g_panNo : this.memberData.g_panNo,
      g_employee_type : this.memberData.g_employee_type,
      g_emp_emp_type : this.memberData.g_emp_emp_type,
      g_emp_mode_salary : this.memberData.g_emp_mode_salary,
      g_emp_net_salary : this.memberData.g_emp_net_salary,
      g_emp_othr_incm : this.memberData.g_emp_othr_incm,
      g_self_bsns_type : this.memberData.g_self_bsns_type,
      g_self_bsns_start : this.memberData.g_self_bsns_start,
      g_self_prfsn : this.memberData.g_self_prfsn,
      g_self_practice_start : this.memberData.g_self_practice_start,
      g_self_anual_incm : this.memberData.g_self_anual_incm,
      g_self_anual_expnd : this.memberData.g_self_anual_expnd,
      g_self_net_income : this.memberData.g_self_net_income,
      g_LA_name : this.memberData.g_LA_name,
      g_LA_loan_amnt : this.memberData.g_LA_loan_amnt,
      g_LA_emi : this.memberData.g_LA_emi,
      g_LA_balance : this.memberData.g_LA_balance,
      g_LA_startDate : this.memberData.g_LA_startDate,
      g_LA_name1 : this.memberData.g_LA_name1,
      g_LA_loan_amnt1 : this.memberData.g_LA_loan_amnt1,
      g_LA_emi1 : this.memberData.g_LA_emi1,
      g_LA_balance1 : this.memberData.g_LA_balance1,
      g_LA_startDate1 : this.memberData.g_LA_startDate1,
      g_LA_name2 : this.memberData.g_LA_name2,
      g_LA_loan_amnt2 : this.memberData.g_LA_loan_amnt2,
      g_LA_emi2 : this.memberData.g_LA_emi2,
      g_LA_balance2 : this.memberData.g_LA_balance2,
      g_LA_startDate2 : this.memberData.g_LA_startDate2,
      g_LA_name3 : this.memberData.g_LA_name3,
      g_LA_loan_amnt3 : this.memberData.g_LA_loan_amnt3,
      g_LA_emi3 : this.memberData.g_LA_emi3,
      g_LA_balance3 : this.memberData.g_LA_balance3,
      g_LA_startDate3 : this.memberData.g_LA_startDate3,
      g_LA_name4 : this.memberData.g_LA_name4,
      g_LA_loan_amnt4 : this.memberData.g_LA_loan_amnt4,
      g_LA_emi4 : this.memberData.g_LA_emi4,
      g_LA_balance4 : this.memberData.g_LA_balance4,
      g_LA_startDate4 : this.memberData.g_LA_startDate4,

      n_nominee_name : this.memberData.n_nominee_name,
      n_fathers_name : this.memberData.n_fathers_name,
      n_dob : this.memberData.n_dob,
      n_gender : this.memberData.n_gender,
      n_adhar : this.memberData.n_adhar,
      n_pnone_no : this.memberData.n_pnone_no,
      n_pan : this.memberData.n_pan,
      n_email : this.memberData.n_email,
      n_address : this.memberData.n_address,
      n_relation : this.memberData.n_relation,
      n_margin : this.memberData.n_margin,
      n_margin_qty : this.memberData.n_margin_qty,
      n_margin_value : this.memberData.n_margin_value,
      n_gold : this.memberData.n_gold,
      n_gold_qty : this.memberData.n_gold_qty,
      n_gold_value : this.memberData.n_gold_value,
      n_land : this.memberData.n_land,
      n_land_qty : this.memberData.n_land_qty,
      n_land_value : this.memberData.n_land_value,
      n_land_buildings : this.memberData.n_land_buildings,
      n_land_buildings_qty : this.memberData.n_land_buildings_qty,
      n_land_buildings_value : this.memberData.n_land_buildings_value,

      c_bank_name : this.memberData.c_bank_name,
      c_br_name : this.memberData.c_br_name,
      c_account : this.memberData.c_account,
      c_name_in_ac : this.memberData.c_name_in_ac,
      c_micr : this.memberData.c_micr,
      c_ck_leave : this.memberData.c_ck_leave,
      c_commencement : this.memberData.c_commencement,
      c_ck_number : this.memberData.c_ck_number,
      c_ck_amnt : this.memberData.c_ck_amnt,

      msp_name : this.memberData.msp_name,
      msp_nick_name : this.memberData.msp_nick_name,
      msp_permanent_rsd : this.memberData.msp_permanent_rsd,
      msp_temporary_rsd : this.memberData.msp_temporary_rsd,
      msp_resident : this.memberData.msp_resident,
      msp_bsns_resident : this.memberData.msp_bsns_resident,
      msp_bsns_type : this.memberData.msp_bsns_type,
      msp_knwn_since : this.memberData.msp_knwn_since,
      msp_owner_bsns : this.memberData.msp_owner_bsns,
      msp_bsns_coFndr : this.memberData.msp_bsns_coFndr,
      msp_estbls_name : this.memberData.msp_estbls_name,
      msp_mltpl_bsns : this.memberData.msp_mltpl_bsns,
      msp_stock_value : this.memberData.msp_stock_value,
      msp_size_bsns : this.memberData.msp_size_bsns,
      msp_reg_deposit : this.memberData.msp_reg_deposit,
      msp_reg_deposit_bsns : this.memberData.msp_reg_deposit_bsns,
      msp_intrst_savings : this.memberData.msp_intrst_savings,
      msp_reg_intrst_loan : this.memberData.msp_reg_intrst_loan,
      msp_aprx_incm : this.memberData.msp_aprx_incm,
      msp_cordnt : this.memberData.msp_cordnt,
      msp_behaviour : this.memberData.msp_behaviour,
      msp_inters_us : this.memberData.msp_inters_us,
      msp_service_satisfied : this.memberData.msp_service_satisfied,
      msp_thnk_abt_us : this.memberData.msp_thnk_abt_us,
      msp_criminal_hstry : this.memberData.msp_criminal_hstry,
      msp_financ_knwldg : this.memberData.msp_financ_knwldg,
      msp_mind_belief : this.memberData.msp_mind_belief,
      msp_literate : this.memberData.msp_literate,
      msp_place : this.memberData.msp_place

    }
    this.spiner();
    console.log("input data", requestObject);
    let formValidate = this.validateInputs();
    if (formValidate) {
    this.LoanRequestDetailsUpdateService.updateLoanData(requestObject, (res: any) => {
      this.isLodaing = false;
      // let ele:any = document.getElementById('modalClose');
      // ele.click();
      console.log("dbIddbIddbIddbId", res.id);

      // this.inputForm = false;
      // this.uploadForm = true;
      this.getmemberDataById();
    });
  }
  }


  //for income proof
  onFileSelectedIncm(event: any) {
    console.log(event.target.files[0].size);
    if (event.target.files.length > 0 && event.target.files[0].size < 200000) {
      this.uploadImageObjectIncm.l_ac_incm_proof = event.target.files[0];
      var fileExtension = '.' + event.target.files[0].name.split('.')[1];
      var name = "INCM_PRF_" + this.convertDate() + fileExtension;
      var blob = event.target.files[0].slice(0, event.target.files[0].size, event.target.files[0].type);
      var newFile = new File([blob], name, { type: event.target.files[0].type });
      this.uploadImageObjectIncm.image = newFile;
      this.l_ac_incm_proof = this.uploadImageObjectIncm.l_ac_incm_proof
        ? this.uploadImageObjectIncm.l_ac_incm_proof["name"]
        : "Choose File";
      console.log("imgObject===", this.uploadImageObjectIncm);
    } else {
      this.toastr.error('Image size should be less than 200kb', 'Error', {
        disableTimeOut: false
      });
    }
    return true;
  };

  uploadIncm() {
    console.log("Uploading Income proof", this.uploadImageObjectIncm);
    let isValid = this.validateIncm();
    if (isValid) {
      this.isAllowedFile(this.uploadImageObjectIncm.image, (res: any) => {
        console.log("res", res);
        if (res == true) {
          this.isLodaing = true;
          this.spiner();
          console.log("input data", this.uploadImageObjectIncm);
          // if (this.selectedMember.id != '') {
          // console.log("update", this.selectedMember.id);

          const formData = new FormData();



          formData.append("dbid", this.rqstId);
          formData.append("userId", this.memberData.membershipId);
          formData.append("file", this.uploadImageObjectIncm.image);
          console.log("FORMDATA===", formData);
          console.log("dbid===", this.rqstId);
          this.LoanRequestDetailsUpdateService.uploadIncmrFile(
            formData, (response: any) => {
              this.isLodaing = false;
              this.successIncm = true;
              this.getmemberDataById();
              // this.checkUpload();
              this.returnMsg = response.message;
              console.log("lllllllllll", this.returnMsg);
            }
          );

        } else {
          this.toastr.error('Invalid file', 'Error', {
            disableTimeOut: false
          });
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
      this.toastr.warning('Please select photo', 'Warning', {
        disableTimeOut: false
      });
      return false;
    }
    return true;
  }


  //for Bank Statement
  onFileSelectedBankStmnt(event: any) {
    console.log(event.target.files[0].size);
    if (event.target.files.length > 0 && event.target.files[0].size < 2000000) {
      this.uploadImageObjectBnkStmnt.l_ac_bank_stmnt = event.target.files[0];

      var fileExtension = '.' + event.target.files[0].name.split('.')[1];

      var name = "BANK_STMNT_" + this.convertDate() + fileExtension;

      var blob = event.target.files[0].slice(0, event.target.files[0].size, event.target.files[0].type);

      var newFile = new File([blob], name, { type: event.target.files[0].type });
      this.uploadImageObjectBnkStmnt.image = newFile;




      this.l_ac_bank_stmnt = this.uploadImageObjectBnkStmnt.l_ac_bank_stmnt
        ? this.uploadImageObjectBnkStmnt.l_ac_bank_stmnt["name"]
        : "Choose File";
      console.log("imgObject===", this.uploadImageObjectBnkStmnt);
    } else {
      this.toastr.error('Image size should be less than 2 MB', 'Error', {
        disableTimeOut: false
      });
    }
    return true;
  };


  uploadBnkStmnt() {
    console.log("Uploading Income proof", this.uploadImageObjectBnkStmnt);
    let isValid = this.validateBnkStmnt();
    if (isValid) {
      this.isAllowedFilePdf(this.uploadImageObjectBnkStmnt.image, (res: any) => {
        console.log("res", res);
        if (res == true) {
          this.isLodaing = true;
          this.spiner();
          console.log("input data", this.uploadImageObjectBnkStmnt);
          // if (this.selectedMember.id != '') {
          // console.log("update", this.selectedMember.id);

          const formData = new FormData();



          formData.append("dbid", this.rqstId);
          formData.append("userId", this.memberData.membershipId);
          formData.append("file", this.uploadImageObjectBnkStmnt.image);
          console.log("FORMDATA===", formData);
          console.log("dbid===", this.rqstId);
          this.LoanRequestDetailsUpdateService.uploadBankStmntFile(
            formData, (response: any) => {
              this.isLodaing = false;
              this.successStmnt =true;
              this.getmemberDataById();
              // this.checkUpload();
              this.returnMsg = response.message;
              console.log("lllllllllll", this.returnMsg);
            }
          );

        } else {
          this.toastr.error('Invalid file', 'Error', {
            disableTimeOut: false
          });
        }
      })
    } else {
      this.toastr.error('Invalid image file', 'Error', {
        disableTimeOut: false
      });
    }
  }

  validateBnkStmnt = () => {
    console.log("vvvvvvvv", this.uploadImageObjectBnkStmnt.image);

    if (this.uploadImageObjectBnkStmnt.image === '' || this.uploadImageObjectBnkStmnt.image === null || this.uploadImageObjectBnkStmnt.image === undefined) {
      this.toastr.warning('Please select photo', 'Warning', {
        disableTimeOut: false
      });
      return false;
    }
    return true;
  }



  //for Occupation proof
  onFileSelectedOccPrf(event: any) {
    console.log(event.target.files[0].size);
    if (event.target.files.length > 0 && event.target.files[0].size < 200000) {
      this.uploadImageObjectOccPrf.l_ac_occupation_proof = event.target.files[0];

      var fileExtension = '.' + event.target.files[0].name.split('.')[1];

      var name = "OCCU_" + this.convertDate() + fileExtension;

      var blob = event.target.files[0].slice(0, event.target.files[0].size, event.target.files[0].type);

      var newFile = new File([blob], name, { type: event.target.files[0].type });
      this.uploadImageObjectOccPrf.image = newFile;




      this.l_ac_occupation_proof = this.uploadImageObjectOccPrf.l_ac_occupation_proof
        ? this.uploadImageObjectOccPrf.l_ac_occupation_proof["name"]
        : "Choose File";
      console.log("imgObject===", this.uploadImageObjectOccPrf);
    } else {
      this.toastr.error('Image size should be less than 200kb', 'Error', {
        disableTimeOut: false
      });
    }
    return true;
  };


  uploadOccPrf() {
    console.log("Uploading Income proof", this.uploadImageObjectOccPrf);
    let isValid = this.validateOccPrf();
    if (isValid) {
      this.isAllowedFile(this.uploadImageObjectOccPrf.image, (res: any) => {
        console.log("res", res);
        if (res == true) {
          this.isLodaing = true;
          this.spiner();
          console.log("input data", this.uploadImageObjectOccPrf);
          // if (this.selectedMember.id != '') {
          // console.log("update", this.selectedMember.id);

          const formData = new FormData();



          formData.append("dbid", this.rqstId);
          formData.append("userId", this.memberData.membershipId);
          formData.append("file", this.uploadImageObjectOccPrf.image);
          console.log("FORMDATA===", formData);
          console.log("dbid===", this.rqstId);
          this.LoanRequestDetailsUpdateService.uploadOccPrfFile(
            formData, (response: any) => {
              this.isLodaing = false;
              this.successOccu = true;
              this.getmemberDataById();
              // this.checkUpload();
              this.returnMsg = response.message;
              console.log("lllllllllll", this.returnMsg);
            }
          );

        } else {
          this.toastr.error('Invalid file', 'Error', {
            disableTimeOut: false
          });
        }
      })
    } else {
      this.toastr.error('Invalid image file', 'Error', {
        disableTimeOut: false
      });
    }
  }

  validateOccPrf = () => {
    console.log("vvvvvvvv", this.uploadImageObjectOccPrf.image);

    if (this.uploadImageObjectOccPrf.image === '' || this.uploadImageObjectOccPrf.image === null || this.uploadImageObjectOccPrf.image === undefined) {
      this.toastr.warning('Please select photo', 'Warning', {
        disableTimeOut: false
      });
      return false;
    }
    return true;
  }



  //for Guarantor photo
  onFileSelectedGphoto(event: any) {
    console.log(event.target.files[0].size);
    if (event.target.files.length > 0 && event.target.files[0].size < 200000) {
      this.uploadImageObjectGphoto.g_ac_photo = event.target.files[0];

      var fileExtension = '.' + event.target.files[0].name.split('.')[1];

      var name = "G_PHOTO_" + this.convertDate() + fileExtension;

      var blob = event.target.files[0].slice(0, event.target.files[0].size, event.target.files[0].type);

      var newFile = new File([blob], name, { type: event.target.files[0].type });
      this.uploadImageObjectGphoto.image = newFile;




      this.g_ac_photo = this.uploadImageObjectGphoto.g_ac_photo
        ? this.uploadImageObjectGphoto.g_ac_photo["name"]
        : "Choose File";
      console.log("imgObject===", this.uploadImageObjectGphoto);
    } else {
      this.toastr.error('Image size should be less than 200kb', 'Error', {
        disableTimeOut: false
      });
    }
    return true;
  };


  uploadGphoto() {
    console.log("Uploading Income proof", this.uploadImageObjectGphoto);
    let isValid = this.validateGphoto();
    if (isValid) {
      this.isAllowedFile(this.uploadImageObjectGphoto.image, (res: any) => {
        console.log("res", res);
        if (res == true) {
          this.isLodaing = true;
          this.spiner();
          console.log("input data", this.uploadImageObjectGphoto);
          // if (this.selectedMember.id != '') {
          // console.log("update", this.selectedMember.id);

          const formData = new FormData();



          formData.append("dbid", this.rqstId);
          formData.append("userId", this.memberData.membershipId);
          formData.append("file", this.uploadImageObjectGphoto.image);
          console.log("FORMDATA===", formData);
          this.LoanRequestDetailsUpdateService.uploadGphotoFile(
            formData, (response: any) => {
              this.isLodaing = false;
              this.successGphoto = true;
              this.getmemberDataById();
              // this.checkUpload();
              this.returnMsg = response.message;
              console.log("lllllllllll", this.returnMsg);
            }
          );

        } else {
          this.toastr.error('Invalid file', 'Error', {
            disableTimeOut: false
          });
        }
      })
    } else {
      this.toastr.error('Invalid image file', 'Error', {
        disableTimeOut: false
      });
    }
  }


  validateGphoto = () => {
    console.log("vvvvvvvv", this.uploadImageObjectGphoto.image);

    if (this.uploadImageObjectGphoto.image === '' || this.uploadImageObjectGphoto.image === null || this.uploadImageObjectGphoto.image === undefined) {
      this.toastr.warning('Please select photo', 'Warning', {
        disableTimeOut: false
      });
      return false;
    }
    return true;
  }


  //for Guarantor ID PROOF
  onFileSelectedGid(event: any) {
    console.log(event.target.files[0].size);
    if (event.target.files.length > 0 && event.target.files[0].size < 200000) {
      this.uploadImageObjectGid.g_ac_id = event.target.files[0];

      var fileExtension = '.' + event.target.files[0].name.split('.')[1];

      var name = "G_ID_" + this.convertDate() + fileExtension;

      var blob = event.target.files[0].slice(0, event.target.files[0].size, event.target.files[0].type);

      var newFile = new File([blob], name, { type: event.target.files[0].type });
      this.uploadImageObjectGid.image = newFile;




      this.g_ac_id = this.uploadImageObjectGid.g_ac_id
        ? this.uploadImageObjectGid.g_ac_id["name"]
        : "Choose File";
      console.log("imgObject===", this.uploadImageObjectGid);
    } else {
      this.toastr.error('Image size should be less than 200kb', 'Error', {
        disableTimeOut: false
      });
    }
    return true;
  };


  uploadGid() {
    console.log("Uploading Income proof", this.uploadImageObjectGid);
    let isValid = this.validateGid();
    if (isValid) {
      this.isAllowedFile(this.uploadImageObjectGid.image, (res: any) => {
        console.log("res", res);
        if (res == true) {
          this.isLodaing = true;
          this.spiner();
          console.log("input data", this.uploadImageObjectGid);
          // if (this.selectedMember.id != '') {
          // console.log("update", this.selectedMember.id);

          const formData = new FormData();



          formData.append("dbid", this.rqstId);
          formData.append("userId", this.memberData.membershipId);
          formData.append("file", this.uploadImageObjectGid.image);
          console.log("FORMDATA===", formData);
          this.LoanRequestDetailsUpdateService.uploadGidFile(
            formData, (response: any) => {
              this.isLodaing = false;
              this.successGid = true;
              this.getmemberDataById();
              // this.checkUpload();
              this.returnMsg = response.message;
              console.log("lllllllllll", this.returnMsg);
            }
          );

        } else {
          this.toastr.error('Invalid file', 'Error', {
            disableTimeOut: false
          });
        }
      })
    } else {
      this.toastr.error('Invalid image file', 'Error', {
        disableTimeOut: false
      });
    }
  }

  validateGid = () => {
    console.log("vvvvvvvv", this.uploadImageObjectGid.image);

    if (this.uploadImageObjectGid.image === '' || this.uploadImageObjectGid.image === null || this.uploadImageObjectGid.image === undefined) {
      this.toastr.warning('Please select photo', 'Warning', {
        disableTimeOut: false
      });
      return false;
    }
    return true;
  }


  //for Guarantor sign
  onFileSelectedGsign(event: any) {
    console.log(event.target.files[0].size);
    if (event.target.files.length > 0 && event.target.files[0].size < 200000) {
      this.uploadImageObjectGsign.g_ac_sign = event.target.files[0];

      var fileExtension = '.' + event.target.files[0].name.split('.')[1];

      var name = "G_SIGN_" + this.convertDate() + fileExtension;

      var blob = event.target.files[0].slice(0, event.target.files[0].size, event.target.files[0].type);

      var newFile = new File([blob], name, { type: event.target.files[0].type });
      this.uploadImageObjectGsign.image = newFile;

      this.g_ac_sign = this.uploadImageObjectGsign.g_ac_sign
        ? this.uploadImageObjectGsign.g_ac_sign["name"]
        : "Choose File";
      console.log("imgObject===", this.uploadImageObjectGsign);
    } else {
      this.toastr.error('Image size should be less than 200kb', 'Error', {
        disableTimeOut: false
      });
    }
    return true;
  };


  uploadGsign() {
    console.log("Uploading Income proof", this.uploadImageObjectGsign);
    let isValid = this.validateGsign();
    if (isValid) {
      this.isAllowedFile(this.uploadImageObjectGsign.image, (res: any) => {
        console.log("res", res);
        if (res == true) {
          this.isLodaing = true;
          this.spiner();
          console.log("input data", this.uploadImageObjectGsign);
          const formData = new FormData();
          formData.append("dbid", this.rqstId);
          formData.append("userId", this.memberData.membershipId);
          formData.append("file", this.uploadImageObjectGsign.image);
          console.log("FORMDATA===", formData);
          this.LoanRequestDetailsUpdateService.uploadGsignFile(
            formData, (response: any) => {
              this.isLodaing = false;
              this.successGsign = true;
              this.getmemberDataById();
              // this.checkUpload();
              this.returnMsg = response.message;
              console.log("lllllllllll", this.returnMsg);
            }
          );

        } else {
          this.toastr.error('Invalid file', 'Error', {
            disableTimeOut: false
          });
        }
      })
    } else {
      this.toastr.error('Invalid image file', 'Error', {
        disableTimeOut: false
      });
    }
  }

  validateGsign = () => {
    console.log("vvvvvvvv", this.uploadImageObjectGsign.image);

    if (this.uploadImageObjectGsign.image === '' || this.uploadImageObjectGsign.image === null || this.uploadImageObjectGsign.image === undefined) {
      this.toastr.warning('Please select photo', 'Warning', {
        disableTimeOut: false
      });
      return false;
    }
    return true;
  }


  //for Guarantor address
  onFileSelectedGadrs(event: any) {
    console.log(event.target.files[0].size);
    if (event.target.files.length > 0 && event.target.files[0].size < 200000) {
      this.uploadImageObjectGadrs.g_ac_address = event.target.files[0];

      var fileExtension = '.' + event.target.files[0].name.split('.')[1];

      var name = "G_ADRS_" + this.convertDate() + fileExtension;

      var blob = event.target.files[0].slice(0, event.target.files[0].size, event.target.files[0].type);

      var newFile = new File([blob], name, { type: event.target.files[0].type });
      this.uploadImageObjectGadrs.image = newFile;

      this.g_ac_address = this.uploadImageObjectGadrs.g_ac_address
        ? this.uploadImageObjectGadrs.g_ac_address["name"]
        : "Choose File";
      console.log("imgObject===", this.uploadImageObjectGadrs);
    } else {
      this.toastr.error('Image size should be less than 200kb', 'Error', {
        disableTimeOut: false
      });
    }
    return true;
  };


  uploadGadrs() {
    console.log("Uploading Income proof", this.uploadImageObjectGadrs);
    let isValid = this.validateGadrs();
    if (isValid) {
      this.isAllowedFile(this.uploadImageObjectGadrs.image, (res: any) => {
        console.log("res", res);
        if (res == true) {
          this.isLodaing = true;
          this.spiner();
          console.log("input data", this.uploadImageObjectGadrs);
          const formData = new FormData();
          formData.append("dbid", this.rqstId);
          formData.append("userId", this.memberData.membershipId);
          formData.append("file", this.uploadImageObjectGadrs.image);
          console.log("FORMDATA===", formData);
          this.LoanRequestDetailsUpdateService.uploadGadrsFile(
            formData, (response: any) => {
              this.isLodaing = false;
              this.successGadrs = true;
              this.getmemberDataById();
              // this.checkUpload();
              this.returnMsg = response.message;
              console.log("lllllllllll", this.returnMsg);
            }
          );

        } else {
          this.toastr.error('Invalid file', 'Error', {
            disableTimeOut: false
          });
        }
      })
    } else {
      this.toastr.error('Invalid image file', 'Error', {
        disableTimeOut: false
      });
    }
  }

  validateGadrs = () => {
    console.log("vvvvvvvv", this.uploadImageObjectGadrs.image);

    if (this.uploadImageObjectGadrs.image === '' || this.uploadImageObjectGadrs.image === null || this.uploadImageObjectGadrs.image === undefined) {
      this.toastr.warning('Please select photo', 'Warning', {
        disableTimeOut: false
      });
      return false;
    }
    return true;
  }


  //for Guarantor FS
  onFileSelectedGfs(event: any) {
    console.log(event.target.files[0].size);
    if (event.target.files.length > 0 && event.target.files[0].size < 200000) {
      this.uploadImageObjectGfs.g_ac_fs = event.target.files[0];

      var fileExtension = '.' + event.target.files[0].name.split('.')[1];

      var name = "G_FS_" + this.convertDate() + fileExtension;

      var blob = event.target.files[0].slice(0, event.target.files[0].size, event.target.files[0].type);

      var newFile = new File([blob], name, { type: event.target.files[0].type });
      this.uploadImageObjectGfs.image = newFile;

      this.g_ac_fs = this.uploadImageObjectGfs.g_ac_fs
        ? this.uploadImageObjectGfs.g_ac_fs["name"]
        : "Choose File";
      console.log("imgObject===", this.uploadImageObjectGfs);
    } else {
      this.toastr.error('Image size should be less than 200kb', 'Error', {
        disableTimeOut: false
      });
    }
    return true;
  };


  uploadGfs() {
    console.log("Uploading Income proof", this.uploadImageObjectGfs);
    let isValid = this.validateGfs();
    if (isValid) {
      this.isAllowedFile(this.uploadImageObjectGfs.image, (res: any) => {
        console.log("res", res);
        if (res == true) {
          this.isLodaing = true;
          this.spiner();
          console.log("input data", this.uploadImageObjectGfs);
          const formData = new FormData();
          formData.append("dbid", this.rqstId);
          formData.append("userId", this.memberData.membershipId);
          formData.append("file", this.uploadImageObjectGfs.image);
          console.log("FORMDATA===", formData);
          this.LoanRequestDetailsUpdateService.uploadGfsFile(
            formData, (response: any) => {
              this.isLodaing = false;
              this.successGfs = true;
              this.getmemberDataById();
              // this.checkUpload();
              this.returnMsg = response.message;
              console.log("lllllllllll", this.returnMsg);
            }
          );

        } else {
          this.toastr.error('Invalid file', 'Error', {
            disableTimeOut: false
          });
        }
      })
    } else {
      this.toastr.error('Invalid image file', 'Error', {
        disableTimeOut: false
      });
    }
  }

  validateGfs = () => {
    console.log("vvvvvvvv", this.uploadImageObjectGfs.image);

    if (this.uploadImageObjectGfs.image === '' || this.uploadImageObjectGfs.image === null || this.uploadImageObjectGfs.image === undefined) {
      this.toastr.warning('Please select photo', 'Warning', {
        disableTimeOut: false
      });
      return false;
    }
    return true;
  }


  //for Nominee photo
  onFileSelectedNphoto(event: any) {
    console.log(event.target.files[0].size);
    if (event.target.files.length > 0 && event.target.files[0].size < 200000) {
      this.uploadImageObjectNphoto.n_ac_photo = event.target.files[0];

      var fileExtension = '.' + event.target.files[0].name.split('.')[1];

      var name = "N_PHOTO_" + this.convertDate() + fileExtension;

      var blob = event.target.files[0].slice(0, event.target.files[0].size, event.target.files[0].type);

      var newFile = new File([blob], name, { type: event.target.files[0].type });
      this.uploadImageObjectNphoto.image = newFile;

      this.n_ac_photo = this.uploadImageObjectNphoto.n_ac_photo
        ? this.uploadImageObjectNphoto.n_ac_photo["name"]
        : "Choose File";
      console.log("imgObject===", this.uploadImageObjectNphoto);
    } else {
      this.toastr.error('Image size should be less than 200kb', 'Error', {
        disableTimeOut: false
      });
    }
    return true;
  };


  uploadNphoto() {
    console.log("Uploading Income proof", this.uploadImageObjectNphoto);
    let isValid = this.validateNphoto();
    if (isValid) {
      this.isAllowedFile(this.uploadImageObjectNphoto.image, (res: any) => {
        console.log("res", res);
        if (res == true) {
          this.isLodaing = true;
          this.spiner();
          console.log("input data", this.uploadImageObjectNphoto);
          const formData = new FormData();
          formData.append("dbid", this.rqstId);
          formData.append("userId", this.memberData.membershipId);
          formData.append("file", this.uploadImageObjectNphoto.image);
          console.log("FORMDATA===", formData);
          this.LoanRequestDetailsUpdateService.uploadNphotoFile(
            formData, (response: any) => {
              this.isLodaing = false;
              this.successNphoto = true;
              this.getmemberDataById();
              // this.checkUpload();
              this.returnMsg = response.message;
              console.log("lllllllllll", this.returnMsg);
            }
          );

        } else {
          this.toastr.error('Invalid file', 'Error', {
            disableTimeOut: false
          });
        }
      })
    } else {
      this.toastr.error('Invalid image file', 'Error', {
        disableTimeOut: false
      });
    }
  }

  validateNphoto = () => {
    console.log("vvvvvvvv", this.uploadImageObjectNphoto.image);

    if (this.uploadImageObjectNphoto.image === '' || this.uploadImageObjectNphoto.image === null || this.uploadImageObjectNphoto.image === undefined) {
      this.toastr.warning('Please select photo', 'Warning', {
        disableTimeOut: false
      });
      return false;
    }
    return true;
  }


   //for Nominee id
   onFileSelectedNid(event: any) {
    console.log(event.target.files[0].size);
    if (event.target.files.length > 0 && event.target.files[0].size < 200000) {
      this.uploadImageObjectNid.n_ac_id = event.target.files[0];

      var fileExtension = '.' + event.target.files[0].name.split('.')[1];

      var name = "N_ID_" + this.convertDate() + fileExtension;

      var blob = event.target.files[0].slice(0, event.target.files[0].size, event.target.files[0].type);

      var newFile = new File([blob], name, { type: event.target.files[0].type });
      this.uploadImageObjectNid.image = newFile;

      this.n_ac_id = this.uploadImageObjectNid.n_ac_id
        ? this.uploadImageObjectNid.n_ac_id["name"]
        : "Choose File";
      console.log("imgObject===", this.uploadImageObjectNid);
    } else {
      this.toastr.error('Image size should be less than 200kb', 'Error', {
        disableTimeOut: false
      });
    }
    return true;
  };


  uploadNid() {
    console.log("Uploading Income proof", this.uploadImageObjectNid);
    let isValid = this.validateNid();
    if (isValid) {
      this.isAllowedFile(this.uploadImageObjectNid.image, (res: any) => {
        console.log("res", res);
        if (res == true) {
          this.isLodaing = true;
          this.spiner();
          console.log("input data", this.uploadImageObjectNid);
          const formData = new FormData();
          formData.append("dbid", this.rqstId);
          formData.append("userId", this.memberData.membershipId);
          formData.append("file", this.uploadImageObjectNid.image);
          console.log("FORMDATA===", formData);
          this.LoanRequestDetailsUpdateService.uploadNidFile(
            formData, (response: any) => {
              this.isLodaing = false;
              this.successNid = true;
              this.getmemberDataById();
              // this.checkUpload();
              this.returnMsg = response.message;
              console.log("lllllllllll", this.returnMsg);
            }
          );

        } else {
          this.toastr.error('Invalid file', 'Error', {
            disableTimeOut: false
          });
        }
      })
    } else {
      this.toastr.error('Invalid image file', 'Error', {
        disableTimeOut: false
      });
    }
  }

  validateNid = () => {
    console.log("vvvvvvvv", this.uploadImageObjectNid.image);

    if (this.uploadImageObjectNid.image === '' || this.uploadImageObjectNid.image === null || this.uploadImageObjectNid.image === undefined) {
      this.toastr.warning('Please select photo', 'Warning', {
        disableTimeOut: false
      });
      return false;
    }
    return true;
  }


  //for Nominee sign
  onFileSelectedNsign(event: any) {
    console.log(event.target.files[0].size);
    if (event.target.files.length > 0 && event.target.files[0].size < 200000) {
      this.uploadImageObjectNsign.n_ac_sign = event.target.files[0];

      var fileExtension = '.' + event.target.files[0].name.split('.')[1];

      var name = "N_SIGN_" + this.convertDate() + fileExtension;

      var blob = event.target.files[0].slice(0, event.target.files[0].size, event.target.files[0].type);

      var newFile = new File([blob], name, { type: event.target.files[0].type });
      this.uploadImageObjectNsign.image = newFile;

      this.n_ac_sign = this.uploadImageObjectNsign.n_ac_sign
        ? this.uploadImageObjectNsign.n_ac_sign["name"]
        : "Choose File";
      console.log("imgObject===", this.uploadImageObjectNsign);
    } else {
      this.toastr.error('Image size should be less than 200kb', 'Error', {
        disableTimeOut: false
      });
    }
    return true;
  };


  uploadNsign() {
    console.log("Uploading Income proof", this.uploadImageObjectNsign);
    let isValid = this.validateNsign();
    if (isValid) {
      this.isAllowedFile(this.uploadImageObjectNsign.image, (res: any) => {
        console.log("res", res);
        if (res == true) {
          this.isLodaing = true;
          this.spiner();
          console.log("input data", this.uploadImageObjectNsign);
          const formData = new FormData();
          formData.append("dbid", this.rqstId);
          formData.append("userId", this.memberData.membershipId);
          formData.append("file", this.uploadImageObjectNsign.image);
          console.log("FORMDATA===", formData);
          this.LoanRequestDetailsUpdateService.uploadGNignFile(
            formData, (response: any) => {
              this.isLodaing = false;
              this.successNsign = true;
              this.getmemberDataById();
              // this.checkUpload();
              this.returnMsg = response.message;
              console.log("lllllllllll", this.returnMsg);
            }
          );

        } else {
          this.toastr.error('Invalid file', 'Error', {
            disableTimeOut: false
          });
        }
      })
    } else {
      this.toastr.error('Invalid image file', 'Error', {
        disableTimeOut: false
      });
    }
  }

  validateNsign = () => {
    console.log("vvvvvvvv", this.uploadImageObjectNsign.image);

    if (this.uploadImageObjectNsign.image === '' || this.uploadImageObjectNsign.image === null || this.uploadImageObjectNsign.image === undefined) {
      this.toastr.warning('Please select photo', 'Warning', {
        disableTimeOut: false
      });
      return false;
    }
    return true;
  }

    //for Nominee address
    onFileSelectedNadrs(event: any) {
      console.log(event.target.files[0].size);
      if (event.target.files.length > 0 && event.target.files[0].size < 200000) {
        this.uploadImageObjectNadrs.n_ac_address = event.target.files[0];
  
        var fileExtension = '.' + event.target.files[0].name.split('.')[1];
  
        var name = "N_ADRS_" + this.convertDate() + fileExtension;
  
        var blob = event.target.files[0].slice(0, event.target.files[0].size, event.target.files[0].type);
  
        var newFile = new File([blob], name, { type: event.target.files[0].type });
        this.uploadImageObjectNadrs.image = newFile;
  
        this.n_ac_address = this.uploadImageObjectNadrs.n_ac_address
          ? this.uploadImageObjectNadrs.n_ac_address["name"]
          : "Choose File";
        console.log("imgObject===", this.uploadImageObjectNadrs);
      } else {
        this.toastr.error('Image size should be less than 200kb', 'Error', {
          disableTimeOut: false
        });
      }
      return true;
    };
  
  
    uploadNadrs() {
      console.log("Uploading Income proof", this.uploadImageObjectNadrs);
      let isValid = this.validateNadrs();
      if (isValid) {
        this.isAllowedFile(this.uploadImageObjectNadrs.image, (res: any) => {
          console.log("res", res);
          if (res == true) {
            this.isLodaing = true;
            this.spiner();
            console.log("input data", this.uploadImageObjectNadrs);
            const formData = new FormData();
            formData.append("dbid", this.rqstId);
            formData.append("userId", this.memberData.membershipId);
            formData.append("file", this.uploadImageObjectNadrs.image);
            console.log("FORMDATA===", formData);
            this.LoanRequestDetailsUpdateService.uploadGNdrsFile(
              formData, (response: any) => {
                this.isLodaing = false;
                this.successNadrs = true;
                // this.checkUpload();
                this.getmemberDataById();
                this.returnMsg = response.message;
                console.log("lllllllllll", this.returnMsg);
              }
            );
  
          } else {
            this.toastr.error('Invalid file', 'Error', {
              disableTimeOut: false
            });
          }
        })
      } else {
        this.toastr.error('Invalid image file', 'Error', {
          disableTimeOut: false
        });
      }
    }
  
    validateNadrs = () => {
      console.log("vvvvvvvv", this.uploadImageObjectNadrs.image);
  
      if (this.uploadImageObjectNadrs.image === '' || this.uploadImageObjectNadrs.image === null || this.uploadImageObjectNadrs.image === undefined) {
        this.toastr.warning('Please select photo', 'Warning', {
          disableTimeOut: false
        });
        return false;
      }
      return true;
    }


    //for Nominee FS
    onFileSelectedNfs(event: any) {
      console.log(event.target.files[0].size);
      if (event.target.files.length > 0 && event.target.files[0].size < 200000) {
        this.uploadImageObjectNfs.n_ac_fs = event.target.files[0];
  
        var fileExtension = '.' + event.target.files[0].name.split('.')[1];
  
        var name = "N_FS_" + this.convertDate() + fileExtension;
  
        var blob = event.target.files[0].slice(0, event.target.files[0].size, event.target.files[0].type);
  
        var newFile = new File([blob], name, { type: event.target.files[0].type });
        this.uploadImageObjectNfs.image = newFile;
  
        this.n_ac_fs = this.uploadImageObjectNfs.n_ac_fs
          ? this.uploadImageObjectNfs.n_ac_fs["name"]
          : "Choose File";
        console.log("imgObject===", this.uploadImageObjectNfs);
      } else {
        this.toastr.error('Image size should be less than 200kb', 'Error', {
          disableTimeOut: false
        });
      }
      return true;
    };
  
  
    uploadNfs() {
      console.log("Uploading Income proof", this.uploadImageObjectNfs);
      let isValid = this.validateNfs();
      if (isValid) {
        this.isAllowedFile(this.uploadImageObjectNfs.image, (res: any) => {
          console.log("res", res);
          if (res == true) {
            this.isLodaing = true;
            this.spiner();
            console.log("input data", this.uploadImageObjectNfs);
            const formData = new FormData();
            formData.append("dbid", this.rqstId);
            formData.append("userId", this.memberData.membershipId);
            formData.append("file", this.uploadImageObjectNfs.image);
            console.log("FORMDATA===", formData);
            this.LoanRequestDetailsUpdateService.uploadGNsFile(
              formData, (response: any) => {
                this.isLodaing = false;
                this.successNfs = true;
                // this.checkUpload();
                this.getmemberDataById();
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
  
    validateNfs = () => {
      console.log("vvvvvvvv", this.uploadImageObjectNfs.image);
  
      if (this.uploadImageObjectNfs.image === '' || this.uploadImageObjectNfs.image === null || this.uploadImageObjectNfs.image === undefined) {
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

  isAllowedFilePdf = (file: any, callback: any) => {
    console.log("call", file.type);
    switch (file.type) {
      case "application/pdf":
        return callback(true);
      default:
        return callback(false);
    }
  };

  // checkUpload(){
  //   console.log("checkUpload");
    
  //   if(this.successIncm == true && this.successStmnt == true && this.successOccu == true && this.successGphoto == true && this.successGid == true && this.successGsign == true && this.successGadrs == true && this.successGfs == true && this.successNphoto == true && this.successNid == true && this.successNsign == true && this.successNadrs == true && this.successNfs == true)
  //   {
  //     this.finalSubmit = true;
  //     console.log("finalSubmit",this.finalSubmit);
  //   }else{
  //     this.finalSubmit = false;
  //     console.log("finalSubmit",this.finalSubmit);
  //   }
  // }


  checkUploads() {
    console.log("checkUpload");
    if (this.memberData.l_income_proof === null || this.memberData.l_bank_stmnt === null || this.memberData.l_occu_proof === null || this.memberData.g_photo === null || this.memberData.g_id_proof === null || this.memberData.g_sign === null || this.memberData.g_address_proof === null || this.memberData.n_photo === null || this.memberData.n_id_proof === null || this.memberData.n_sign === null || this.memberData.n_address_proof === null) {
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
  



  validateInputs = () => {
    console.log('Saving project before validate', this.memberData);
    if (
      this.memberData.a_occupation === '' ||
      this.memberData.a_occupation === null ||
      this.memberData.a_occupation === undefined
    ) {
      this.toastr.warning(
        'Please add Occupation: in (Basic loan Application)',
        'Warning',
        {
          disableTimeOut: false,
        }
      );
      return false;
    }
    if (
      this.memberData.a_maried === '' ||
      this.memberData.a_maried === null ||
      this.memberData.a_maried === undefined
    ) {
      this.toastr.warning(
        'Please select maritial status in (Basic loan Application)',
        'Warning',
        {
          disableTimeOut: false,
        }
      );
      return false;
    }
    if (
      this.memberData.a_resident === '' ||
      this.memberData.a_resident === null ||
      this.memberData.a_resident === undefined
    ) {
      this.toastr.warning(
        'Please select Resident: in (Basic loan Application)',
        'Warning',
        {
          disableTimeOut: false,
        }
      );
      return false;
    }
    if (this.memberData.a_residen == "Rental") {
      if (
        this.memberData.a_house_owner === '' ||
        this.memberData.a_house_owner === null ||
        this.memberData.a_house_owner === undefined
      ) {
        this.toastr.warning(
          'Please add House Owner Name: in (Basic loan Application)',
          'Warning',
          {
            disableTimeOut: false,
          }
        );
        return false;
      }
      if (
        this.memberData.a_house_owner_phone < 1000000000 || this.memberData.a_house_owner_phone > 9999999999) {
        this.toastr.warning(
          'Please add House Owner Contact Number: in (Basic loan Application)',
          'Warning',
          {
            disableTimeOut: false,
          }
        );
        return false;
      }
    }
    if (
      this.memberData.a_stay_since === '' ||
      this.memberData.a_stay_since === null ||
      this.memberData.a_stay_since === undefined
    ) {
      this.toastr.warning(
        'Please select Stay Since in (Basic loan Application)',
        'Warning',
        {
          disableTimeOut: false,
        }
      );
      return false;
    }
    if (
      this.memberData.a_education === '' ||
      this.memberData.a_education === null ||
      this.memberData.a_education === undefined
    ) {
      this.toastr.warning(
        'Please add Educational Qualification: in (Basic loan Application)',
        'Warning',
        {
          disableTimeOut: false,
        }
      );
      return false;
    }
    if (
      this.memberData.a_Depend_family === '' ||
      this.memberData.a_Depend_family === null ||
      this.memberData.a_Depend_family === undefined
    ) {
      this.toastr.warning(
        'Please add Dependent Family Members: in (Basic loan Application)',
        'Warning',
        {
          disableTimeOut: false,
        }
      );
      return false;
    }
    if (
      this.memberData.l_loan_scheme === '' ||
      this.memberData.l_loan_scheme === null ||
      this.memberData.l_loan_scheme === undefined
    ) {
      this.toastr.warning(
        'Please select Loan Scheme: in (Basic loan Application)',
        'Warning',
        {
          disableTimeOut: false,
        }
      );
      return false;
    }
    if (
      this.memberData.l_loan_scheme_intrst === '' ||
      this.memberData.l_loan_scheme_intrst === null ||
      this.memberData.l_loan_scheme_intrst === undefined
    ) {
      this.toastr.warning(
        'Please type Loan Interest: in (Basic loan Application)',
        'Warning',
        {
          disableTimeOut: false,
        }
      );
      return false;
    }
    if (
      this.memberData.l_aapply_amount === '' ||
      this.memberData.l_aapply_amount === null ||
      this.memberData.l_aapply_amount === undefined
    ) {
      this.toastr.warning(
        'Please select Loan Apply Amount: in (Basic loan Application)',
        'Warning',
        {
          disableTimeOut: false,
        }
      );
      return false;
    }
    if (
      this.memberData.l_expected_month === '' ||
      this.memberData.l_expected_month === null ||
      this.memberData.l_expected_month === undefined
    ) {
      this.toastr.warning(
        'Please select Loan Tenure: in (Basic loan Application)',
        'Warning',
        {
          disableTimeOut: false,
        }
      );
      return false;
    }
    if (
      this.memberData.l_mode_repay === '' ||
      this.memberData.l_mode_repay === null ||
      this.memberData.l_mode_repay === undefined
    ) {
      this.toastr.warning(
        'Please select Frequency of Repayment: in (Basic loan Application)',
        'Warning',
        {
          disableTimeOut: false,
        }
      );
      return false;
    }
    if (
      this.memberData.l_share_amt === '' ||
      this.memberData.l_share_amt === null ||
      this.memberData.l_share_amt === undefined
    ) {
      this.toastr.warning(
        'Please add Share No: in (Basic loan Application)',
        'Warning',
        {
          disableTimeOut: false,
        }
      );
      return false;
    }
    if (
      this.memberData.l_fresh_loan === '' ||
      this.memberData.l_fresh_loan === null ||
      this.memberData.l_fresh_loan === undefined
    ) {
      this.toastr.warning(
        'Please Select Fresh Loan: in (Basic loan Application)',
        'Warning',
        {
          disableTimeOut: false,
        }
      );
      return false;
    }
    if (this.memberData.l_fresh_loan === 'No') {
      if (
        this.memberData.l_last_loan_amt === '' ||
        this.memberData.l_last_loan_amt === null ||
        this.memberData.l_last_loan_amt === undefined
      ) {
        this.toastr.warning(
          'Please add Last time Loan Amt.: in (Basic loan Application)',
          'Warning',
          {
            disableTimeOut: false,
          }
        );
        return false;
      }
      if (
        this.memberData.l_last_purpose === '' ||
        this.memberData.l_last_purpose === null ||
        this.memberData.l_last_purpose === undefined
      ) {
        this.toastr.warning(
          'Please add Purpose of Loan: in (Basic loan Application)',
          'Warning',
          {
            disableTimeOut: false,
          }
        );
        return false;
      }
    }
    if (
      this.memberData.l_employee_type === '' ||
      this.memberData.l_employee_type === null ||
      this.memberData.l_employee_type === undefined
    ) {
      this.toastr.warning(
        'Please Select Employed/Self Employed: in (Basic loan Application)',
        'Warning',
        {
          disableTimeOut: false,
        }
      );
      return false;
    }
    if (this.memberData.l_employee_type === 'Employed') {
      if (
        this.memberData.l_emp_emp_type === '' ||
        this.memberData.l_emp_emp_type === null ||
        this.memberData.l_emp_emp_type === undefined
      ) {
        this.toastr.warning(
          'Please Select Type of Employee: in (Basic loan Application)',
          'Warning',
          {
            disableTimeOut: false,
          }
        );
        return false;
      }
      if (
        this.memberData.l_emp_mode_salary === '' ||
        this.memberData.l_emp_mode_salary === null ||
        this.memberData.l_emp_mode_salary === undefined
      ) {
        this.toastr.warning(
          'Please Select Mode of Salary: in (Basic loan Application)',
          'Warning',
          {
            disableTimeOut: false,
          }
        );
        return false;
      }
      if (
        this.memberData.l_emp_net_salary === '' ||
        this.memberData.l_emp_net_salary === null ||
        this.memberData.l_emp_net_salary === undefined
      ) {
        this.toastr.warning(
          'Please add Net Salary: in (Basic loan Application)',
          'Warning',
          {
            disableTimeOut: false,
          }
        );
        return false;
      }
    }
    if (this.memberData.l_employee_type === 'Self Employed') {
      if (
        this.memberData.l_self_bsns_type === '' ||
        this.memberData.l_self_bsns_type === null ||
        this.memberData.l_self_bsns_type === undefined
      ) {
        this.toastr.warning(
          'Please add Business Type: in (Basic loan Application)',
          'Warning',
          {
            disableTimeOut: false,
          }
        );
        return false;
      }
      if (
        this.memberData.l_self_bsns_start === '' ||
        this.memberData.l_self_bsns_start === null ||
        this.memberData.l_self_bsns_start === undefined
      ) {
        this.toastr.warning(
          'Please add Business Start Date: in (Basic loan Application)',
          'Warning',
          {
            disableTimeOut: false,
          }
        );
        return false;
      }
      if (
        this.memberData.l_self_prfsn === '' ||
        this.memberData.l_self_prfsn === null ||
        this.memberData.l_self_prfsn === undefined
      ) {
        this.toastr.warning(
          'Please add Professional: in (Basic loan Application)',
          'Warning',
          {
            disableTimeOut: false,
          }
        );
        return false;
      }
      if (
        this.memberData.l_self_practice_start === '' ||
        this.memberData.l_self_practice_start === null ||
        this.memberData.l_self_practice_start === undefined
      ) {
        this.toastr.warning(
          'Please add Practice Start Date: in (Basic loan Application)',
          'Warning',
          {
            disableTimeOut: false,
          }
        );
        return false;
      }
    }
    if (
      this.memberData.l_emp_anual_incm === '' ||
      this.memberData.l_emp_anual_incm === null ||
      this.memberData.l_emp_anual_incm === undefined
    ) {
      this.toastr.warning(
        'Please add Annual Income: in (Basic loan Application)',
        'Warning',
        {
          disableTimeOut: false,
        }
      );
      return false;
    }
    if (
      this.memberData.l_emp_anual_expnd === '' ||
      this.memberData.l_emp_anual_expnd === null ||
      this.memberData.l_emp_anual_expnd === undefined
    ) {
      this.toastr.warning(
        'Please add Annual Expenditure: in (Basic loan Application)',
        'Warning',
        {
          disableTimeOut: false,
        }
      );
      return false;
    }
    if (
      this.memberData.l_emp_net_income === '' ||
      this.memberData.l_emp_net_income === null ||
      this.memberData.l_emp_net_income === undefined
    ) {
      this.toastr.warning(
        'Please add Net Income: in (Basic loan Application)',
        'Warning',
        {
          disableTimeOut: false,
        }
      );
      return false;
    }
    if (this.memberData.l_loan_scheme === 'Lakhimi Auto Loan(LAL)') {
      if (
        this.memberData.l_make === '' ||
        this.memberData.l_make === null ||
        this.memberData.l_make === undefined
      ) {
        this.toastr.warning(
          'Please type make: in (Basic loan Application)',
          'Warning',
          {
            disableTimeOut: false,
          }
        );
        return false;
      }
      if (
        this.memberData.l_model === '' ||
        this.memberData.l_model === null ||
        this.memberData.l_model === undefined
      ) {
        this.toastr.warning(
          'Please type model: in (Basic loan Application)',
          'Warning',
          {
            disableTimeOut: false,
          }
        );
        return false;
      }
      if (
        this.memberData.l_colour === '' ||
        this.memberData.l_colour === null ||
        this.memberData.l_colour === undefined
      ) {
        this.toastr.warning(
          'Please type colour: in (Basic loan Application)',
          'Warning',
          {
            disableTimeOut: false,
          }
        );
        return false;
      }
    }
    if (this.memberData.l_loan_scheme === 'Domestic Micro Loan(DML)' || this.memberData.l_loan_scheme === 'Member Durable Loan (MDL)') {
      if (
        this.memberData.l_goods_type === '' ||
        this.memberData.l_goods_type === null ||
        this.memberData.l_goods_type === undefined
      ) {
        this.toastr.warning(
          'Please enter Type of goods: in (Basic loan Application)',
          'Warning',
          {
            disableTimeOut: false,
          }
        );
        return false;
      }
      if (
        this.memberData.l_brand_name === '' ||
        this.memberData.l_brand_name === null ||
        this.memberData.l_brand_name === undefined
      ) {
        this.toastr.warning(
          'Please type Brand Name: in (Basic loan Application)',
          'Warning',
          {
            disableTimeOut: false,
          }
        );
        return false;
      }
      if (
        this.memberData.l_model_no === '' ||
        this.memberData.l_model_no === null ||
        this.memberData.l_model_no === undefined
      ) {
        this.toastr.warning(
          'Please type Model No.: in (Basic loan Application)',
          'Warning',
          {
            disableTimeOut: false,
          }
        );
        return false;
      }
    }
    if (
      this.memberData.l_ac_name === '' ||
      this.memberData.l_ac_name === null ||
      this.memberData.l_ac_name === undefined
    ) {
      this.toastr.warning(
        'Please add Name in Account: in (Basic loan Application)',
        'Warning',
        {
          disableTimeOut: false,
        }
      );
      return false;
    }
    if (
      this.memberData.l_ac_type === '' ||
      this.memberData.l_ac_type === null ||
      this.memberData.l_ac_type === undefined
    ) {
      this.toastr.warning(
        'Please add Account Type: in (Basic loan Application)',
        'Warning',
        {
          disableTimeOut: false,
        }
      );
      return false;
    }
    if (
      this.memberData.l_ac_no === '' ||
      this.memberData.l_ac_no === null ||
      this.memberData.l_ac_no === undefined
    ) {
      this.toastr.warning(
        'Please add Account Number: in (Basic loan Application)',
        'Warning',
        {
          disableTimeOut: false,
        }
      );
      return false;
    }
    if (
      this.memberData.l_ac_ifsc === '' ||
      this.memberData.l_ac_ifsc === null ||
      this.memberData.l_ac_ifsc === undefined
    ) {
      this.toastr.warning(
        'Please add IFSC: in (Basic loan Application)',
        'Warning',
        {
          disableTimeOut: false,
        }
      );
      return false;
    }
    if (
      this.memberData.l_ac_bankName === '' ||
      this.memberData.l_ac_bankName === null ||
      this.memberData.l_ac_bankName === undefined
    ) {
      this.toastr.warning(
        'Please add Bank Name: in (Basic loan Application)',
        'Warning',
        {
          disableTimeOut: false,
        }
      );
      return false;
    }
    if (
      this.memberData.l_ac_brName === '' ||
      this.memberData.l_ac_brName === null ||
      this.memberData.l_ac_brName === undefined
    ) {
      this.toastr.warning(
        'Please add Branch Name: in (Basic loan Application)',
        'Warning',
        {
          disableTimeOut: false,
        }
      );
      return false;
    }


    // GUARANTOR'S PERSONAL INFORMATION
    if (
      this.memberData.g_f_name === '' ||
      this.memberData.g_f_name === null ||
      this.memberData.g_f_name === undefined
    ) {
      this.toastr.warning(
        "Please add Name: in (Guarantor's Application)",
        'Warning',
        {
          disableTimeOut: false,
        }
      );
      return false;
    }
    if (
      this.memberData.g_email === '' ||
      this.memberData.g_email === null ||
      this.memberData.g_email === undefined
    ) {
      this.toastr.warning(
        "Please add Email: in (Guarantor's Application)",
        'Warning',
        {
          disableTimeOut: false,
        }
      );
      return false;
    }
    if (
      this.memberData.g_fathers_name === '' ||
      this.memberData.g_fathers_name === null ||
      this.memberData.g_fathers_name === undefined
    ) {
      this.toastr.warning(
        "Please add Fathers Name: in (Guarantor's Application)",
        'Warning',
        {
          disableTimeOut: false,
        }
      );
      return false;
    }
    if (
      this.memberData.g_phone_no < 1000000000 || this.memberData.g_phone_no > 9999999999) {
      this.toastr.warning(
        "Please add 10 digit Mobile Number: in (Guarantor's Application)",
        'Warning',
        {
          disableTimeOut: false,
        }
      );
      return false;
    }
    if (
      this.memberData.g_address === '' ||
      this.memberData.g_address === null ||
      this.memberData.g_address === undefined
    ) {
      this.toastr.warning(
        "Please add Address.: in (Guarantor's Application)",
        'Warning',
        {
          disableTimeOut: false,
        }
      );
      return false;
    }
    if (
      this.memberData.g_occupation === '' ||
      this.memberData.g_occupation === null ||
      this.memberData.g_occupation === undefined
    ) {
      this.toastr.warning(
        "Please add Occupation: in (Guarantor's Application)",
        'Warning',
        {
          disableTimeOut: false,
        }
      );
      return false;
    }
    if (
      this.memberData.g_dob === '' ||
      this.memberData.g_dob === null ||
      this.memberData.g_dob === undefined
    ) {
      this.toastr.warning(
        "Please select Date of Birth: in (Guarantor's Application)",
        'Warning',
        {
          disableTimeOut: false,
        }
      );
      return false;
    }
    if (
      this.memberData.g_gender === '' ||
      this.memberData.g_gender === null ||
      this.memberData.g_gender === undefined
    ) {
      this.toastr.warning(
        "Please select Gender: in (Guarantor's Application)",
        'Warning',
        {
          disableTimeOut: false,
        }
      );
      return false;
    }
    if (
      this.memberData.g_maried === '' ||
      this.memberData.g_maried === null ||
      this.memberData.g_maried === undefined
    ) {
      this.toastr.warning(
        "Please select Married Status: in (Guarantor's Application)",
        'Warning',
        {
          disableTimeOut: false,
        }
      );
      return false;
    }
    if (
      this.memberData.g_resident === '' ||
      this.memberData.g_resident === null ||
      this.memberData.g_resident === undefined
    ) {
      this.toastr.warning(
        "Please select Resident: in (Guarantor's Application)",
        'Warning',
        {
          disableTimeOut: false,
        }
      );
      return false;
    }
    if (
      this.memberData.g_stay_since === '' ||
      this.memberData.g_stay_since === null ||
      this.memberData.g_stay_since === undefined
    ) {
      this.toastr.warning(
        "Please select Stay Since: in (Guarantor's Application)",
        'Warning',
        {
          disableTimeOut: false,
        }
      );
      return false;
    }
    if (
      this.memberData.g_edu === '' ||
      this.memberData.g_edu === null ||
      this.memberData.g_edu === undefined
    ) {
      this.toastr.warning(
        "Please add Educational Qualification: in (Guarantor's Application)",
        'Warning',
        {
          disableTimeOut: false,
        }
      );
      return false;
    }
    if (
      this.memberData.g_Depend_family === '' ||
      this.memberData.g_Depend_family === null ||
      this.memberData.g_Depend_family === undefined
    ) {
      this.toastr.warning(
        "Please add No. of Dependent: in (Guarantor's Application)",
        'Warning',
        {
          disableTimeOut: false,
        }
      );
      return false;
    }
    if (
      this.memberData.g_ac_no === '' ||
      this.memberData.g_ac_no === null ||
      this.memberData.g_ac_no === undefined
    ) {
      this.toastr.warning(
        "Please add Account Number (Lakhimi): in (Guarantor's Application)",
        'Warning',
        {
          disableTimeOut: false,
        }
      );
      return false;
    }
    if (
      this.memberData.g_br_name === '' ||
      this.memberData.g_br_name === null ||
      this.memberData.g_br_name === undefined
    ) {
      this.toastr.warning(
        "Please add Branch Name: in (Guarantor's Application)",
        'Warning',
        {
          disableTimeOut: false,
        }
      );
      return false;
    }
    if (
      this.memberData.g_scheme === '' ||
      this.memberData.g_scheme === null ||
      this.memberData.g_scheme === undefined
    ) {
      this.toastr.warning(
        "Please add Deposit Scheme: in (Guarantor's Application)",
        'Warning',
        {
          disableTimeOut: false,
        }
      );
      return false;
    }
    if (
      this.memberData.g_start === '' ||
      this.memberData.g_start === null ||
      this.memberData.g_start === undefined
    ) {
      this.toastr.warning(
        "Please add Start Date: in (Guarantor's Application)",
        'Warning',
        {
          disableTimeOut: false,
        }
      );
      return false;
    }
    if (
      this.memberData.g_customer_id === '' ||
      this.memberData.g_customer_id === null ||
      this.memberData.g_customer_id === undefined
    ) {
      this.toastr.warning(
        "Please add Customer ID: in (Guarantor's Application)",
        'Warning',
        {
          disableTimeOut: false,
        }
      );
      return false;
    }
    if (
      this.memberData.g_end === '' ||
      this.memberData.g_end === null ||
      this.memberData.g_end === undefined
    ) {
      this.toastr.warning(
        "Please add End Date: in (Guarantor's Application)",
        'Warning',
        {
          disableTimeOut: false,
        }
      );
      return false;
    }
    if (
      this.memberData.g_total_amnt === '' ||
      this.memberData.g_total_amnt === null ||
      this.memberData.g_total_amnt === undefined
    ) {
      this.toastr.warning(
        "Please add Total Deposit Amt.: in (Guarantor's Application)",
        'Warning',
        {
          disableTimeOut: false,
        }
      );
      return false;
    }
    if (
      this.memberData.g_csp_msp === '' ||
      this.memberData.g_csp_msp === null ||
      this.memberData.g_csp_msp === undefined
    ) {
      this.toastr.warning(
        "Please add CSP/ MSP Code: in (Guarantor's Application)",
        'Warning',
        {
          disableTimeOut: false,
        }
      );
      return false;
    }
    if (
      this.memberData.g_adharNo === '' ||
      this.memberData.g_adharNo === null ||
      this.memberData.g_adharNo === undefined
    ) {
      this.toastr.warning(
        "Please add AADHAAR: in (Guarantor's Application)",
        'Warning',
        {
          disableTimeOut: false,
        }
      );
      return false;
    }
    if (
      this.memberData.g_panNo === '' ||
      this.memberData.g_panNo === null ||
      this.memberData.g_panNo === undefined
    ) {
      this.toastr.warning(
        "Please add PAN: in (Guarantor's Application)",
        'Warning',
        {
          disableTimeOut: false,
        }
      );
      return false;
    }
    if (
      this.memberData.g_employee_type === '' ||
      this.memberData.g_employee_type === null ||
      this.memberData.g_employee_type === undefined
    ) {
      this.toastr.warning(
        "Please add Employed/Self Employed: in (Guarantor's Application)",
        'Warning',
        {
          disableTimeOut: false,
        }
      );
      return false;
    }
    if (this.memberData.g_employee_type === 'Employed') {
      if (
        this.memberData.g_emp_emp_type === '' ||
        this.memberData.g_emp_emp_type === null ||
        this.memberData.g_emp_emp_type === undefined
      ) {
        this.toastr.warning(
          "Please select Type of Employee: in (Guarantor's Application)",
          'Warning',
          {
            disableTimeOut: false,
          }
        );
        return false;
      }
      if (
        this.memberData.g_emp_mode_salary === '' ||
        this.memberData.g_emp_mode_salary === null ||
        this.memberData.g_emp_mode_salary === undefined
      ) {
        this.toastr.warning(
          "Please select Mode of Salary: in (Guarantor's Application)",
          'Warning',
          {
            disableTimeOut: false,
          }
        );
        return false;
      }
      if (
        this.memberData.g_emp_net_salary === '' ||
        this.memberData.g_emp_net_salary === null ||
        this.memberData.g_emp_net_salary === undefined
      ) {
        this.toastr.warning(
          "Please add Net Salary: in (Guarantor's Application)",
          'Warning',
          {
            disableTimeOut: false,
          }
        );
        return false;
      }
      // if (
      //   this.memberData.g_emp_othr_incm === '' ||
      //   this.memberData.g_emp_othr_incm === null ||
      //   this.memberData.g_emp_othr_incm === undefined
      // ) {
      //   this.toastr.warning(
      //     "Please add Others income if any: in (Guarantor's Application)",
      //     'Warning',
      //     {
      //       disableTimeOut: false,
      //     }
      //   );
      //   return false;
      // }
    }
    if (this.memberData.g_employee_type === 'Self Employed') {
      if (
        this.memberData.g_self_bsns_type === '' ||
        this.memberData.g_self_bsns_type === null ||
        this.memberData.g_self_bsns_type === undefined
      ) {
        this.toastr.warning(
          "Please add Business Type: in (Guarantor's Application)",
          'Warning',
          {
            disableTimeOut: false,
          }
        );
        return false;
      }
      if (
        this.memberData.g_self_bsns_start === '' ||
        this.memberData.g_self_bsns_start === null ||
        this.memberData.g_self_bsns_start === undefined
      ) {
        this.toastr.warning(
          "Please add Business Start Date: in (Guarantor's Application)",
          'Warning',
          {
            disableTimeOut: false,
          }
        );
        return false;
      }
      if (
        this.memberData.g_self_prfsn === '' ||
        this.memberData.g_self_prfsn === null ||
        this.memberData.g_self_prfsn === undefined
      ) {
        this.toastr.warning(
          "Please add Professional: in (Guarantor's Application)",
          'Warning',
          {
            disableTimeOut: false,
          }
        );
        return false;
      }
      if (
        this.memberData.g_self_practice_start === '' ||
        this.memberData.g_self_practice_start === null ||
        this.memberData.g_self_practice_start === undefined
      ) {
        this.toastr.warning(
          "Please add Practice Start Date: in (Guarantor's Application)",
          'Warning',
          {
            disableTimeOut: false,
          }
        );
        return false;
      }
    }
    if (
      this.memberData.g_self_anual_incm === '' ||
      this.memberData.g_self_anual_incm === null ||
      this.memberData.g_self_anual_incm === undefined
    ) {
      this.toastr.warning(
        "Please add Annual Income: in (Guarantor's Application)",
        'Warning',
        {
          disableTimeOut: false,
        }
      );
      return false;
    }
    if (
      this.memberData.g_self_anual_expnd === '' ||
      this.memberData.g_self_anual_expnd === null ||
      this.memberData.g_self_anual_expnd === undefined
    ) {
      this.toastr.warning(
        "Please add Annual Expenditure: in (Guarantor's Application)",
        'Warning',
        {
          disableTimeOut: false,
        }
      );
      return false;
    }
    if (
      this.memberData.g_self_net_income === '' ||
      this.memberData.g_self_net_income === null ||
      this.memberData.g_self_net_income === undefined
    ) {
      this.toastr.warning(
        "Please add Net Income: in (Guarantor's Application)",
        'Warning',
        {
          disableTimeOut: false,
        }
      );
      return false;
    }
    // NOMINEE DETAILS
    if (
      this.memberData.n_nominee_name === '' ||
      this.memberData.n_nominee_name === null ||
      this.memberData.n_nominee_name === undefined
    ) {
      this.toastr.warning(
        'Please add Nominee Name: in (Nomination)',
        'Warning',
        {
          disableTimeOut: false,
        }
      );
      return false;
    }
    if (
      this.memberData.n_fathers_name === '' ||
      this.memberData.n_fathers_name === null ||
      this.memberData.n_fathers_name === undefined
    ) {
      this.toastr.warning(
        'Please add Father’s Name: in (Nomination)',
        'Warning',
        {
          disableTimeOut: false,
        }
      );
      return false;
    }
    if (
      this.memberData.n_dob === '' ||
      this.memberData.n_dob === null ||
      this.memberData.n_dob === undefined
    ) {
      this.toastr.warning(
        'Please add Date of Birth: in (Nomination)',
        'Warning',
        {
          disableTimeOut: false,
        }
      );
      return false;
    }
    if (
      this.memberData.n_gender === '' ||
      this.memberData.n_gender === null ||
      this.memberData.n_gender === undefined
    ) {
      this.toastr.warning('Please select Gender: in (Nomination)', 'Warning', {
        disableTimeOut: false,
      });
      return false;
    }
    if (
      this.memberData.n_adhar === '' ||
      this.memberData.n_adhar === null ||
      this.memberData.n_adhar === undefined
    ) {
      this.toastr.warning('Please add AADHAAR: in (Nomination)', 'Warning', {
        disableTimeOut: false,
      });
      return false;
    }
    if (
      this.memberData.n_pnone_no < 1000000000 || this.memberData.n_pnone_no > 9999999999) {
      this.toastr.warning(
        'Please add 10 digit Mobile Number: in (Nomination)',
        'Warning',
        {
          disableTimeOut: false,
        }
      );
      return false;
    }
    if (
      this.memberData.n_pan === '' ||
      this.memberData.n_pan === null ||
      this.memberData.n_pan === undefined
    ) {
      this.toastr.warning('Please add PAN No: in (Nomination)', 'Warning', {
        disableTimeOut: false,
      });
      return false;
    }
    if (
      this.memberData.n_email === '' ||
      this.memberData.n_email === null ||
      this.memberData.n_email === undefined
    ) {
      this.toastr.warning(
        'Please add Email Address: in (Nomination)',
        'Warning',
        {
          disableTimeOut: false,
        }
      );
      return false;
    }
    if (
      this.memberData.n_address === '' ||
      this.memberData.n_address === null ||
      this.memberData.n_address === undefined
    ) {
      this.toastr.warning('Please add Address: in (Nomination)', 'Warning', {
        disableTimeOut: false,
      });
      return false;
    }
    if (
      this.memberData.n_relation === '' ||
      this.memberData.n_relation === null ||
      this.memberData.n_relation === undefined
    ) {
      this.toastr.warning(
        'Please add Relation with Applicant: in (Nomination)',
        'Warning',
        {
          disableTimeOut: false,
        }
      );
      return false;
    }
    if (
      this.memberData.n_margin === '' ||
      this.memberData.n_margin === null ||
      this.memberData.n_margin === undefined
    ) {
      this.toastr.warning(
        'Please add Margin money: in (Nomination)',
        'Warning',
        {
          disableTimeOut: false,
        }
      );
      return false;
    }
    if (
      this.memberData.n_margin_qty === '' ||
      this.memberData.n_margin_qty === null ||
      this.memberData.n_margin_qty === undefined
    ) {
      this.toastr.warning(
        'Please add Margin money quantity: in (Nomination)',
        'Warning',
        {
          disableTimeOut: false,
        }
      );
      return false;
    }
    if (
      this.memberData.n_margin_value === '' ||
      this.memberData.n_margin_value === null ||
      this.memberData.n_margin_value === undefined
    ) {
      this.toastr.warning(
        'Please add Margin money value: in (Nomination)',
        'Warning',
        {
          disableTimeOut: false,
        }
      );
      return false;
    }
    if (
      this.memberData.n_gold === '' ||
      this.memberData.n_gold === null ||
      this.memberData.n_gold === undefined
    ) {
      this.toastr.warning(
        'Please add Gold ornaments: in (Nomination)',
        'Warning',
        {
          disableTimeOut: false,
        }
      );
      return false;
    }
    if (
      this.memberData.n_gold_qty === '' ||
      this.memberData.n_gold_qty === null ||
      this.memberData.n_gold_qty === undefined
    ) {
      this.toastr.warning(
        'Please add Gold ornaments quantity: in (Nomination)',
        'Warning',
        {
          disableTimeOut: false,
        }
      );
      return false;
    }
    if (
      this.memberData.n_gold_value === '' ||
      this.memberData.n_gold_value === null ||
      this.memberData.n_gold_value === undefined
    ) {
      this.toastr.warning(
        'Please add Gold ornaments value: in (Nomination)',
        'Warning',
        {
          disableTimeOut: false,
        }
      );
      return false;
    }
    if (
      this.memberData.n_land === '' ||
      this.memberData.n_land === null ||
      this.memberData.n_land === undefined
    ) {
      this.toastr.warning(
        'Please add Land: in (Nomination)',
        'Warning',
        {
          disableTimeOut: false,
        }
      );
      return false;
    }
    if (
      this.memberData.n_land_qty === '' ||
      this.memberData.n_land_qty === null ||
      this.memberData.n_land_qty === undefined
    ) {
      this.toastr.warning(
        'Please add Land quantity: in (Nomination)',
        'Warning',
        {
          disableTimeOut: false,
        }
      );
      return false;
    }
    if (
      this.memberData.n_land_value === '' ||
      this.memberData.n_land_value === null ||
      this.memberData.n_land_value === undefined
    ) {
      this.toastr.warning(
        'Please add Land value: in (Nomination)',
        'Warning',
        {
          disableTimeOut: false,
        }
      );
      return false;
    }
    if (
      this.memberData.n_land_buildings === '' ||
      this.memberData.n_land_buildings === null ||
      this.memberData.n_land_buildings === undefined
    ) {
      this.toastr.warning(
        'Please add Land & Buildings: in (Nomination)',
        'Warning',
        {
          disableTimeOut: false,
        }
      );
      return false;
    }
    if (
      this.memberData.n_land_buildings_qty === '' ||
      this.memberData.n_land_buildings_qty === null ||
      this.memberData.n_land_buildings_qty === undefined
    ) {
      this.toastr.warning(
        'Please add Land & Buildings quantity: in (Nomination)',
        'Warning',
        {
          disableTimeOut: false,
        }
      );
      return false;
    }
    if (
      this.memberData.n_land_buildings_value === '' ||
      this.memberData.n_land_buildings_value === null ||
      this.memberData.n_land_buildings_value === undefined
    ) {
      this.toastr.warning(
        'Please add Land & Buildings value: in (Nomination)',
        'Warning',
        {
          disableTimeOut: false,
        }
      );
      return false;
    }





    // POST DATED CHEQUES


    // if (
    //   this.memberData.c_bank_name === '' ||
    //   this.memberData.c_bank_name === null ||
    //   this.memberData.c_bank_name === undefined
    // ) {
    //   this.toastr.warning(
    //     'Please add Name of the drawee bank: in ( Post-Dated Cheques )',
    //     'Warning',
    //     {
    //       disableTimeOut: false,
    //     }
    //   );
    //   return false;
    // }
    // if (
    //   this.memberData.c_br_name === '' ||
    //   this.memberData.c_br_name === null ||
    //   this.memberData.c_br_name === undefined
    // ) {
    //   this.toastr.warning(
    //     'Please add Name of the drawee branch: in ( Post-Dated Cheques )',
    //     'Warning',
    //     {
    //       disableTimeOut: false,
    //     }
    //   );
    //   return false;
    // }
    // if (
    //   this.memberData.c_account === '' ||
    //   this.memberData.c_account === null ||
    //   this.memberData.c_account === undefined
    // ) {
    //   this.toastr.warning(
    //     'Please add SB A/c OR Current A/c: in ( Post-Dated Cheques )',
    //     'Warning',
    //     {
    //       disableTimeOut: false,
    //     }
    //   );
    //   return false;
    // }
    // if (
    //   this.memberData.c_name_in_ac === '' ||
    //   this.memberData.c_name_in_ac === null ||
    //   this.memberData.c_name_in_ac === undefined
    // ) {
    //   this.toastr.warning(
    //     'Please add Name in A/c: in ( Post-Dated Cheques )',
    //     'Warning',
    //     {
    //       disableTimeOut: false,
    //     }
    //   );
    //   return false;
    // }
    // if (
    //   this.memberData.c_micr === '' ||
    //   this.memberData.c_micr === null ||
    //   this.memberData.c_micr === undefined
    // ) {
    //   this.toastr.warning(
    //     'Please add MICR Sort Code (9 digits): in ( Post-Dated Cheques )',
    //     'Warning',
    //     {
    //       disableTimeOut: false,
    //     }
    //   );
    //   return false;
    // }
    // if (
    //   this.memberData.c_ck_leave === '' ||
    //   this.memberData.c_ck_leave === null ||
    //   this.memberData.c_ck_leave === undefined
    // ) {
    //   this.toastr.warning(
    //     'Please add Number of Cheque Leavs: in ( Post-Dated Cheques )',
    //     'Warning',
    //     {
    //       disableTimeOut: false,
    //     }
    //   );
    //   return false;
    // }
    // if (
    //   this.memberData.c_commencement === '' ||
    //   this.memberData.c_commencement === null ||
    //   this.memberData.c_commencement === undefined
    // ) {
    //   this.toastr.warning(
    //     'Please add Date of Commencement: in ( Post-Dated Cheques )',
    //     'Warning',
    //     {
    //       disableTimeOut: false,
    //     }
    //   );
    //   return false;
    // }
    // if (
    //   this.memberData.c_ck_number === '' ||
    //   this.memberData.c_ck_number === null ||
    //   this.memberData.c_ck_number === undefined
    // ) {
    //   this.toastr.warning(
    //     'Please add Cheques Numbers: in ( Post-Dated Cheques )',
    //     'Warning',
    //     {
    //       disableTimeOut: false,
    //     }
    //   );
    //   return false;
    // }
    // if (
    //   this.memberData.c_ck_amnt === '' ||
    //   this.memberData.c_ck_amnt === null ||
    //   this.memberData.c_ck_amnt === undefined
    // ) {
    //   this.toastr.warning(
    //     'Please add Amount of Cheques: in ( Post-Dated Cheques )',
    //     'Warning',
    //     {
    //       disableTimeOut: false,
    //     }
    //   );
    //   return false;
    // }







    // MSP
    if (
      this.memberData.msp_name === '' ||
      this.memberData.msp_name === null ||
      this.memberData.msp_name === undefined
    ) {
      this.toastr.warning(
        'Please add Name: in (MSP-Executive Forwarding Letter)',
        'Warning',
        {
          disableTimeOut: false,
        }
      );
      return false;
    }
    if (
      this.memberData.msp_permanent_rsd === '' ||
      this.memberData.msp_permanent_rsd === null ||
      this.memberData.msp_permanent_rsd === undefined
    ) {
      this.toastr.warning(
        'Please add Permanent Residing: in (MSP-Executive Forwarding Letter)',
        'Warning',
        {
          disableTimeOut: false,
        }
      );
      return false;
    }
    if (
      this.memberData.msp_resident === '' ||
      this.memberData.msp_resident === null ||
      this.memberData.msp_resident === undefined
    ) {
      this.toastr.warning(
        'Please add Resident: in (MSP-Executive Forwarding Letter)',
        'Warning',
        {
          disableTimeOut: false,
        }
      );
      return false;
    }
    if (
      this.memberData.msp_bsns_resident === '' ||
      this.memberData.msp_bsns_resident === null ||
      this.memberData.msp_bsns_resident === undefined
    ) {
      this.toastr.warning(
        'Please add Business Resident: in (MSP-Executive Forwarding Letter)',
        'Warning',
        {
          disableTimeOut: false,
        }
      );
      return false;
    }
    if (
      this.memberData.msp_bsns_type === '' ||
      this.memberData.msp_bsns_type === null ||
      this.memberData.msp_bsns_type === undefined
    ) {
      this.toastr.warning(
        'Please add Business Type: in (MSP-Executive Forwarding Letter)',
        'Warning',
        {
          disableTimeOut: false,
        }
      );
      return false;
    }
    if (
      this.memberData.msp_knwn_since === '' ||
      this.memberData.msp_knwn_since === null ||
      this.memberData.msp_knwn_since === undefined
    ) {
      this.toastr.warning(
        'Please add Known him Since: in (MSP-Executive Forwarding Letter)',
        'Warning',
        {
          disableTimeOut: false,
        }
      );
      return false;
    }
    if (
      this.memberData.msp_owner_bsns === '' ||
      this.memberData.msp_owner_bsns === null ||
      this.memberData.msp_owner_bsns === undefined
    ) {
      this.toastr.warning(
        'Please add Owner of Business: in (MSP-Executive Forwarding Letter)',
        'Warning',
        {
          disableTimeOut: false,
        }
      );
      return false;
    }
    if (
      this.memberData.msp_bsns_coFndr === '' ||
      this.memberData.msp_bsns_coFndr === null ||
      this.memberData.msp_bsns_coFndr === undefined
    ) {
      this.toastr.warning(
        'Please add Partnership in Business: in (MSP-Executive Forwarding Letter)',
        'Warning',
        {
          disableTimeOut: false,
        }
      );
      return false;
    }
    if (
      this.memberData.msp_estbls_name === '' ||
      this.memberData.msp_estbls_name === null ||
      this.memberData.msp_estbls_name === undefined
    ) {
      this.toastr.warning(
        'Please add Establishment Name: in (MSP-Executive Forwarding Letter)',
        'Warning',
        {
          disableTimeOut: false,
        }
      );
      return false;
    }
    if (
      this.memberData.msp_mltpl_bsns === '' ||
      this.memberData.msp_mltpl_bsns === null ||
      this.memberData.msp_mltpl_bsns === undefined
    ) {
      this.toastr.warning(
        'Please add Multiple Business: in (MSP-Executive Forwarding Letter)',
        'Warning',
        {
          disableTimeOut: false,
        }
      );
      return false;
    }
    if (
      this.memberData.msp_stock_value === '' ||
      this.memberData.msp_stock_value === null ||
      this.memberData.msp_stock_value === undefined
    ) {
      this.toastr.warning(
        'Please add Value of stocks: in (MSP-Executive Forwarding Letter)',
        'Warning',
        {
          disableTimeOut: false,
        }
      );
      return false;
    }
    if (
      this.memberData.msp_size_bsns === '' ||
      this.memberData.msp_size_bsns === null ||
      this.memberData.msp_size_bsns === undefined
    ) {
      this.toastr.warning(
        'Please add Business Size: in (MSP-Executive Forwarding Letter)',
        'Warning',
        {
          disableTimeOut: false,
        }
      );
      return false;
    }
    if (
      this.memberData.msp_reg_deposit === '' ||
      this.memberData.msp_reg_deposit === null ||
      this.memberData.msp_reg_deposit === undefined
    ) {
      this.toastr.warning(
        'Please add Regular Deposit: in (MSP-Executive Forwarding Letter)',
        'Warning',
        {
          disableTimeOut: false,
        }
      );
      return false;
    }
    if (
      this.memberData.msp_reg_deposit_bsns === '' ||
      this.memberData.msp_reg_deposit_bsns === null ||
      this.memberData.msp_reg_deposit_bsns === undefined
    ) {
      this.toastr.warning(
        'Please add Regular in Business: in (MSP-Executive Forwarding Letter)',
        'Warning',
        {
          disableTimeOut: false,
        }
      );
      return false;
    }
    if (
      this.memberData.msp_intrst_savings === '' ||
      this.memberData.msp_intrst_savings === null ||
      this.memberData.msp_intrst_savings === undefined
    ) {
      this.toastr.warning(
        'Please add Intersted for: in (MSP-Executive Forwarding Letter)',
        'Warning',
        {
          disableTimeOut: false,
        }
      );
      return false;
    }
    if (
      this.memberData.msp_reg_intrst_loan === '' ||
      this.memberData.msp_reg_intrst_loan === null ||
      this.memberData.msp_reg_intrst_loan === undefined
    ) {
      this.toastr.warning(
        'Please add Any Other Service Required?: in (MSP-Executive Forwarding Letter)',
        'Warning',
        {
          disableTimeOut: false,
        }
      );
      return false;
    }
    if (
      this.memberData.msp_aprx_incm === '' ||
      this.memberData.msp_aprx_incm === null ||
      this.memberData.msp_aprx_incm === undefined
    ) {
      this.toastr.warning(
        'Please add Approx annual income (Lakhs): in (MSP-Executive Forwarding Letter)',
        'Warning',
        {
          disableTimeOut: false,
        }
      );
      return false;
    }
    if (
      this.memberData.msp_cordnt === '' ||
      this.memberData.msp_cordnt === null ||
      this.memberData.msp_cordnt === undefined
    ) {
      this.toastr.warning(
        'Please add Coordination: in (MSP-Executive Forwarding Letter)',
        'Warning',
        {
          disableTimeOut: false,
        }
      );
      return false;
    }
    if (
      this.memberData.msp_behaviour === '' ||
      this.memberData.msp_behaviour === null ||
      this.memberData.msp_behaviour === undefined
    ) {
      this.toastr.warning(
        'Please add Restpectful behaviour: in (MSP-Executive Forwarding Letter)',
        'Warning',
        {
          disableTimeOut: false,
        }
      );
      return false;
    }
    if (
      this.memberData.msp_inters_us === '' ||
      this.memberData.msp_inters_us === null ||
      this.memberData.msp_inters_us === undefined
    ) {
      this.toastr.warning(
        'Please add Interested with us: in (MSP-Executive Forwarding Letter)',
        'Warning',
        {
          disableTimeOut: false,
        }
      );
      return false;
    }
    if (
      this.memberData.msp_service_satisfied === '' ||
      this.memberData.msp_service_satisfied === null ||
      this.memberData.msp_service_satisfied === undefined
    ) {
      this.toastr.warning(
        'Please add Satisfied on services: in (MSP-Executive Forwarding Letter)',
        'Warning',
        {
          disableTimeOut: false,
        }
      );
      return false;
    }
    if (
      this.memberData.msp_thnk_abt_us === '' ||
      this.memberData.msp_thnk_abt_us === null ||
      this.memberData.msp_thnk_abt_us === undefined
    ) {
      this.toastr.warning(
        'Please select Think about us: in (MSP-Executive Forwarding Letter)',
        'Warning',
        {
          disableTimeOut: false,
        }
      );
      return false;
    }
    if (
      this.memberData.msp_criminal_hstry === '' ||
      this.memberData.msp_criminal_hstry === null ||
      this.memberData.msp_criminal_hstry === undefined
    ) {
      this.toastr.warning(
        'Please add History of criminal acts: in (MSP-Executive Forwarding Letter)',
        'Warning',
        {
          disableTimeOut: false,
        }
      );
      return false;
    }
    if (
      this.memberData.msp_financ_knwldg === '' ||
      this.memberData.msp_financ_knwldg === null ||
      this.memberData.msp_financ_knwldg === undefined
    ) {
      this.toastr.warning(
        'Please select Financial knowledge: in (MSP-Executive Forwarding Letter)',
        'Warning',
        {
          disableTimeOut: false,
        }
      );
      return false;
    }
    if (
      this.memberData.msp_mind_belief === '' ||
      this.memberData.msp_mind_belief === null ||
      this.memberData.msp_mind_belief === undefined
    ) {
      this.toastr.warning(
        'Please select Mind of belief type: in (MSP-Executive Forwarding Letter)',
        'Warning',
        {
          disableTimeOut: false,
        }
      );
      return false;
    }
    if (
      this.memberData.msp_literate === '' ||
      this.memberData.msp_literate === null ||
      this.memberData.msp_literate === undefined
    ) {
      this.toastr.warning(
        'Please add Literate person: in (MSP-Executive Forwarding Letter)',
        'Warning',
        {
          disableTimeOut: false,
        }
      );
      return false;
    }
    if (
      this.memberData.msp_place === '' ||
      this.memberData.msp_place === null ||
      this.memberData.msp_place === undefined
    ) {
      this.toastr.warning(
        'Please add Place: in (MSP-Executive Forwarding Letter)',
        'Warning',
        {
          disableTimeOut: false,
        }
      );
      return false;
    }
    return true;
  };
}
