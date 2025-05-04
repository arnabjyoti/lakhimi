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
import { NgxSpinnerService } from 'ngx-spinner';

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

  // public uploadImageObject: any = {
  //   panImg: '',
  //   adharImg: ''
  // }

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


  uploadImageObject: any = {
    pan: null,
    adhar: null,
    photo: null,
    sign: null,
    imageFiles: {
      pan: null,
      adhar: null,
      photo: null,
      sign: null,
    }
  };
  
  photoLabels: any = {
    pan: 'Choose File',
    adhar: 'Choose File',
    photo: 'Choose File',
    sign: 'Choose File',
  };

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
    private spinner: NgxSpinnerService,
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


  spiner() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 5000);
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
      // panNo: this.regInput.panNo,
      // adharNo: this.regInput.adharNo,
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

  
  onPhotoSelected(event: any, field: string) {
    const allowedTypes = ['jpeg', 'jpg', 'png'];
  
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const fileSizeLimit = 200 * 1024; // 200kb
  
      const fileName = file.name;
      const fileExtension = fileName.split('.').pop().toLowerCase();
  
      if (!allowedTypes.includes(fileExtension)) {
        this.toastr.error('Only JPG, JPEG, or PNG files are allowed', 'Invalid File Type', {
          disableTimeOut: false
        });
        return;
      }
  
      if (file.size > fileSizeLimit) {
        this.toastr.error('File size should be less than 2 KB', 'Error', {
          disableTimeOut: false
        });
        return;
      }
  
      const newName = `${field.toUpperCase()}_${this.convertDate()}.${fileExtension}`;
      const blob = file.slice(0, file.size, file.type);
      const renamedFile = new File([blob], newName, { type: file.type });
  
      this.uploadImageObject[field] = file;
      this.uploadImageObject.imageFiles[field] = renamedFile;
      this.photoLabels[field] = file.name;
    }
  }


  

  uploadPan() {
    if(this.uploadImageObject.imageFiles.pan != null){
      this.dbId = this.rqstId;
      this.isLodaing = true;
      this.spiner();
      const formData = new FormData();
          formData.append("dbid", this.dbId);
          formData.append("file", this.uploadImageObject.imageFiles.pan);
          formData.append("photo_number", "pan");
          formData.append("status", "Applied");
          this.MembershipRequestDetailsService.uploadAllMembershipImages(
            formData,
            this.acceptfileType, (response: any) => {
              this.isLodaing = false;
              this.returnMsg = response.message;
              this.showPanSc = false;
              this.showPanBtn = true;
              this.uploadImageObject.image = "";
              this.isSaving = false;
              this.getDataById();
            }
          );
  }else{
    this.toastr.warning("Photo not selected", "Warning!", {
      disableTimeOut: false
    });
  }
}


  uploadAdhar() {
    if(this.uploadImageObject.imageFiles.adhar != null){
      this.dbId = this.rqstId;
      this.isLodaing = true;
      this.spiner();
      const formData = new FormData();
          formData.append("dbid", this.dbId);
          formData.append("file", this.uploadImageObject.imageFiles.adhar);
          formData.append("photo_number", "adhar");
          formData.append("status", "Applied");
          this.MembershipRequestDetailsService.uploadAllMembershipImages(
            formData,
            this.acceptfileType, (response: any) => {
              this.isLodaing = false;
              this.returnMsg = response.message;
              this.showAdharSc = false;
              this.showAdharBtn = true;
              this.uploadImageObject.image = "";
              this.isSaving = false;
              this.getDataById();
            }
          );
  }else{
    this.toastr.warning("Photo not selected", "Warning!", {
      disableTimeOut: false
    });
  }
  }

  uploadPhoto() {
    if(this.uploadImageObject.imageFiles.photo != null){
      this.dbId = this.rqstId;
      this.isLodaing = true;
      this.spiner();
      const formData = new FormData();
          formData.append("dbid", this.dbId);
          formData.append("file", this.uploadImageObject.imageFiles.photo);
          formData.append("photo_number", "photo");
          formData.append("status", "Applied");
          this.MembershipRequestDetailsService.uploadAllMembershipImages(
            formData,
            this.acceptfileType, (response: any) => {
              this.isLodaing = false;
              this.returnMsg = response.message;
              this.showPhotoSc = false;
              this.showPhotoBtn = true;
              this.uploadImageObject.image = "";
              this.isSaving = false;
              this.getDataById();
            }
          );
  }else{
    this.toastr.warning("Photo not selected", "Warning!", {
      disableTimeOut: false
    });
  }
  }


  uploadSign() {
    if(this.uploadImageObject.imageFiles.sign != null){
      this.dbId = this.rqstId;
      this.isLodaing = true;
      this.spiner();
      const formData = new FormData();
          formData.append("dbid", this.dbId);
          formData.append("file", this.uploadImageObject.imageFiles.sign);
          formData.append("photo_number", "sign");
          formData.append("status", "Applied");
          this.MembershipRequestDetailsService.uploadAllMembershipImages(
            formData,
            this.acceptfileType, (response: any) => {
              this.isLodaing = false;
              this.returnMsg = response.message;
              this.showSignSc = false;
              this.showSignBtn = true;
              this.uploadImageObject.image = "";
              this.isSaving = false;
              this.getDataById();
            }
          );
  }else{
    this.toastr.warning("Photo not selected", "Warning!", {
      disableTimeOut: false
    });
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
