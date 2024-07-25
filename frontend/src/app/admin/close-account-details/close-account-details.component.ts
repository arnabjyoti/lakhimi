import { Component, OnInit } from '@angular/core';
import { CloseAccountDetailsService } from './close-account-details.service';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { NgxPrintModule } from 'ngx-print';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-close-account-details',
  templateUrl: './close-account-details.component.html',
  styleUrls: ['./close-account-details.component.css'],
  standalone: true,
  imports: [NgxPrintModule, NgxSpinnerModule, RouterModule, MatTableModule, MatPaginatorModule, MatButtonModule, MatInputModule, FormsModule, MatFormFieldModule, CommonModule],
})
export class CloseAccountDetailsComponent implements OnInit{



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

  public inputForm: any = {};
  public tokenData: any;
  public isFA = false;
  public isBM = false;
  public isCM = false;
  public isMD = false;
  public isLO = false;
  public userId: any;

  public isLodaing = true;

  constructor(
    private CloseAccountDetailsService: CloseAccountDetailsService,
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
      if (this.inputForm.userId == this.userId) {
        this.isFA = true;
        console.log("caaaaaaaaaaaaaaaaaaaaaaaaaa");
      } else {
        console.log("else part")
      }
    }
    if (token['usr'].position == "Branch Manager") {
      if (this.inputForm.brunchId == token['brunch'].brunchId) {
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
    this.CloseAccountDetailsService.CloseAcDataById(this.rqstId, (res: any) => {
      console.log("ResDetails==", res);
      this.isLodaing = false;
      this.inputForm.id = res.id;
        this.inputForm.closing_type = res.closing_type;
        this.inputForm.claim_for = res.claim_for;
        this.inputForm.type_of_ac = res.type_of_ac;
        this.inputForm.specify = res.specify;
        this.inputForm.new_ac_no = res.new_ac_no;
        this.inputForm.open_date = res.open_date;
        this.inputForm.end_date = res.end_date;
        this.inputForm.claiming_ac_holder_name = res.claiming_ac_holder_name;
        this.inputForm.claiming_ac_no = res.claiming_ac_no;
        this.inputForm.claiming_c_id = res.claiming_c_id;
        this.inputForm.claiming_opening_date = res.claiming_opening_date;
        this.inputForm.claiming_closing_date = res.claiming_closing_date;
        this.inputForm.claiming_agent_name = res.claiming_agent_name;
        this.inputForm.claiming_code = res.claiming_code;
        this.inputForm.claiming_branch_name = res.claiming_branch_name;
        this.inputForm.nominee_name = res.nominee_name;
        this.inputForm.address = res.address;
        this.inputForm.cause = res.cause;
        this.inputForm.bank_name = res.bank_name;
        this.inputForm.br_name = res.br_name;
        this.inputForm.name_ac = res.name_ac;
        this.inputForm.ac_no = res.ac_no;
        this.inputForm.ifsc = res.ifsc;
        this.inputForm.apply_date = res.apply_date;
        this.inputForm.passbook_lakhimi = res.passbook_lakhimi;
        this.inputForm.passbook_bank = res.passbook_bank;

        this.inputForm.bm_status = res.bm_status;
        this.inputForm.bm_reason = res.bm_reason;
        this.inputForm.bm_fwd_date = res.bm_fwd_date;

        this.inputForm.lo_status = res.lo_status;
        this.inputForm.lo_reason = res.lo_reason;
        this.inputForm.lo_fwd_date = res.lo_fwd_date;

        this.inputForm.md_status = res.md_status;
        this.inputForm.md_reason = res.md_reason;
        this.inputForm.md_fwd_date = res.md_fwd_date;

        this.inputForm.cm_status = res.cm_status;
        this.inputForm.cm_reason = res.cm_reason;
        this.inputForm.cm_fwd_date = res.cm_fwd_date;

        // user name
      this.inputForm.fieldAgent_frm_applied = res["user.f_name"]+ " "+res["user.l_name"];

      // branch name
      this.inputForm.branch_frm_applied = res["brunch.brunch_name"];
      this.inputForm.branchCode_frm_applied = res["brunch.brunch_code"];
  })
  }

  
  updateBMStatus() {
    this.bmInput.bm_fwd_date = this.myDate;
    this.bmInput.id = this.rqstId;
    this.bmInput.bm_status = "Forwarded";
    console.log("bmInput", this.bmInput);


      this.CloseAccountDetailsService.updateBMstatus(this.bmInput, (res: any) => {

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

      this.CloseAccountDetailsService.rejectBMstatus(this.bmInput, (res: any) => {

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

      this.CloseAccountDetailsService.updateLOstatus(this.loInput, (res: any) => {

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

      this.CloseAccountDetailsService.rejectLOstatus(this.loInput, (res: any) => {

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

      this.CloseAccountDetailsService.updateMDstatus(this.mdInput, (res: any) => {

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

      this.CloseAccountDetailsService.rejectMDstatus(this.mdInput, (res: any) => {

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

      this.CloseAccountDetailsService.updateCMstatus(this.cmInput, (res: any) => {

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

      this.CloseAccountDetailsService.rejectCMstatus(this.cmInput, (res: any) => {

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