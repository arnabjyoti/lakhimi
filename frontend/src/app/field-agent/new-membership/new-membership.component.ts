import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { NewMembershipService } from './new-membership.service';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';



export interface brunchData {
  id: string,
  f_name: string,
  l_name: string,
  dob: string,
  phone_no: string,
  panNo: string,
  adharNo: string,
  reference_no: string,

}

@Component({
  selector: 'app-new-membership',
  templateUrl: './new-membership.component.html',
  styleUrls: ['./new-membership.component.css'],
  standalone: true,
  imports: [NgxSpinnerModule, RouterModule, MatTableModule, MatPaginatorModule, MatButtonModule, MatInputModule, FormsModule, MatFormFieldModule, CommonModule],
})
export class NewMembershipComponent implements OnInit {

  public displayedColumns: string[] = ['Sl', 'brunch_code', 'membership_id', 'brunch_location', 'brunch_adrs', 'brunch_cntct_no', 'brunch_email', 'status', 'applyDate', 'action'];
  dataSource !: MatTableDataSource<brunchData>
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;


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
    membership_id: '',
  }
  public uploadImageObject: any = {
    panImg: '',
    adharImg: ''
  }

  public selectedMember = {
    id: '',
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
    status: '',
    panCard: '',
    adharCard: '',
    panNo: '',
    adharNo: '',
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
  public endpoint: any;
  public userList: any;
  public user: any;
  public userId: any;
  public brunchId: any;
  public returnMsg: any;
  public rfrncNo: any;

  public showSaveData: boolean = false;

  public showPan: boolean = true;
  public showPanBtn: boolean = false;
  public showPanSc: boolean = true;

  public showAdhar: boolean = true;
  public showAdharBtn: boolean = false;
  public showAdharSc: boolean = true;

  public showUpload: boolean = true;

  public showPhoto: boolean = true;
  public showPhotoBtn: boolean = false;
  public showPhotoSc: boolean = true;

  public showSign: boolean = true;
  public showSignBtn: boolean = false;
  public showSignSc: boolean = true;

  public isLodaing = true;

  constructor(
    private spinner: NgxSpinnerService,
    private NewMembershipService: NewMembershipService,
    private toastr: ToastrService,
  ) {
    this.endpoint = environment.BASE_URL;
    this.init();
  }
  init = () => {
    let token = JSON.parse(JSON.stringify(localStorage.getItem('token')));
    token = JSON.parse(token);

    this.user = token['usr'];
    this.userId = this.user.id;
    this.brunchId = token['brunch'].br_id;
    console.log("zzzzzzzzzzzzzzzzzzzz", this.brunchId);

    console.log("Token=", token);
    if (!token.usr.accessKeyword) {
      console.log("gggggggggggggggggggggg");

      return;
    }
  }

  ngOnInit(): void {
    this.spiner();
    this.getAppliedMembershipById();
    // this.getAppliedMembership();
  }

  spiner() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 5000);
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


  saveData() {
    this.isSaving = true;
    this.regInput.createdBy = this.userId;
    this.regInput.brunchId = this.brunchId;
    this.regInput.reference_no = this.convertDate();
    console.log("input data", this.regInput);
    let isValid = this.validateInputs();
    if(isValid){
    this.NewMembershipService.addMembership(this.regInput, (res: any) => {
      this.returnMsg = res.message;
      this.rfrncNo = this.regInput.reference_no;
      console.log("lllllllllll", this.returnMsg);
      this.isSaving = false;
      this.showPan = false;
      this.showSaveData = true;
      this.showUpload = false;
      this.dbId = this.returnMsg;
    });
    }else{
        this.isSaving = false;
      }
  }


  uploadPan() {
    this.isLodaing = true;
    this.spiner();
    console.log("Uploading Pan", this.uploadImageObject);
    let isValid = this.validatePan();
    if (isValid) {
      this.isAllowedFile(this.uploadImageObject.image, (res: any) => {
        console.log("res", res);
        if (res == true) {
          console.log("input data", this.uploadImageObject);
          if (this.selectedMember.id != '') {
            console.log("update", this.selectedMember.id);

            const formData = new FormData();



            formData.append("dbid", this.dbId);
            formData.append("file", this.uploadImageObject.image);
            formData.append("panImg", this.uploadImageObject.panImg);
            formData.append("adharImg", this.uploadImageObject.adharImg);
            console.log("FORMDATA===", formData);
            console.log("dbid===", this.dbId);
            this.NewMembershipService.uploadPan(
              formData,
              this.dbId,
              this.acceptfileType, (response: any) => {
                this.isLodaing = false;
                this.returnMsg = response.message;
                console.log("lllllllllll", this.dbId);
                this.showAdhar = false;
                this.showPanSc = false;
                this.showPanBtn = true;
                this.uploadImageObject.image = "";
                // this.location();
                // let ele:any = document.getElementById('modalClose');
                // ele.click();
                this.isSaving = false;
                // this.getUserList();
              }
            );

          } else if (this.dbId != '') {
            console.log("entry", this.dbId);

            const formData = new FormData();



            formData.append("dbid", this.dbId);
            formData.append("file", this.uploadImageObject.image);
            formData.append("panImg", this.uploadImageObject.panImg);
            formData.append("adharImg", this.uploadImageObject.adharImg);
            console.log("FORMDATA===", formData);
            console.log("dbid===", this.dbId);
            this.NewMembershipService.uploadPan(
              formData,
              this.dbId,
              this.acceptfileType, (response: any) => {
                this.isLodaing = false;
                this.returnMsg = response.message;
                console.log("lllllllllll", this.dbId);
                this.showAdhar = false;
                this.showPanSc = false;
                this.showPanBtn = true;
                this.uploadImageObject.image = "";
                // this.location();
                // let ele:any = document.getElementById('modalClose');
                // ele.click();
                this.isSaving = false;
                // this.getUserList();
              }
            );
          }
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


  uploadAdhar() {
    this.isLodaing = true;
    this.spiner();
    console.log("Uploading Adhar", this.uploadImageObject);
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
          formData.append("adharImg", this.uploadImageObject.adharImg);
          console.log("FORMDATA===", formData);
          console.log("dbid===", this.dbId);
          this.NewMembershipService.uploadAdhar(
            formData,
            this.dbId,
            this.acceptfileType, (response: any) => {
              this.isLodaing = false;
              this.returnMsg = response.message;
              console.log("lllllllllll", this.dbId);
              this.showAdharSc = false;
              this.showAdharBtn = true;
              this.showPhoto = false;
              this.uploadImageObject.image = "";
              // this.location();
              // let ele:any = document.getElementById('modalClose');
              // ele.click();
              // this.isSaving = false;
              // this.getUserList();
            });
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

  uploadPhoto() {
    this.isLodaing = true;
    this.spiner();
    console.log("Uploading photo", this.uploadImageObject);
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
          formData.append("adharImg", this.uploadImageObject.adharImg);
          console.log("FORMDATA===", formData);
          console.log("dbid===", this.dbId);
          this.NewMembershipService.uploadPhoto(
            formData,
            this.dbId,
            this.acceptfileType, (response: any) => {
              this.isLodaing = false;
              this.returnMsg = response.message;
              console.log("lllllllllll", this.dbId);
              this.showSign = false;
              this.showPhotoSc = false;
              this.showPhotoBtn = true;
              this.uploadImageObject.image = "";
              // this.location();
              // let ele:any = document.getElementById('modalClose');
              // ele.click();
              this.isSaving = false;
              // this.getUserList();
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
    this.isLodaing = true;
    this.spiner();
    console.log("Uploading Sign", this.uploadImageObject);
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
          formData.append("adharImg", this.uploadImageObject.adharImg);
          console.log("FORMDATA===", formData);
          console.log("dbid===", this.dbId);
          this.NewMembershipService.uploadSign(
            formData,
            this.dbId,
            this.acceptfileType, (response: any) => {
              this.isLodaing = false;
              this.returnMsg = response.message;
              console.log("lllllllllll", this.dbId);
              // this.showSign = false;
              this.showSignSc = false;
              this.showSignBtn = true;
              this.uploadImageObject.image = "";
              // this.location();
              let ele: any = document.getElementById('modalClose');
              ele.click();
              this.isSaving = false;
              this.getAppliedMembershipById();
              this.resetForm();
              // this.getUserList();
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

  getAppliedMembershipById() {
    let requestObject = {};
    this.NewMembershipService.getAppliedMemberDataById(this.userId, (callback: any) => {
      this.isLodaing = false;
      console.log("bbbbbbbbbbbbbbbbbbbb", callback);
      console.log(callback);
      // this.departmentName = new MatTableDataSource(callback);
      this.dataSource = new MatTableDataSource(callback);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log("bbbbbbbbbb", this.dataSource);

    });
  }
  

  FilterChange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
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
    if (this.regInput.phone_no < 1000000000 || this.regInput.phone_no > 9999999999) {
      this.toastr.warning('Please enter 10 digit phone number.', 'Warning', {
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

  resetForm() {
    this.regInput.id = "";
    this.regInput.f_name = "";
    this.regInput.m_name = "";
    this.regInput.l_name = "";
    this.regInput.fathers_name = "";
    this.regInput.address = "";
    this.regInput.dob = "";
    this.regInput.gender = "";
    this.regInput.purpose = "";
    this.regInput.occupation = "";
    this.regInput.introducer = "";
    this.regInput.introducer_id = "";
    this.regInput.email = "";
    this.regInput.phone_no = "";
    this.regInput.panCard = "";
    this.regInput.adharCard = "";
    this.regInput.panNo = "";
    this.regInput.adharNo = "";

    this.chooseFile = "Choose File";
    this.pan = "Choose File";
    this.adhar = "Choose File";
    this.photo = "Choose File";
    this.sign = "Choose File";
    this.day = "";
    this.month = "";
    this.dbId = "";

    this.userId = "";
    this.brunchId = "";
    this.returnMsg = "";
    this.rfrncNo = "";

    this.showSaveData = false;

    this.showPan = true;
    this.showPanBtn = false;
    this.showPanSc = true;

    this.showAdhar = true;
    this.showAdharBtn = false;
    this.showAdharSc = true;

    this.showUpload = true;

    this.showPhoto = true;
    this.showPhotoBtn = false;
    this.showPhotoSc = true;

    this.showSign = true;
    this.showSignBtn = false;
    this.showSignSc = true;

  }


  showMemberUpdateModal(row: any) {
    console.log("Selected Project=", row);
    this.selectedMember = row;
    this.dbId = row.id;
    console.log("dbId", this.dbId);

    let deleteModal: any = document.getElementById("memberUpdate");
    deleteModal.classList.remove("hidden");
    deleteModal.classList.add("show");
  };

  // updateData(){
  //   const requestObject = {
  //     ID: this.selectedMember.id,
  //   }
  //   console.log("dddddddddd", requestObject);
  //   this.NewMembershipService.updatemember(requestObject, (res: any) => {
  //     this.returnMsg = res.message;
  //     console.log("lllllllllll",this.returnMsg);
  //     this.isSaving = false;
  //   });
  // }








  //for update modal

  showRequestUpdateModal(row: any) {
    console.log("Selected Project=", row);
    this.selectedMember = row;
  }


  updateData() {
    const requestObject = {
      mId: this.selectedMember.id,
      f_name: this.selectedMember.f_name,
      l_name: this.selectedMember.l_name,
      fathers_name: this.selectedMember.fathers_name,
      address: this.selectedMember.address,
      dob: this.selectedMember.dob,
      gender: this.selectedMember.gender,
      purpose: this.selectedMember.purpose,
      occupation: this.selectedMember.occupation,
      introducer: this.selectedMember.introducer,
      introducer_id: this.selectedMember.introducer_id,
      email: this.selectedMember.email,
      panNo: this.selectedMember.panNo,
      adharNo: this.selectedMember.adharNo,
    };
    let isValid = this.validateUpdateInputs();
    if (isValid) {
      this.NewMembershipService.updateMemberAplData(requestObject, (res: any) => {
        this.getAppliedMembershipById();
      });
    }
  }

  validateUpdateInputs = () => {
    console.log("Saving project before validate", this.selectedMember);
    if (this.selectedMember.f_name === '' || this.selectedMember.f_name === null || this.selectedMember.f_name === undefined) {
      this.toastr.warning('Please type first name.', 'Warning', {
        disableTimeOut: false
      });
      return false;
    }
    if (this.selectedMember.l_name === '' || this.selectedMember.l_name === null || this.selectedMember.l_name === undefined) {
      this.toastr.warning('Please type last name', 'Warning', {
        disableTimeOut: false
      });
      return false;
    }
    if (this.selectedMember.fathers_name === '' || this.selectedMember.fathers_name === null || this.selectedMember.fathers_name === undefined) {
      this.toastr.warning('Please type fathers name', 'Warning', {
        disableTimeOut: false
      });
      return false;
    }
    if (this.selectedMember.dob === '' || this.selectedMember.dob === null || this.selectedMember.dob === undefined) {
      this.toastr.warning('Please type date of birth', 'Warning', {
        disableTimeOut: false
      });
      return false;
    }
    if (this.selectedMember.gender === '' || this.selectedMember.gender === null || this.selectedMember.gender === undefined) {
      this.toastr.warning('Please select gender', 'Warning', {
        disableTimeOut: false
      });
      return false;
    }
    if (this.selectedMember.address === '' || this.selectedMember.address === null || this.selectedMember.address === undefined) {
      this.toastr.warning('Please type address', 'Warning', {
        disableTimeOut: false
      });
      return false;
    }
    if (this.selectedMember.panNo === '' || this.selectedMember.panNo === null || this.selectedMember.panNo === undefined) {
      this.toastr.warning('Please type PAN card number', 'Warning', {
        disableTimeOut: false
      });
      return false;
    }
    if (this.selectedMember.adharNo === '' || this.selectedMember.adharNo === null || this.selectedMember.adharNo === undefined) {
      this.toastr.warning('Please type adhar number', 'Warning', {
        disableTimeOut: false
      });
      return false;
    }
    if (this.selectedMember.purpose === '' || this.selectedMember.purpose === null || this.selectedMember.purpose === undefined) {
      this.toastr.warning('Please type purpose of membership', 'Warning', {
        disableTimeOut: false
      });
      return false;
    }
    if (this.selectedMember.occupation === '' || this.selectedMember.occupation === null || this.selectedMember.occupation === undefined) {
      this.toastr.warning('Please type occupation', 'Warning', {
        disableTimeOut: false
      });
      return false;
    }
    if (this.selectedMember.introducer === '' || this.selectedMember.introducer === null || this.selectedMember.introducer === undefined) {
      this.toastr.warning('Please type introducer member name', 'Warning', {
        disableTimeOut: false
      });
      return false;
    }
    return true;
  }
}
