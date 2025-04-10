import { Component, OnInit } from '@angular/core';
import { AccountRequestDetailsService } from './account-request-details.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/app.service';
import { LoginService } from 'src/app/login/login.service';
import { environment } from 'src/environments/environment';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-account-request-details',
  templateUrl: './account-request-details.component.html',
  styleUrls: ['./account-request-details.component.css'],
  standalone: true,
  imports: [RouterModule, MatTableModule, MatPaginatorModule, MatButtonModule, MatInputModule,FormsModule, MatFormFieldModule,CommonModule],
})
export class AccountRequestDetailsComponent implements OnInit{


  public regInput:any = {
    id: "",
    f_name: "",
    l_name: "",
    fathers_name: "",
    address: "",
    gender: "",
    dob: "",
    purpose: "",
    occupation: "",
    introducer: "",
    introducer_id: "",
    panNo: "",
    adharNo: "",
    phone_no: "",
    class: "",
    classPrice: "",
    classAdminFee: "",
    nomineeName: "",
    nomineeDOB: "",
    nomineeGender: "",
    nomineePhnoe: "",
    nomineeRelation: "",
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
    }


    public permission = {
      addMembershipApprovalPrivilage: false
    };

    public brAction:any = {
      action:''
    }
  
    public approvel:any = {
      acNo:'',
      status: 'Approved'
    }
  
    public reject:any = {
      reason:'',
      status: 'Reject'
    }


  public endpoint: any;
  public rqstId: any;
  public isLodaing:any;

  public hideAction: boolean = false;
  public showSaveData: boolean = false;


  constructor(
    private appService: AppService,
    private AccountRequestDetailsService: AccountRequestDetailsService,
    private loginService: LoginService,
    private route: ActivatedRoute,
    private toastr:ToastrService,
  ) {
    this.endpoint = environment.BASE_URL;
    this.route.paramMap.subscribe(params => {
      this.rqstId = params.get("id");
    });
  }

  ngOnInit(): void {
    this.getDataById();
  }


  getDataById = () => {
    this.AccountRequestDetailsService.getAcOpenById(this.rqstId, (res:any) => {
      console.log("ResDetails==", res);
      this.isLodaing = false;
      if (!res || res === undefined || res === null) {
        // do something
      } else {
        this.regInput = res;
        console.log("bbbb",this.regInput.type);
        
      }
    });
  };


  approve(){
    const requestObject = {
      mId: this.rqstId,
      // brunchCode: this.brunchCode,
      status: this.approvel.status,
    };
    this.AccountRequestDetailsService.updateAccountApprovel(requestObject, (res: any) => {
      this.hideAction = true;
      this.getDataById();
    });
  }

  remark(){
    const requestObject = {
      mId: this.rqstId,
      remark: this.reject.reason,
      status: this.reject.status,
    };
    this.AccountRequestDetailsService.updateAccountReject(requestObject, (res: any) => {
      this.hideAction = true;
      this.getDataById();
    });
  }


  updateData(){
    this.regInput.mId= this.rqstId,
    this.AccountRequestDetailsService.updateAccountAplData(this.regInput, (res: any) => {
      this.getDataById();
    });
 
  }


  getAccessRightsList = () => {
    this.permission.addMembershipApprovalPrivilage = this.loginService.return_HasMembershipApprovalRight();
  };
}
