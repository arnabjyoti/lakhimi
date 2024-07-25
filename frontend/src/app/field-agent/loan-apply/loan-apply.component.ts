import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { LoanApplyService } from './loan-apply.service';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { brunchData } from '../new-membership/new-membership.component';

@Component({
  selector: 'app-loan-apply',
  templateUrl: './loan-apply.component.html',
  styleUrls: ['./loan-apply.component.css'],
  standalone: true,
  imports: [NgxSpinnerModule, MatStepperModule, ReactiveFormsModule, RouterModule, MatTableModule, MatPaginatorModule, MatButtonModule, MatInputModule, MatSortModule, FormsModule, MatFormFieldModule, CommonModule],
})
export class LoanApplyComponent implements OnInit {

  public displayedColumns: string[] = ['Sl', 'full_name', 'membership_id', 'apply_amount', 'reference_no', 'fwd_status', 'loan_status', 'apply_date', 'action'];
  dataSource !: MatTableDataSource<brunchData>
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  public ckInput: any = {
    membershipId: "",
  }

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

public finalData: any = {
  referenceNo: '',
  dbId: '',
}

public finalSubmit: boolean = false;

  public dbId: any;

  public day: any;
  public month: any;

  public num1: number = 0;
  public num2: number = 0;

  public isLodaing = true;

  public isSaving: boolean = false;

  public found: boolean = false;
  public notFound: boolean = false;
  public check: boolean = false;
  public endpoint: any;
  public user: any;
  public userId: any;
  public brunchId: any;
  public brunchDetails: any;
  public returnMsg: any;

  public myDate: any = new Date();

  public userList: any;

  public showSaveData: boolean = false;

  public mId: any;

  public branchData: any;



  public firstBtn: boolean = false;
  public secondBtn: boolean = false;
  public thirdBtn: boolean = false;
  public fourthBtn: boolean = false;
  public finalBtn: boolean = false;


  inputFields: any[] = [
    { id: 1, value: '' },
    { id: 2, value: '' },
    // ... other rows
  ];

  sum: number = 0;

  constructor(
    private spinner: NgxSpinnerService,
    private LoanApplyService: LoanApplyService,
    private toastr: ToastrService,
    private _formBuilder: FormBuilder,
    private datePipe: DatePipe,
  ) {
    this.endpoint = environment.BASE_URL;
    this.init();
    this.myDate = this.datePipe.transform(this.myDate, "YYYY-MM-dd");
    this.calculateSumm();
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
    // this.checkMember(); //testing purpose
    this.loanApplyList();

  }

  spiner() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 5000);
  }


  loanApplyList() {
    this.LoanApplyService.getLoanApplyList(this.userId, (callback: any) => {
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


  addRow() {
    const newRow = { id: this.inputFields.length + 1, value: '' };
    this.inputFields.push(newRow);
    console.log("field value", this.inputFields);
  }

  deleteRow(field: any) {
    const index = this.inputFields.indexOf(field);
    if (index !== -1) {
      this.inputFields.splice(index, 1);
      this.calculateSum();
    }
  }

  calculateSum() {
    this.sum = this.inputFields.reduce((acc, field) => acc + +field.value, 0);
  }


  dateDifference(): number {

    var startDate = new Date(this.memberData.dob); // Replace with your start date
    var endDate = new Date();
    var date = new Date();
    console.log("bbbbbb", startDate);
    console.log("cccccccccc", endDate);

    const millisecondsPerDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
    const difference = Math.abs(endDate.getFullYear() - startDate.getFullYear());
    console.log("xxxxxxx", difference);

    return Math.floor(difference / millisecondsPerDay);
  }

  checkMember() {
    this.ckInput.brunchId = this.brunchId;
    console.log("check input data", this.ckInput);

    this.LoanApplyService.checkMemberData(this.ckInput, (res: any) => {
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

        this.checkAccountCount();

        this.memberData.id = res.id,
          this.memberData.f_name = res.f_name,
          this.memberData.l_name = res.l_name,
          this.memberData.email = res.email,
          this.memberData.fathers_name = res.fathers_name,
          this.memberData.address = res.address,
          this.memberData.gender = res.gender,
          this.memberData.dob = res.dob,
          this.memberData.purpose = res.purpose,
          this.memberData.occupation = res.occupation,
          this.memberData.introducer = res.introducer,
          this.memberData.introducer_id = res.introducer_id,
          this.memberData.panNo = res.panNo,
          this.memberData.adharNo = res.adharNo,
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

  calculateSumm(): void {
    console.log("cccccccccccc");

    this.sum = this.num1 + this.num2;
  }

  checkAccountCount() {
    console.log("zzzzzzzzzzzzzzzzzz", this.mId);

    this.LoanApplyService.checkAcCount(this.mId, (callback: any) => {
      console.log("count", callback);
      this.memberData.acCount = callback.AcCount;
    })
  }

  getBrunch = () => {
    let requestObject = {};

    this.LoanApplyService.getBrunch(requestObject, (callback: any) => {
      console.log("getBrunch", callback);

      this.branchData = callback

      console.log("vvvvvvvvvvvvv", this.branchData);






    });
  }

  onSchemeChange() {
    if (this.memberData.l_loan_scheme == 'Personal Loan (PL)') {
      this.memberData.l_loan_scheme_intrst = 14.99;
    }
    if (this.memberData.l_loan_scheme == 'Business Loan (IGL)') {
      this.memberData.l_loan_scheme_intrst = 14.99;
    }
    if (this.memberData.l_loan_scheme == 'Gold Reen(GR)') {
      this.memberData.l_loan_scheme_intrst = 15.99;
    }
    if (this.memberData.l_loan_scheme == 'Domestic Micro Loan(DML)') {
      this.memberData.l_loan_scheme_intrst = 14.99;
    }
    if (this.memberData.l_loan_scheme == 'Member Durable Loan (MDL)') {
      this.memberData.l_loan_scheme_intrst = 13.99;
    }
    if (this.memberData.l_loan_scheme == 'Loans Under Deposit (LUD)') {
      this.memberData.l_loan_scheme_intrst = 11.99;
    }
    if (this.memberData.l_loan_scheme == 'Staff Loan') {
      this.memberData.l_loan_scheme_intrst = 13;
    }
    if (this.memberData.l_loan_scheme == 'Krishan Kalyan Reen(KKR)') {
      this.memberData.l_loan_scheme_intrst = 8;
    }
    if (this.memberData.l_loan_scheme == 'Parivar Kalyan Reen (SHG)') {
      this.memberData.l_loan_scheme_intrst = 18;
    }
    if (this.memberData.l_loan_scheme == 'Lakhimi Auto Loan(LAL)') {
      this.memberData.l_loan_scheme_intrst = 15;
    }
  }

  saveData() {
    this.spiner();
    console.log("input data", this.memberData);
    this.LoanApplyService.createLoan(this.memberData, (res: any) => {
      this.isLodaing = false;
      // let ele:any = document.getElementById('modalClose');
      // ele.click();
      this.dbId = res.id;
      console.log("dbIddbIddbIddbId", res.id);

      this.inputForm = false;
      this.uploadForm = true;
      // this.loanApplyList();
    });

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



          formData.append("dbid", this.dbId);
          formData.append("userId", this.memberData.id);
          formData.append("file", this.uploadImageObjectIncm.image);
          console.log("FORMDATA===", formData);
          console.log("dbid===", this.dbId);
          this.LoanApplyService.uploadIncmrFile(
            formData, (response: any) => {
              this.isLodaing = false;
              this.successIncm = true;
              this.checkUpload();
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



          formData.append("dbid", this.dbId);
          formData.append("userId", this.memberData.id);
          formData.append("file", this.uploadImageObjectBnkStmnt.image);
          console.log("FORMDATA===", formData);
          console.log("dbid===", this.dbId);
          this.LoanApplyService.uploadBankStmntFile(
            formData, (response: any) => {
              this.isLodaing = false;
              this.successStmnt =true;
              this.checkUpload();
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



          formData.append("dbid", this.dbId);
          formData.append("userId", this.memberData.id);
          formData.append("file", this.uploadImageObjectOccPrf.image);
          console.log("FORMDATA===", formData);
          console.log("dbid===", this.dbId);
          this.LoanApplyService.uploadOccPrfFile(
            formData, (response: any) => {
              this.isLodaing = false;
              this.successOccu = true;
              this.checkUpload();
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



          formData.append("dbid", this.dbId);
          formData.append("userId", this.memberData.id);
          formData.append("file", this.uploadImageObjectGphoto.image);
          console.log("FORMDATA===", formData);
          this.LoanApplyService.uploadGphotoFile(
            formData, (response: any) => {
              this.isLodaing = false;
              this.successGphoto = true;
              this.checkUpload();
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



          formData.append("dbid", this.dbId);
          formData.append("userId", this.memberData.id);
          formData.append("file", this.uploadImageObjectGid.image);
          console.log("FORMDATA===", formData);
          this.LoanApplyService.uploadGidFile(
            formData, (response: any) => {
              this.isLodaing = false;
              this.successGid = true;
              this.checkUpload();
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
          formData.append("dbid", this.dbId);
          formData.append("userId", this.memberData.id);
          formData.append("file", this.uploadImageObjectGsign.image);
          console.log("FORMDATA===", formData);
          this.LoanApplyService.uploadGsignFile(
            formData, (response: any) => {
              this.isLodaing = false;
              this.successGsign = true;
              this.checkUpload();
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
          formData.append("dbid", this.dbId);
          formData.append("userId", this.memberData.id);
          formData.append("file", this.uploadImageObjectGadrs.image);
          console.log("FORMDATA===", formData);
          this.LoanApplyService.uploadGadrsFile(
            formData, (response: any) => {
              this.isLodaing = false;
              this.successGadrs = true;
              this.checkUpload();
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
          formData.append("dbid", this.dbId);
          formData.append("userId", this.memberData.id);
          formData.append("file", this.uploadImageObjectGfs.image);
          console.log("FORMDATA===", formData);
          this.LoanApplyService.uploadGfsFile(
            formData, (response: any) => {
              this.isLodaing = false;
              this.successGfs = true;
              this.checkUpload();
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
          formData.append("dbid", this.dbId);
          formData.append("userId", this.memberData.id);
          formData.append("file", this.uploadImageObjectNphoto.image);
          console.log("FORMDATA===", formData);
          this.LoanApplyService.uploadNphotoFile(
            formData, (response: any) => {
              this.isLodaing = false;
              this.successNphoto = true;
              this.checkUpload();
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
          formData.append("dbid", this.dbId);
          formData.append("userId", this.memberData.id);
          formData.append("file", this.uploadImageObjectNid.image);
          console.log("FORMDATA===", formData);
          this.LoanApplyService.uploadNidFile(
            formData, (response: any) => {
              this.isLodaing = false;
              this.successNid = true;
              this.checkUpload();
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
          formData.append("dbid", this.dbId);
          formData.append("userId", this.memberData.id);
          formData.append("file", this.uploadImageObjectNsign.image);
          console.log("FORMDATA===", formData);
          this.LoanApplyService.uploadGNignFile(
            formData, (response: any) => {
              this.isLodaing = false;
              this.successNsign = true;
              this.checkUpload();
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
            formData.append("dbid", this.dbId);
            formData.append("userId", this.memberData.id);
            formData.append("file", this.uploadImageObjectNadrs.image);
            console.log("FORMDATA===", formData);
            this.LoanApplyService.uploadGNdrsFile(
              formData, (response: any) => {
                this.isLodaing = false;
                this.successNadrs = true;
                this.checkUpload();
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
            formData.append("dbid", this.dbId);
            formData.append("userId", this.memberData.id);
            formData.append("file", this.uploadImageObjectNfs.image);
            console.log("FORMDATA===", formData);
            this.LoanApplyService.uploadGNsFile(
              formData, (response: any) => {
                this.isLodaing = false;
                this.successNfs = true;
                this.checkUpload();
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

  checkUpload(){
    console.log("checkUpload");
    
    if(this.successIncm == true && this.successStmnt == true && this.successOccu == true && this.successGphoto == true && this.successGid == true && this.successGsign == true && this.successGadrs == true && this.successNphoto == true && this.successNid == true && this.successNsign == true && this.successNadrs == true)
    {
      this.finalSubmit = true;
      console.log("finalSubmit",this.finalSubmit);
    }else{
      this.finalSubmit = false;
      console.log("finalSubmit",this.finalSubmit);
    }
  }

  saveFinal(){
    this.spiner();
    this.finalData.referenceNo = this.convertDate();
    this.finalData.dbId = this.dbId;
    console.log("input data", this.memberData);
    this.LoanApplyService.finaLoanSave(this.finalData, (res: any) => {
      this.isLodaing = false;
      let ele:any = document.getElementById('modalClose');
      ele.click();

      this.loanApplyList();
    });
  }

  resetForm() {
    this.ckInput.membershipId = "";
    this.found = false;
  }





  checkForm1() {
    let firstValid = this.validateFirstForm();
    if (firstValid) {
      console.log("firstValid");
      this.firstBtn = true;

      this.toastr.success(
        'Step 1 completed', 'Success',
        {
          disableTimeOut: false,
        }
      );
      this.toastr.success(
        'Please Fill up Step 2', '',
        {
          disableTimeOut: false,
        }
      );
    }
  }

  checkForm2() {
    let secondValid = this.validatesecondForm();
    if (secondValid) {
      console.log("secondValid");
      this.secondBtn = true;

      this.toastr.success(
        'Step 2 completed', 'Success',
        {
          disableTimeOut: false,
        }
      );

      this.toastr.success(
        'Please Fill up Step 3', '',
        {
          disableTimeOut: false,
        }
      );
    }
  }

  checkForm3() {
    let thirdValid = this.validateThirdForm();
    if (thirdValid) {
      console.log("thirdValid");
      this.fourthBtn = true;

      this.toastr.success(
        'Step 3 completed', 'Success',
        {
          disableTimeOut: false,
        }
      );
      this.toastr.success(
        'Please Fill up Step 4', '',
        {
          disableTimeOut: false,
        }
      );
    }
  }

  checkForm4() {
    let fourthValid = this.validateFourthForm();
    if (fourthValid) {
      console.log("fourthValid");
      this.fourthBtn = true;

      this.toastr.success(
        'Step 4 completed', 'Success',
        {
          disableTimeOut: false,
        }
      );
      this.toastr.success(
        'Please Fill up Step 5', '',
        {
          disableTimeOut: false,
        }
      );
    }
  }


  checkForm5() {
    let fifthValid = this.validatefifthForm();
    if (fifthValid) {
      console.log("fifthValid");
      this.finalBtn = true;

      this.toastr.success(
        'Step 5 completed', 'Success',
        {
          disableTimeOut: false,
        }
      );
    }
  }




  checkPill() {
    let firstValid = this.validateFirstForm();
    if (firstValid) {
      console.log("firstValid");
      this.firstBtn = true;
    }
    let secondValid = this.validatesecondForm();
    if (secondValid) {
      console.log("secondValid");
      this.secondBtn = true;
    }
    // let thirdValid = this.validateThirdForm();
    // if (thirdValid) {
    //   console.log("thirdValid");
    //   this.thirdBtn = true;
    // }
  }


  validateFirstForm = () => {
    console.log('validateFirstForm', this.memberData);
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
    return true;
  }

  validatesecondForm = () => {
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
        "Please add Mobile No.: in (Guarantor's Application)",
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
    return true;
  }

  validateThirdForm = () => {
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
        'Please add Mobile Number: in (Nomination)',
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
    return true
  }

  validateFourthForm = () => {
    if (
      this.memberData.c_bank_name === '' ||
      this.memberData.c_bank_name === null ||
      this.memberData.c_bank_name === undefined
    ) {
      this.toastr.warning(
        'Please add Name of the drawee bank: in ( Post-Dated Cheques )',
        'Warning',
        {
          disableTimeOut: false,
        }
      );
      return false;
    }
    if (
      this.memberData.c_br_name === '' ||
      this.memberData.c_br_name === null ||
      this.memberData.c_br_name === undefined
    ) {
      this.toastr.warning(
        'Please add Name of the drawee branch: in ( Post-Dated Cheques )',
        'Warning',
        {
          disableTimeOut: false,
        }
      );
      return false;
    }
    if (
      this.memberData.c_account === '' ||
      this.memberData.c_account === null ||
      this.memberData.c_account === undefined
    ) {
      this.toastr.warning(
        'Please add SB A/c OR Current A/c: in ( Post-Dated Cheques )',
        'Warning',
        {
          disableTimeOut: false,
        }
      );
      return false;
    }
    if (
      this.memberData.c_name_in_ac === '' ||
      this.memberData.c_name_in_ac === null ||
      this.memberData.c_name_in_ac === undefined
    ) {
      this.toastr.warning(
        'Please add Name in A/c: in ( Post-Dated Cheques )',
        'Warning',
        {
          disableTimeOut: false,
        }
      );
      return false;
    }
    if (
      this.memberData.c_micr === '' ||
      this.memberData.c_micr === null ||
      this.memberData.c_micr === undefined
    ) {
      this.toastr.warning(
        'Please add MICR Sort Code (9 digits): in ( Post-Dated Cheques )',
        'Warning',
        {
          disableTimeOut: false,
        }
      );
      return false;
    }
    if (
      this.memberData.c_ck_leave === '' ||
      this.memberData.c_ck_leave === null ||
      this.memberData.c_ck_leave === undefined
    ) {
      this.toastr.warning(
        'Please add Number of Cheque Leavs: in ( Post-Dated Cheques )',
        'Warning',
        {
          disableTimeOut: false,
        }
      );
      return false;
    }
    if (
      this.memberData.c_commencement === '' ||
      this.memberData.c_commencement === null ||
      this.memberData.c_commencement === undefined
    ) {
      this.toastr.warning(
        'Please add Date of Commencement: in ( Post-Dated Cheques )',
        'Warning',
        {
          disableTimeOut: false,
        }
      );
      return false;
    }
    if (
      this.memberData.c_ck_number === '' ||
      this.memberData.c_ck_number === null ||
      this.memberData.c_ck_number === undefined
    ) {
      this.toastr.warning(
        'Please add Cheques Numbers: in ( Post-Dated Cheques )',
        'Warning',
        {
          disableTimeOut: false,
        }
      );
      return false;
    }
    if (
      this.memberData.c_ck_amnt === '' ||
      this.memberData.c_ck_amnt === null ||
      this.memberData.c_ck_amnt === undefined
    ) {
      this.toastr.warning(
        'Please add Amount of Cheques: in ( Post-Dated Cheques )',
        'Warning',
        {
          disableTimeOut: false,
        }
      );
      return false;
    }
    return true;
  }

  validatefifthForm = () => {
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
        "Please add Mobile No.: in (Guarantor's Application)",
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
      if (
        this.memberData.g_emp_othr_incm === '' ||
        this.memberData.g_emp_othr_incm === null ||
        this.memberData.g_emp_othr_incm === undefined
      ) {
        this.toastr.warning(
          "Please add Others income if any: in (Guarantor's Application)",
          'Warning',
          {
            disableTimeOut: false,
          }
        );
        return false;
      }
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
        'Please add Mobile Number: in (Nomination)',
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
    if (
      this.memberData.c_bank_name === '' ||
      this.memberData.c_bank_name === null ||
      this.memberData.c_bank_name === undefined
    ) {
      this.toastr.warning(
        'Please add Name of the drawee bank: in ( Post-Dated Cheques )',
        'Warning',
        {
          disableTimeOut: false,
        }
      );
      return false;
    }
    if (
      this.memberData.c_br_name === '' ||
      this.memberData.c_br_name === null ||
      this.memberData.c_br_name === undefined
    ) {
      this.toastr.warning(
        'Please add Name of the drawee branch: in ( Post-Dated Cheques )',
        'Warning',
        {
          disableTimeOut: false,
        }
      );
      return false;
    }
    if (
      this.memberData.c_account === '' ||
      this.memberData.c_account === null ||
      this.memberData.c_account === undefined
    ) {
      this.toastr.warning(
        'Please add SB A/c OR Current A/c: in ( Post-Dated Cheques )',
        'Warning',
        {
          disableTimeOut: false,
        }
      );
      return false;
    }
    if (
      this.memberData.c_name_in_ac === '' ||
      this.memberData.c_name_in_ac === null ||
      this.memberData.c_name_in_ac === undefined
    ) {
      this.toastr.warning(
        'Please add Name in A/c: in ( Post-Dated Cheques )',
        'Warning',
        {
          disableTimeOut: false,
        }
      );
      return false;
    }
    if (
      this.memberData.c_micr === '' ||
      this.memberData.c_micr === null ||
      this.memberData.c_micr === undefined
    ) {
      this.toastr.warning(
        'Please add MICR Sort Code (9 digits): in ( Post-Dated Cheques )',
        'Warning',
        {
          disableTimeOut: false,
        }
      );
      return false;
    }
    if (
      this.memberData.c_ck_leave === '' ||
      this.memberData.c_ck_leave === null ||
      this.memberData.c_ck_leave === undefined
    ) {
      this.toastr.warning(
        'Please add Number of Cheque Leavs: in ( Post-Dated Cheques )',
        'Warning',
        {
          disableTimeOut: false,
        }
      );
      return false;
    }
    if (
      this.memberData.c_commencement === '' ||
      this.memberData.c_commencement === null ||
      this.memberData.c_commencement === undefined
    ) {
      this.toastr.warning(
        'Please add Date of Commencement: in ( Post-Dated Cheques )',
        'Warning',
        {
          disableTimeOut: false,
        }
      );
      return false;
    }
    if (
      this.memberData.c_ck_number === '' ||
      this.memberData.c_ck_number === null ||
      this.memberData.c_ck_number === undefined
    ) {
      this.toastr.warning(
        'Please add Cheques Numbers: in ( Post-Dated Cheques )',
        'Warning',
        {
          disableTimeOut: false,
        }
      );
      return false;
    }
    if (
      this.memberData.c_ck_amnt === '' ||
      this.memberData.c_ck_amnt === null ||
      this.memberData.c_ck_amnt === undefined
    ) {
      this.toastr.warning(
        'Please add Amount of Cheques: in ( Post-Dated Cheques )',
        'Warning',
        {
          disableTimeOut: false,
        }
      );
      return false;
    }
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










}
