import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MembershipRequestDetailsService } from './membership-request-details.service';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/app.service';
import { LoginService } from 'src/app/login/login.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-membership-request-details',
  templateUrl: './membership-request-details.component.html',
  styleUrls: ['./membership-request-details.component.css'],
  standalone: true,
  imports: [RouterModule, MatTableModule, MatPaginatorModule, MatButtonModule, MatInputModule, FormsModule, MatFormFieldModule, CommonModule],
})
export class MembershipRequestDetailsComponent implements OnInit {

  public regInput: any = {
    f_name: '',
    m_name: '',
    l_name: '',
    fathers_name: '',
    address: '',
    dob: '',
    gender: '',
    purpose: '',
    occupation: '',
    introducer: '',
    introducer_id: '',
    email: '',
    phone_no: '',
    status: 'Applied',
    panCard: '',
    adharCard: '',
    panNo: '',
    adharNo: '',
  }

  public aplcntData: any;

  public permission = {
    addMembershipApprovalPrivilage: false
  };

  public endpoint: any;
  public rqstId: any;
  public isLodaing: any;

  public user: any;
  public shortName: any;
  public brunchData: any = {};
  public userId: any;
  public tokenData: any;

  public uploadImageObject: any = {
    panImg: '',
    adharImg: ''
  }

  public brAction: any = {
    action: ''
  }

  public approvel: any = {
    acNo: '',
    status: 'Approved'
  }

  public reject: any = {
    reason: '',
    status: 'Reject'
  }

  public chooseFile: string = "Choose File";
  public pan: string = "Choose File";
  public adhar: string = "Choose File";
  public photo: string = "Choose File";
  public sign: string = "Choose File";
  public day: any;
  public month: any;
  public acceptfileType: string = "image";
  public dbId: any;


  public isSaving: boolean = false;
  public userList: any;
  public brunchCode: any;
  public returnMsg: any;
  public rfrncNo: any;

  public hideAction: boolean = false;

  public showSaveData: boolean = false;

  public showPanBtn: boolean = false;
  public showPanSc: boolean = true;

  public showAdharBtn: boolean = false;
  public showAdharSc: boolean = true;

  public showUpload: boolean = true;

  public showPhotoBtn: boolean = false;
  public showPhotoSc: boolean = true;

  public showSignBtn: boolean = false;
  public showSignSc: boolean = true;

  constructor(
    private appService: AppService,
    private MembershipRequestDetailsService: MembershipRequestDetailsService,
    private loginService: LoginService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
  ) {
    this.endpoint = environment.BASE_URL;
    this.route.paramMap.subscribe(params => {
      this.rqstId = params.get("id");
    });
  }

  ngOnInit(): void {
    this.getDataById();
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
      this.shortName = this.user.f_name.substring(0, 3);
    } else {
      console.log("Token not");
    }

    if (token['usr'].position == "Field Agent") {
      this.permission.addMembershipApprovalPrivilage = true;
    }
    if (token['usr'].position == "Field Agent" || token['usr'].position == "Brunch Manager") {
      this.brunchCode = token['brunch'].br_code;
      console.log("brunchCode", this.brunchCode);

    }
  }

  getDataById = () => {
    this.MembershipRequestDetailsService.getMembershipById(this.rqstId, (res: any) => {
      console.log("ResDetails==", res);
      this.isLodaing = false;
      if (!res || res === undefined || res === null) {
        // do something
      } else {
        this.regInput = res;
        this.aplcntData = res;
        console.log("bbbb", this.aplcntData.address);

      }
    });
  };

  updateData() {
    const requestObject = {
      mId: this.rqstId,
      f_name: this.regInput.f_name,
      l_name: this.regInput.l_name,
      fathers_name: this.regInput.fathers_name,
      address: this.regInput.address,
      dob: this.regInput.dob,
      gender: this.regInput.gender,
      purpose: this.regInput.purpose,
      occupation: this.regInput.occupation,
      introducer: this.regInput.introducer,
      introducer_id: this.regInput.introducer_id,
      email: this.regInput.email,
      panNo: this.regInput.panNo,
      adharNo: this.regInput.adharNo,
      status: "Applied"
    };
    let isValid = this.validateInputs();
    if (isValid) {
      this.MembershipRequestDetailsService.updateMemberAplData(requestObject, (res: any) => {
        this.getDataById();
      });
    }
  }



  convertDate() {
    var date = new Date();
    this.day = date.getDate();
    this.month = date.getFullYear() + "" + date.getMonth() + "" + date.getDate() + "" + date.getHours() + "" + date.getMinutes() + "" + date.getMilliseconds();
    // this.month=this.month+1;
    // if((String(this.day)).length==1)
    // this.day='0'+this.day;
    // if((String(this.month)).length==1)
    // this.month='0'+this.month;
    return this.month;
  }


  //for PAN Card
  onFileSelect(event: any) {
    console.log(event.target.files[0].size);
    if (event.target.files.length > 0 && event.target.files[0].size < 200000) {
      this.uploadImageObject.pan = event.target.files[0];


      var fff = this.convertDate();
      console.log("convert date", fff);

      var fileExtension = '.' + event.target.files[0].name.split('.')[1];
      console.log("extension", fileExtension);

      var prefix = event.target.files[0].name.split('.')[0];
      console.log("prefix", prefix);

      var name = "PAN" + this.convertDate() + fileExtension;
      console.log("name", name);

      var blob = event.target.files[0].slice(0, event.target.files[0].size, event.target.files[0].type);
      console.log("blob", blob);

      var newFile = new File([blob], name, { type: event.target.files[0].type });
      console.log("newfile", newFile);
      this.uploadImageObject.image = newFile;




      this.pan = this.uploadImageObject.pan
        ? this.uploadImageObject.pan["name"]
        : "Choose File";
      console.log("Choose", this.chooseFile);
      console.log("imgObject===", this.uploadImageObject);
    } else {
      this.toastr.error('Image size should be less than 200kb', 'Error', {
        disableTimeOut: false
      });
    }
    return true;
  };

  onFileSelected(event: any) {
    console.log("onFileSelected", event.target.files);
    if (event.target.files.length > 0 && event.target.files[0].size < 200000) {
      this.uploadImageObject.adhar = event.target.files[0];

      var fff = this.convertDate();
      console.log("convert date", fff);

      var fileExtension = '.' + event.target.files[0].name.split('.')[1];
      console.log("extension", fileExtension);

      var prefix = event.target.files[0].name.split('.')[0];
      console.log("prefix", prefix);

      var name = "ADHAR" + this.convertDate() + fileExtension;
      console.log("name", name);

      var blob = event.target.files[0].slice(0, event.target.files[0].size, event.target.files[0].type);
      console.log("blob", blob);

      var newFile = new File([blob], name, { type: event.target.files[0].type });
      console.log("newfile", newFile);
      this.uploadImageObject.image = newFile;

      this.adhar = this.uploadImageObject.adhar
        ? this.uploadImageObject.adhar["name"]
        : "Choose File";
      console.log("Choose", this.adhar);
      console.log("imgObject===", this.uploadImageObject);
    } else {
      this.toastr.error('Image size should be less than 200kb', 'Error', {
        disableTimeOut: false
      });
    }
    return true;
  };

  onFileSelectedPhoto(event: any) {
    console.log("onFileSelected", event.target.files);
    if (event.target.files.length > 0 && event.target.files[0].size < 200000) {
      this.uploadImageObject.photo = event.target.files[0];

      var fff = this.convertDate();
      console.log("convert date", fff);

      var fileExtension = '.' + event.target.files[0].name.split('.')[1];
      console.log("extension", fileExtension);

      var prefix = event.target.files[0].name.split('.')[0];
      console.log("prefix", prefix);

      var name = "PHOTO" + this.convertDate() + fileExtension;
      console.log("name", name);

      var blob = event.target.files[0].slice(0, event.target.files[0].size, event.target.files[0].type);
      console.log("blob", blob);

      var newFile = new File([blob], name, { type: event.target.files[0].type });
      console.log("newfile", newFile);
      this.uploadImageObject.image = newFile;

      this.photo = this.uploadImageObject.photo
        ? this.uploadImageObject.photo["name"]
        : "Choose File";
      console.log("Choose", this.photo);
      console.log("imgObject===", this.uploadImageObject);
    } else {
      this.toastr.error('Image size should be less than 200kb', 'Error', {
        disableTimeOut: false
      });
    }
    return true;
  };


  onFileSelectedsign(event: any) {
    console.log("onFileSelected", event.target.files);
    if (event.target.files.length > 0 && event.target.files[0].size < 200000) {
      this.uploadImageObject.sign = event.target.files[0];

      var fff = this.convertDate();
      console.log("convert date", fff);

      var fileExtension = '.' + event.target.files[0].name.split('.')[1];
      console.log("extension", fileExtension);

      var prefix = event.target.files[0].name.split('.')[0];
      console.log("prefix", prefix);

      var name = "Sign" + this.convertDate() + fileExtension;
      console.log("name", name);

      var blob = event.target.files[0].slice(0, event.target.files[0].size, event.target.files[0].type);
      console.log("blob", blob);

      var newFile = new File([blob], name, { type: event.target.files[0].type });
      console.log("newfile", newFile);
      this.uploadImageObject.image = newFile;

      this.sign = this.uploadImageObject.sign
        ? this.uploadImageObject.sign["name"]
        : "Choose File";
      console.log("Choose", this.sign);
      console.log("imgObject===", this.uploadImageObject);
    } else {
      this.toastr.error('Image size should be less than 200kb', 'Error', {
        disableTimeOut: false
      });
    }
    return true;
  };

  uploadPan() {
    console.log("Uploading Pan", this.uploadImageObject);
    this.dbId = this.rqstId;
    let isValid = this.validatePan();
    if (isValid) {
      this.isAllowedFile(this.uploadImageObject.image, (res: any) => {
        console.log("res", res);
        if (res == true) {
          console.log("input data", this.uploadImageObject);
          const formData = new FormData();
          formData.append("dbid", this.dbId);
          formData.append("file", this.uploadImageObject.image);
          formData.append("panImg", this.uploadImageObject.panImg);
          formData.append("status", "Applied");
          console.log("FORMDATA===", formData);
          console.log("dbid===", this.dbId);
          this.MembershipRequestDetailsService.uploadPan(
            formData,
            this.dbId,
            this.acceptfileType, (response: any) => {
              this.returnMsg = response.message;
              console.log("lllllllllll", this.dbId);
              this.showPanSc = false;
              this.showPanBtn = true;
              this.uploadImageObject.image = "";
              this.isSaving = false;
              this.getDataById();
            }
          );
        } else {
          this.toastr.error('Invalid image file', 'Error', {
            disableTimeOut: false
          });
        }

      });
    } else {
      this.isSaving = false;
    }
  }


  uploadAdhar() {
    console.log("Uploading Adhar", this.uploadImageObject);
    this.dbId = this.rqstId;
    let isValid = this.validatePan();
    if (isValid) {
      this.isAllowedFile(this.uploadImageObject.image, (res: any) => {
        console.log("res", res);
        if (res == true) {
          console.log("input data", this.uploadImageObject);
          const formData = new FormData();
          formData.append("dbid", this.dbId);
          formData.append("file", this.uploadImageObject.image);
          formData.append("panImg", this.uploadImageObject.panImg);
          formData.append("status", "Applied");
          console.log("FORMDATA===", formData);
          console.log("dbid===", this.dbId);
          this.MembershipRequestDetailsService.uploadAdhar(
            formData,
            this.dbId,
            this.acceptfileType, (response: any) => {
              this.returnMsg = response.message;
              console.log("lllllllllll", this.dbId);
              this.showAdharSc = false;
              this.showAdharBtn = true;
              this.uploadImageObject.image = "";
              this.getDataById();
            }
          );
        } else {
          this.toastr.error('Invalid image file', 'Error', {
            disableTimeOut: false
          });
        }
      });
    } else {
      this.isSaving = false;
    }
  }

  uploadPhoto() {
    console.log("Uploading photo", this.uploadImageObject);
    this.dbId = this.rqstId;
    let isValid = this.validatePan();
    if (isValid) {
      this.isAllowedFile(this.uploadImageObject.image, (res: any) => {
        console.log("res", res);
        if (res == true) {
          console.log("input data", this.uploadImageObject);
          const formData = new FormData();
          formData.append("dbid", this.dbId);
          formData.append("file", this.uploadImageObject.image);
          formData.append("panImg", this.uploadImageObject.panImg);
          formData.append("status", "Applied");
          console.log("FORMDATA===", formData);
          console.log("dbid===", this.dbId);
          this.MembershipRequestDetailsService.uploadPhoto(
            formData,
            this.dbId,
            this.acceptfileType, (response: any) => {
              this.returnMsg = response.message;
              console.log("lllllllllll", this.dbId);
              this.showPhotoSc = false;
              this.showPhotoBtn = true;
              this.uploadImageObject.image = "";
              this.getDataById();
            }
          );
        } else {
          this.toastr.error('Invalid image file', 'Error', {
            disableTimeOut: false
          });
        }
      }
      );
    } else {
      this.isSaving = false;
    }
  }


  uploadSign() {
    console.log("Uploading Sign", this.uploadImageObject);
    this.dbId = this.rqstId;
    let isValid = this.validatePan();
    if (isValid) {
      this.isAllowedFile(this.uploadImageObject.image, (res: any) => {
        console.log("res", res);
        if (res == true) {
          console.log("input data", this.uploadImageObject);
          const formData = new FormData();
          formData.append("dbid", this.dbId);
          formData.append("file", this.uploadImageObject.image);
          formData.append("panImg", this.uploadImageObject.panImg);
          formData.append("status", "Applied");
          console.log("FORMDATA===", formData);
          console.log("dbid===", this.dbId);
          this.MembershipRequestDetailsService.uploadSign(
            formData,
            this.dbId,
            this.acceptfileType, (response: any) => {
              this.returnMsg = response.message;
              console.log("lllllllllll", this.dbId);
              // this.showSign = false;
              this.showSignSc = false;
              this.showSignBtn = true;
              this.uploadImageObject.image = "";
              this.isSaving = false;
              this.getDataById();
            }
          );
        } else {
          this.toastr.error('Invalid image file', 'Error', {
            disableTimeOut: false
          });
        }
      }
      );
    } else {
      this.isSaving = false;
    }
  }

  validateInputs = () => {
    console.log("Saving project before validate", this.regInput);
    if (this.regInput.f_name === '' || this.regInput.f_name === null || this.regInput.f_name === undefined) {
      this.toastr.warning('Please type first name.', 'Warning', {
        disableTimeOut: false
      });
      return false;
    }
    if (this.regInput.l_name === '' || this.regInput.l_name === null || this.regInput.l_name === undefined) {
      this.toastr.warning('Please type last name', 'Warning', {
        disableTimeOut: false
      });
      return false;
    }
    if (this.regInput.fathers_name === '' || this.regInput.fathers_name === null || this.regInput.fathers_name === undefined) {
      this.toastr.warning('Please type fathers name', 'Warning', {
        disableTimeOut: false
      });
      return false;
    }
    if (this.regInput.dob === '' || this.regInput.dob === null || this.regInput.dob === undefined) {
      this.toastr.warning('Please type date of birth', 'Warning', {
        disableTimeOut: false
      });
      return false;
    }
    if (this.regInput.gender === '' || this.regInput.gender === null || this.regInput.gender === undefined) {
      this.toastr.warning('Please select gender', 'Warning', {
        disableTimeOut: false
      });
      return false;
    }
    if (this.regInput.address === '' || this.regInput.address === null || this.regInput.address === undefined) {
      this.toastr.warning('Please type address', 'Warning', {
        disableTimeOut: false
      });
      return false;
    }
    if (this.regInput.panNo === '' || this.regInput.panNo === null || this.regInput.panNo === undefined) {
      this.toastr.warning('Please type PAN card number', 'Warning', {
        disableTimeOut: false
      });
      return false;
    }
    if (this.regInput.adharNo === '' || this.regInput.adharNo === null || this.regInput.adharNo === undefined) {
      this.toastr.warning('Please type adhar number', 'Warning', {
        disableTimeOut: false
      });
      return false;
    }
    if (this.regInput.purpose === '' || this.regInput.purpose === null || this.regInput.purpose === undefined) {
      this.toastr.warning('Please type purpose of membership', 'Warning', {
        disableTimeOut: false
      });
      return false;
    }
    if (this.regInput.occupation === '' || this.regInput.occupation === null || this.regInput.occupation === undefined) {
      this.toastr.warning('Please type occupation', 'Warning', {
        disableTimeOut: false
      });
      return false;
    }
    if (this.regInput.introducer === '' || this.regInput.introducer === null || this.regInput.introducer === undefined) {
      this.toastr.warning('Please type introducer member name', 'Warning', {
        disableTimeOut: false
      });
      return false;
    }
    return true;
  }

  validatePan = () => {
    if (this.uploadImageObject.image === '' || this.uploadImageObject.image === null || this.uploadImageObject.image === undefined) {
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



  getAccessRightsList = () => {
    this.permission.addMembershipApprovalPrivilage = this.loginService.return_HasMembershipApprovalRight();
  };
}
