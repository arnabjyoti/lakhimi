import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AppService} from '../../app.service';
import { LoginService } from 'src/app/login/login.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-tovnav',
  templateUrl: './tovnav.component.html',
  styleUrls: ['./tovnav.component.css'],
  providers: [DatePipe]
})

export class TovnavComponent implements OnInit {
  public user:any;
  public shortName:any;
  public brunchData:any = {};
  public userId:any;
  public tokenData:any;
  public br_name:any;
  public br_code:any;
  public br_loc:any;
  public br_cntc:any;
  public br_email:any;
  public br_addr:any;
  public permission = {
    addBrunchPrivilage: false,
    addCustomerPrivilage: false,
    addFieldAgentPrivilage: false,
    addUserPrivilage: false,
    addMembershipApprovalPrivilage: false,
    addCashCounterPaymentPrivilage: false,
  };
  public myDate: any = new Date();
  constructor(
    private loginService: LoginService,
    private datePipe: DatePipe
    ) { 
      this.myDate = this.datePipe.transform(this.myDate, "EEEE, dd-MM-yyyy");
     }

  ngOnInit(): void {
    this.getUserDetails();
    this.getAccessRightsList();
    this.getUserDetailsById();
  }


  getUserDetails = () =>{
    let token = JSON.parse(JSON.stringify(localStorage.getItem('token')));
    token = JSON.parse(token);

    this.tokenData = token;
    
    if(token){
      this.user = token['usr'];
      this.userId = this.user.id;
      console.log("usr name=", this.user.f_name);
      this.shortName = this.user.f_name.substring(0, 3);
    }else{
      console.log("Token not");
    }
    // console.log("I AM CITIZEN",this.user);
  }

  getUserDetailsById = () =>{
    console.log("aaaaaaaaaaaa",this.user.position);
    this.brunchData.id = this.userId;
    if (this.user.position == "Branch Manager" || this.user.position == "Field Agent") {
      
    this.loginService.getUserBrunchById(this.brunchData, (callback: any) =>{
      // console.log("lllllllllll",callback);
      this.br_name = callback.br_name;
      this.br_code = callback.br_code;
      this.br_loc = callback.br_loc;
      this.br_cntc = callback.br_cntc;
      this.br_email = callback.br_email;
      this.br_addr = callback.br_adrs;

      this.tokenData.brunch = callback;

      // console.log("=================", this.tokenData);
      localStorage.setItem("token", JSON.stringify(this.tokenData));
    });
  }else if (this.user.position == "Cashier") {
    console.log("calll");
    this.loginService.getUserCAshCounterById(this.brunchData, (callback: any) =>{
      // console.log("lllllllllll",callback);
      this.br_name = callback.br_name;
      this.br_code = callback.br_code;
      this.br_loc = callback.br_loc;
      this.br_cntc = callback.br_cntc;
      this.br_email = callback.br_email;
      this.br_addr = callback.br_adrs;

      this.tokenData.brunch = callback;

      // console.log("=================", this.tokenData);
      localStorage.setItem("token", JSON.stringify(this.tokenData));
    });
  }
  };

  signout = () =>{
    localStorage.removeItem('token');
    const token = localStorage.getItem('token');
    if(!token){
      // this.router.navigate(['/login']);
      window.location.href="/login";
      location.reload();
    }   
  }

  getAccessRightsList = () => {
    this.permission.addBrunchPrivilage = this.loginService.return_HasAddBrunchRight();
    this.permission.addCustomerPrivilage = this.loginService.return_HasAddCustomerRight();
    this.permission.addFieldAgentPrivilage = this.loginService.return_HasAddFieldAgentRight();
    this.permission.addUserPrivilage = this.loginService.return_HasAddUserRight();
    this.permission.addMembershipApprovalPrivilage = this.loginService.return_HasMembershipApprovalRight();
    this.permission.addCashCounterPaymentPrivilage = this.loginService.return_HasAddCounterPaymentRight();
  };

}
