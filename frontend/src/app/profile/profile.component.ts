import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ProfileService } from './profile.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public endpoint: any;
  public user: any;
  public age: any;
  public userId: any;
  // public data:any;
  public brunchData: any = {};
  public userList: any;

  public br_name: any;
  public br_code: any;
  public br_loc: any;
  public br_cntc: any;
  public br_email: any;
  public br_addr: any;

  public isLodaing = true;

  public data: any = {
    f_name: "",
    m_name: "",
    phone_no: "",
    address: ""
  };

  public avatar: string = "Choose File";

  public uploadImageObject: any = {
    panImg: '',
    adharImg: ''
  }
  public acceptfileType: string = "image";
  public day: any;
  public month: any;

  public userData: any;
  public returnMsg: any;
  public isSaving: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private ProfileService: ProfileService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
  ) {
    this.endpoint = environment.BASE_URL;
  }
  ngOnInit(): void {
    // this.getUserList();
    this.getUserDetails();
    this.getUserDetailsById();
    this.getuserDataById();
  }

  spiner() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 9000);
  }


  getUserDetails = () => {
    let token = JSON.parse(JSON.stringify(localStorage.getItem('token')));
    token = JSON.parse(token);
    if (token) {
      this.user = token['usr'];

      this.userId = this.user.id;
      var dob = this.user.doj;
      var today = new Date();
      var birthDate = new Date(dob);
      var age = today.getFullYear() - birthDate.getFullYear();

      this.age = age;

      console.log("hhhhh", age);

    } else {
      console.log("Token not");
    }
    // console.log("I AM CITIZEN",this.user);
  }


  getuserDataById = () => {
    this.ProfileService.getuserDataById(this.userId, (callback: any) => {
      console.log("user data", callback);
      this.data = callback;
      console.log("data", this.data);

    })
  }

  getUserDetailsById = () => {
    console.log("aaaaaaaaaaaan", this.user.position);
    this.brunchData.id = this.userId;
    if (this.user.position == "Branch Manager" || this.user.position == "Field Agent") {

      this.ProfileService.getUserBrunchById(this.brunchData, (callback: any) => {
        console.log("lllllllllll", callback);
        this.br_name = callback.br_name;
        this.br_code = callback.br_code;
        this.br_loc = callback.br_loc;
        this.br_cntc = callback.br_cntc;
        this.br_email = callback.br_email;
        this.br_addr = callback.br_adrs;
      });
    } else if (this.user.position == "Cashier") {
      console.log("calll");
      this.ProfileService.getUserCAshCounterById(this.brunchData, (callback: any) => {
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


  updateProfile() {
    let formValidate = this.validateInputs();
    if (formValidate) {
      this.ProfileService.updateProfileData(this.data, (res: any) => {
        let ele: any = document.getElementById('modalClose');
        ele.click();
        this.isLodaing = false;
      })
    }
  }

  validateInputs() {
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
    if (this.data.phone_no < 1000000000 || this.data.phone_no > 9999999999) {
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


  onFileSelectedAvatar(event: any) {
    console.log(event.target.files[0].size);
    if (event.target.files.length > 0 && event.target.files[0].size < 2000000) {
      this.uploadImageObject.avatar = event.target.files[0];

      const file = event.target.files[0];
      
      const fileName = file.name;

      const fileExtension = fileName.split('.').pop().toLowerCase();
      var name = "avatar_" + this.convertDate()+ "."+fileExtension;
      var blob = event.target.files[0].slice(0, event.target.files[0].size, event.target.files[0].type);
      var newFile = new File([blob], name, { type: event.target.files[0].type });
      this.uploadImageObject.image = newFile;
      this.avatar = this.uploadImageObject.avatar
        ? this.uploadImageObject.avatar["name"]
        : "Choose File";
      console.log("imgObject===", this.uploadImageObject);
    } else {
      this.toastr.error('Image size should be less than 2 MB', 'Error', {
        disableTimeOut: false
      });
    }
    return true;
  };


  uploadAvatar() {
    console.log("Uploading photo", this.uploadImageObject);
    let isValid = this.validateAvatar();
    if (isValid) {
      this.isLodaing = true;
      this.spiner();
      console.log("input data", this.uploadImageObject);
      const formData = new FormData();
      formData.append("dbid", this.userId);
      formData.append("file", this.uploadImageObject.image);
      formData.append("panImg", this.uploadImageObject.panImg);
      formData.append("adharImg", this.uploadImageObject.adharImg);
      console.log("FORMDATA===", formData);
      console.log("dbid===", this.userId);
      this.ProfileService.uploadAvatar(
        formData,
        this.userId,
        this.acceptfileType, (response: any) => {
          this.isLodaing = false;
          this.returnMsg = response.message;
          console.log("lllllllllll", this.userId);
          this.uploadImageObject.image = "";
          this.isSaving = false;
          this.getuserDataById();
          let ele: any = document.getElementById('photoModalClose');
          ele.click();
        }
      );
    } else {
      this.isSaving = false;
    }
  }


  validateAvatar = () => {
    if (this.uploadImageObject.image === '' || this.uploadImageObject.image === null || this.uploadImageObject.image === undefined) {
      this.toastr.warning('Please select photo', 'Warning', {
        disableTimeOut: false
      });
      return false;
    }
    return true;
  }
}
