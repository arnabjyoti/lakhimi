import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ProfileService } from './profile.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  public user:any;
  public age:any;
  public userId:any;
  public data:any;
  public brunchData:any = {};
  public userList: any;

  public br_name:any;
  public br_code:any;
  public br_loc:any;
  public br_cntc:any;
  public br_email:any;
  public br_addr:any;


  public fund = {
    f_name: "",
    m_name: ""
  };

  constructor(
    private route: ActivatedRoute,
    private ProfileService: ProfileService,
  ) {}
  ngOnInit(): void {
    // this.getUserList();
    this.getUserDetails();
    this.getUserDetailsById();
  }

  getUserDetails = () =>{
    let token = JSON.parse(JSON.stringify(localStorage.getItem('token')));
    token = JSON.parse(token);
    if(token){
      this.user = token['usr'];

      this.userId = this.user.id;
      var dob = this.user.doj;
      var today = new Date();
      var birthDate = new Date(dob);
      var age = today.getFullYear() - birthDate.getFullYear();

      this.age = age;

      console.log("hhhhh",age);
      
    }else{
      console.log("Token not");
    }
    // console.log("I AM CITIZEN",this.user);
  }

  getUserDetailsById = () =>{
    console.log("aaaaaaaaaaaan",this.user.position);
    this.brunchData.id = this.userId;
    if (this.user.position == "Branch Manager" || this.user.position == "Field Agent") {
      
    this.ProfileService.getUserBrunchById(this.brunchData, (callback: any) =>{
      console.log("lllllllllll",callback);
      this.br_name = callback.br_name;
      this.br_code = callback.br_code;
      this.br_loc = callback.br_loc;
      this.br_cntc = callback.br_cntc;
      this.br_email = callback.br_email;
      this.br_addr = callback.br_adrs;
    });
  }else if (this.user.position == "Cashier") {
    console.log("calll");
    this.ProfileService.getUserCAshCounterById(this.brunchData, (callback: any) =>{
      // console.log("lllllllllll",callback);
      this.br_name = callback.br_name;
      this.br_code = callback.br_code;
      this.br_loc = callback.br_loc;
      this.br_cntc = callback.br_cntc;
      this.br_email = callback.br_email;
      this.br_addr = callback.br_adrs;

    });
  }
  };
}
