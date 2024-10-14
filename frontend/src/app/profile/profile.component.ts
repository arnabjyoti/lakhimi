import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ProfileService } from './profile.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  public user:any;
  public age:any;
  public userId:any;
  // public data:any;
  public brunchData:any = {};
  public userList: any;

  public br_name:any;
  public br_code:any;
  public br_loc:any;
  public br_cntc:any;
  public br_email:any;
  public br_addr:any;

  public isLodaing = true;

  public data:any = {
    f_name: "",
    m_name: "",
    phone_no: "",
    address: ""
  };

  public userData:any;

  constructor(
    private route: ActivatedRoute,
    private ProfileService: ProfileService,
    private toastr: ToastrService,
  ) {}
  ngOnInit(): void {
    // this.getUserList();
    this.getUserDetails();
    this.getUserDetailsById();
    this.getuserDataById();
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


  getuserDataById = () =>{
    this.ProfileService.getuserDataById(this.userId, (callback: any) =>{
      console.log("user data",callback);
      this.data = callback;
      console.log("data", this.data);
      
    })
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


  updateProfile(){
    let formValidate = this.validateInputs();
    if (formValidate) {
    this.ProfileService.updateProfileData(this.data, (res: any) => {
      let ele:any = document.getElementById('modalClose');
    ele.click();
      this.isLodaing = false;
    })
  }
  }

  validateInputs(){
    console.log("Saving project before validate", this.data);
  if (this.data.f_name === '' || this.data.f_name === null || this.data.f_name === undefined) {
    this.toastr.warning('Please type first name', 'Warning', {
      disableTimeOut: false
    });
    return false;
  }
  if (this.data.l_name === '' || this.data.l_name === null || this.data.l_name === undefined) {
    this.toastr.warning('Please type last name', 'Warning', {
      disableTimeOut: false
    });
    return false;
  }
  if (this.data.phone_no < 1000000000 || this.data.phone_no  > 9999999999) {
    this.toastr.warning('Please type phone number', 'Warning', {
      disableTimeOut: false
    });
    return false;
  }
  if (this.data.address === '' || this.data.address === null || this.data.address === undefined) {
    this.toastr.warning('Please type address', 'Warning', {
      disableTimeOut: false
    });
    return false;
  }
  return true;
  }
}
