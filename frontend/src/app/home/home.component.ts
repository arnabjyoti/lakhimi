import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import * as _ from "lodash";
import * as moment from "moment";
import { LoginService } from '../login/login.service';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css',]
})
export class HomeComponent implements OnInit{

  public user:any;
  public tokenData: any;

  public brunchId: any;
  public userId: any;

  public membershipAppliedCount: any;
  public membershipApproveCount: any;
  public accountAppliedCount: any;
  public accountApproveCount: any;
  public branchCount: any;
  public branchManagerCount: any;
  public fieldAgentCount: any;
  public loanAppliedCount: any;
  public loanApproveCount: any;

  public adminloanAppliedCount: any;
  public adminloanApprovedCount: any;

  public BrmembershipAppliedCount: any;
  public BrmembershipApproveCount: any;
  public branchLoanAppliedCount: any;
  public branchLoanApprovedCount: any;

  public endpoint: any;
  public permission = {
    addBrunchPrivilage: false,
    addCustomerPrivilage: false,
    addFieldAgentPrivilage: false
  };
  public isLodaing: boolean = true;
  constructor(
    
    private spinner: NgxSpinnerService,
    private homeService: HomeService,
    private loginService: LoginService,
    private toastr: ToastrService,
  ) {
    this.endpoint = environment.BASE_URL;
    this.init();
   }

   init = () =>{
    let token = JSON.parse(JSON.stringify(localStorage.getItem('token')));
    token = JSON.parse(token);

    this.tokenData = token;
    console.log("Token=", token);
    this.user = token['usr'];
    this.isLodaing = false;
    if(!token.usr.accessKeyword){
      console.log("gggggggggggggggggggggg");
      
      return;
    }
    this.getAccessRightsList(); 
  }

  ngOnInit() {
    // this.getCache();
    this.homeCounter();
    
  }

  spiner() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 5000);
  }

  homeCounter(){
    if (this.user.role == "head_office"){
      this.headOfficeCount();
    }else if (this.user.role == "branch_manager"){
      this.branchOfficeCount();
    }else if (this.user.role == "field_agent"){
      this.fieldOfficeCount();
    }
  }


  headOfficeCount(){
    let requestObject = {};
    this.isLodaing = true;
    this.spiner();
    this.homeService.headCount(requestObject, (callback:any)=>{
      console.log(callback);
      this.isLodaing = false;
      this.membershipAppliedCount = callback.membershipAppliedCount;
      this.membershipApproveCount = callback.membershipApproveCount;
      this.accountAppliedCount = callback.accountAppliedCount;
      this.accountApproveCount = callback.accountApproveCount;
      this.branchCount = callback.branchCount;
      this.branchManagerCount = callback.branchManagerCount;
      this.fieldAgentCount = callback.fieldAgentCount;
      this.adminloanAppliedCount = callback.adminloanAppliedCount;
      this.adminloanApprovedCount = callback.adminloanApprovedCount; 
    })
  }

  branchOfficeCount(){
    this.brunchId = this.tokenData['brunch'].br_id;
    console.log("brunchId",this.brunchId);
    this.isLodaing = true;
    this.spiner();
    this.homeService.branchOfcCount(this.brunchId, (callback:any)=>{
      console.log("branchOfficeCount",callback);
      this.isLodaing = false;
      this.membershipAppliedCount = callback.membershipAppliedCount;
      this.membershipApproveCount = callback.membershipApproveCount;
      this.accountAppliedCount = callback.accountAppliedCount;
      this.accountApproveCount = callback.accountApproveCount;
      this.fieldAgentCount = callback.fieldAgentCount;
      this.branchLoanAppliedCount = callback.loanAppliedCount;
      this.branchLoanApprovedCount = callback.loanApprovedCount;

      
    })
  }

  fieldOfficeCount(){
    this.userId = this.user.id;
    console.log("userId",this.userId);
    this.isLodaing = true;
    this.spiner();
    this.homeService.fieldOfcCount(this.userId, (callback:any)=>{
      console.log("branchOfficeCount",callback);
      this.isLodaing = false;
      console.log("this.isLodaing",this.isLodaing);
      
      this.membershipAppliedCount = callback.membershipAppliedCount;
      this.membershipApproveCount = callback.membershipApproveCount;
      this.accountAppliedCount = callback.accountAppliedCount;
      this.accountApproveCount = callback.accountApproveCount;
      this.loanAppliedCount = callback.loanAppliedCount;
      this.loanApproveCount = callback.loanApproveCount;
      this.fieldAgentCount = callback.fieldAgentCount;
    })
  }

  getCache = async () => {
    const newCache = await caches.open("new-cache");
    const response = await newCache.match("yes");
  };

  getAccessRightsList = () => {
    this.permission.addBrunchPrivilage = this.loginService.return_HasAddBrunchRight();
    this.permission.addCustomerPrivilage = this.loginService.return_HasAddCustomerRight();
    this.permission.addFieldAgentPrivilage = this.loginService.return_HasAddFieldAgentRight();
  };

}
