import { Component, OnInit } from '@angular/core';
import { VendorRequestDetailsService } from './vendor-request-details.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/app.service';
import { LoginService } from 'src/app/login/login.service';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-vendor-request-details',
  templateUrl: './vendor-request-details.component.html',
  styleUrls: ['./vendor-request-details.component.css'],
  standalone: true,
  imports: [RouterModule, MatTableModule, MatPaginatorModule, MatButtonModule, MatInputModule, FormsModule, MatFormFieldModule, CommonModule],
})
export class VendorRequestDetailsComponent implements OnInit {



  public regInput: any = {
    shop_name: "",
    proprietor_name: "",
    contact_number_1: "",
    contact_number_2: "",
    contact_number_3: "",
    gst_number: "",
    ac_name: "",
    ac_number: "",
    ifsc: "",
    bank_name: "",
    bank_branch: "",
    address: "",
    city: "",
    p_o: "",
    district: "",
    state: "",
    pin_code: "",
    shop_photo: "",
    proprietor_photo: "",
    trade_license: "",
    gst_certificate: "",
    bank_stmnt: "",
    status: "",
    reference_number: "",
  }

  public permission = {
    addMembershipApprovalPrivilage: false
  };


  public uploadImageObject: any = {
    panImg: '',
    adharImg: ''
  }

  public chooseFile: string = "Choose File";
  public shop: string = "Choose File";
  public proprietor: string = "Choose File";
  public trade: string = "Choose File";
  public GST: string = "Choose File";
  public bank: string = "Choose File";
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

  public showShop: boolean = true;
  public showShopBtn: boolean = false;
  public showShopSc: boolean = true;

  public showProprietor: boolean = true;
  public showProprietorBtn: boolean = false;
  public showProprietorSc: boolean = true;

  public showUpload: boolean = true;

  public showTrade: boolean = true;
  public showTradeBtn: boolean = false;
  public showTradeSc: boolean = true;

  public showGST: boolean = true;
  public showGSTBtn: boolean = false;
  public showGSTSc: boolean = true;

  public showBank: boolean = true;
  public showBankBtn: boolean = false;
  public showBankSc: boolean = true;

  public isLodaing = true;

  public aplcntData: any;

  public rqstId: any;
  public brunchCode: any;
  public shortName: any;
  public brunchData: any = {};
  public tokenData: any;

  public userFieldAgent: boolean = true;
  public resubmit: boolean = true;


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

  constructor(
    private spinner: NgxSpinnerService,
    private appService: AppService,
    private VendorRequestDetailsService: VendorRequestDetailsService,
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
    this.getVendorById();
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
      this.userFieldAgent = true;
    }
    if (token['usr'].position == "Field Agent" || token['usr'].position == "Branch Manager") {
      this.brunchCode = token['brunch'].br_code;
      console.log("brunchCode", this.brunchCode);

    }
    if (token['usr'].position == "Branch Manager") {
      this.userFieldAgent = false;
    }
  }

  getVendorById = () => {
    this.VendorRequestDetailsService.getVendorById(this.rqstId, (res: any) => {
      console.log("ResDetails==", res);
      this.isLodaing = false;
      if (!res || res === undefined || res === null) {
      } else {
        this.regInput = res;
        this.aplcntData = res;
        console.log("bbbb", this.aplcntData.address);

        this.checkImage();
      }
    });
  };

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

  updateData() {
    const requestObject = {
      mId: this.regInput.id,

      shop_name: this.regInput.shop_name,
      proprietor_name: this.regInput.proprietor_name,
      contact_number_1: this.regInput.contact_number_1,
      contact_number_2: this.regInput.contact_number_2,
      contact_number_3: this.regInput.contact_number_3,
      gst_number: this.regInput.gst_number,
      ac_name: this.regInput.ac_name,
      ac_number: this.regInput.ac_number,
      ifsc: this.regInput.ifsc,
      bank_name: this.regInput.bank_name,
      bank_branch: this.regInput.bank_branch,
      address: this.regInput.address,
      city: this.regInput.city,
      p_o: this.regInput.p_o,
      district: this.regInput.district,
      state: this.regInput.state,
      pin_code: this.regInput.pin_code,

    };
    console.log("request object", requestObject);

    let isValid = this.validateInputs();
    if (isValid) {
    this.VendorRequestDetailsService.updateVendorAplData(requestObject, (res: any) => {
      this.getVendorById();
      this.checkImage();
    });
  }
  }

  resubmitData() {
    if (this.regInput.reference_number == null) {
      const requestObject = {
        mId: this.regInput.id,
        status: "Applied",
        reference_number: this.convertDate(),
      };
      console.log("request object 1", requestObject);
      console.log("request ", this.regInput.reference_number);
      this.VendorRequestDetailsService.resubmitVendorAplData(requestObject, (res: any) => {
        this.getVendorById();
      });
    } else {
      const requestObject = {
        mId: this.regInput.id,
        status: "Applied",
      };
      console.log("request object 2", requestObject);
      this.VendorRequestDetailsService.resubmitVendorAplData(requestObject, (res: any) => {
        this.getVendorById();
      });
    }


  }


  checkImage() {
    if (this.regInput.shop_photo === null || this.regInput.proprietor_photo === null || this.regInput.trade_license === null || this.regInput.gst_certificate === null || this.regInput.bank_stmnt === null) {
      this.resubmit = false;
    } else {
      this.resubmit = true;
    }
  }


  onFileSelectedShop(event: any) {
    if (event.target.files.length > 0 && event.target.files[0].size < 200000) {
      this.uploadImageObject.shop = event.target.files[0];
      var fileExtension = '.' + event.target.files[0].name.split('.')[1];
      var name = "SHOP" + this.convertDate() + fileExtension;
      var blob = event.target.files[0].slice(0, event.target.files[0].size, event.target.files[0].type);
      var newFile = new File([blob], name, { type: event.target.files[0].type });
      this.uploadImageObject.image = newFile;
      this.shop = this.uploadImageObject.shop
        ? this.uploadImageObject.shop["name"]
        : "Choose File";
    } else {
      this.toastr.error('Image size should be less than 200kb', 'Error', {
        disableTimeOut: false
      });
    }
    return true;
  };


  uploadShop() {
    this.isLodaing = true;
    this.spiner();
    console.log("Uploading Pan", this.uploadImageObject);
    let isValid = this.validatePan();
    if (isValid) {
      this.isAllowedFile(this.uploadImageObject.image, (res: any) => {
        console.log("res", res);
        if (res == true) {
          // console.log("input data", this.uploadImageObject);
          // if (this.regInput.id != '') {
          // console.log("update", this.regInput.id);
          const formData = new FormData();
          formData.append("dbid", this.regInput.id);
          formData.append("file", this.uploadImageObject.image);
          formData.append("panImg", this.uploadImageObject.panImg);
          formData.append("adharImg", this.uploadImageObject.adharImg);
          console.log("FORMDATA===", formData);
          console.log("dbid===", this.dbId);
          this.VendorRequestDetailsService.uploadShop(
            formData,
            this.dbId,
            this.acceptfileType, (response: any) => {
              this.isLodaing = false;
              this.returnMsg = response.message;
              console.log("lllllllllll", this.dbId);
              this.showProprietor = false;
              this.showShopSc = false;
              this.showShopBtn = true;
              this.uploadImageObject.image = "";
              this.isSaving = false;
              this.getVendorById();
              this.checkImage();
            }
          );

          // } else if (this.dbId != '') {
          //   console.log("entry", this.dbId);

          //   const formData = new FormData();



          //   formData.append("dbid", this.dbId);
          //   formData.append("file", this.uploadImageObject.image);
          //   formData.append("panImg", this.uploadImageObject.panImg);
          //   formData.append("adharImg", this.uploadImageObject.adharImg);
          //   console.log("FORMDATA===", formData);
          //   console.log("dbid===", this.dbId);
          //   this.VendorService.uploadShop(
          //     formData,
          //     this.dbId,
          //     this.acceptfileType, (response: any) => {
          //       this.isLodaing = false;
          //       this.returnMsg = response.message;
          //       console.log("lllllllllll", this.dbId);
          //       this.showProprietor = false;
          //       this.showShopSc = false;
          //       this.showShopBtn = true;
          //       this.uploadImageObject.image = "";
          //       this.isSaving = false;
          //     }
          //   );
          // }
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




  onFileSelectedProprietor(event: any) {
    if (event.target.files.length > 0 && event.target.files[0].size < 200000) {
      this.uploadImageObject.proprietor = event.target.files[0];
      var fileExtension = '.' + event.target.files[0].name.split('.')[1];
      var name = "PROPRIETOR" + this.convertDate() + fileExtension;
      var blob = event.target.files[0].slice(0, event.target.files[0].size, event.target.files[0].type);
      var newFile = new File([blob], name, { type: event.target.files[0].type });
      this.uploadImageObject.image = newFile;
      this.proprietor = this.uploadImageObject.proprietor
        ? this.uploadImageObject.proprietor["name"]
        : "Choose File";
    } else {
      this.toastr.error('Image size should be less than 200kb', 'Error', {
        disableTimeOut: false
      });
    }
    return true;
  };


  uploadProprietor() {
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
          formData.append("dbid", this.regInput.id);
          formData.append("file", this.uploadImageObject.image);
          formData.append("panImg", this.uploadImageObject.panImg);
          formData.append("adharImg", this.uploadImageObject.adharImg);
          console.log("FORMDATA===", formData);
          console.log("dbid===", this.dbId);
          this.VendorRequestDetailsService.uploadProprietor(
            formData,
            this.dbId,
            this.acceptfileType, (response: any) => {
              this.isLodaing = false;
              this.returnMsg = response.message;
              console.log("lllllllllll", this.dbId);
              this.showProprietorSc = false;
              this.showProprietorBtn = true;
              this.showTrade = false;
              this.uploadImageObject.image = "";
              this.getVendorById();
              this.checkImage();
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




  onFileSelectedTrade(event: any) {
    if (event.target.files.length > 0 && event.target.files[0].size < 200000) {
      this.uploadImageObject.trade = event.target.files[0];
      var fileExtension = '.' + event.target.files[0].name.split('.')[1];
      var name = "TRADE" + this.convertDate() + fileExtension;
      var blob = event.target.files[0].slice(0, event.target.files[0].size, event.target.files[0].type);
      var newFile = new File([blob], name, { type: event.target.files[0].type });
      this.uploadImageObject.image = newFile;
      this.trade = this.uploadImageObject.trade
        ? this.uploadImageObject.trade["name"]
        : "Choose File";
    } else {
      this.toastr.error('Image size should be less than 200kb', 'Error', {
        disableTimeOut: false
      });
    }
    return true;
  };


  uploadTrade() {
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
          formData.append("dbid", this.regInput.id);
          formData.append("file", this.uploadImageObject.image);
          formData.append("panImg", this.uploadImageObject.panImg);
          formData.append("adharImg", this.uploadImageObject.adharImg);
          console.log("FORMDATA===", formData);
          console.log("dbid===", this.dbId);
          this.VendorRequestDetailsService.uploadTrade(
            formData,
            this.dbId,
            this.acceptfileType, (response: any) => {
              this.isLodaing = false;
              this.returnMsg = response.message;
              console.log("lllllllllll", this.dbId);
              this.showGST = false;
              this.showTradeSc = false;
              this.showTradeBtn = true;
              this.uploadImageObject.image = "";
              this.isSaving = false;
              this.getVendorById();
              this.checkImage();
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





  onFileSelectedGST(event: any) {
    if (event.target.files.length > 0 && event.target.files[0].size < 200000) {
      this.uploadImageObject.GST = event.target.files[0];
      var fileExtension = '.' + event.target.files[0].name.split('.')[1];
      var name = "GST" + this.convertDate() + fileExtension;
      var blob = event.target.files[0].slice(0, event.target.files[0].size, event.target.files[0].type);
      var newFile = new File([blob], name, { type: event.target.files[0].type });
      this.uploadImageObject.image = newFile;
      this.GST = this.uploadImageObject.GST
        ? this.uploadImageObject.GST["name"]
        : "Choose File";
    } else {
      this.toastr.error('Image size should be less than 200kb', 'Error', {
        disableTimeOut: false
      });
    }
    return true;
  };

  uploadGST() {
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
          formData.append("dbid", this.regInput.id);
          formData.append("file", this.uploadImageObject.image);
          formData.append("panImg", this.uploadImageObject.panImg);
          formData.append("adharImg", this.uploadImageObject.adharImg);
          console.log("FORMDATA===", formData);
          console.log("dbid===", this.dbId);
          this.VendorRequestDetailsService.uploadGST(
            formData,
            this.dbId,
            this.acceptfileType, (response: any) => {
              this.isLodaing = false;
              this.returnMsg = response.message;
              console.log("lllllllllll", this.dbId);
              this.showBank = false;
              this.showGSTSc = false;
              this.showGSTBtn = true;
              this.uploadImageObject.image = "";
              this.isSaving = false;
              this.getVendorById();
              this.checkImage();
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



  onFileSelectedBank(event: any) {
    if (event.target.files.length > 0 && event.target.files[0].size < 200000) {
      this.uploadImageObject.bank = event.target.files[0];
      var fileExtension = '.' + event.target.files[0].name.split('.')[1];
      var name = "BANK_STMNT" + this.convertDate() + fileExtension;
      var blob = event.target.files[0].slice(0, event.target.files[0].size, event.target.files[0].type);
      var newFile = new File([blob], name, { type: event.target.files[0].type });
      this.uploadImageObject.image = newFile;
      this.bank = this.uploadImageObject.bank
        ? this.uploadImageObject.bank["name"]
        : "Choose File";
    } else {
      this.toastr.error('Image size should be less than 200kb', 'Error', {
        disableTimeOut: false
      });
    }
    return true;
  };


  uploadBank() {
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
          formData.append("dbid", this.regInput.id);
          formData.append("file", this.uploadImageObject.image);
          formData.append("panImg", this.uploadImageObject.panImg);
          formData.append("adharImg", this.uploadImageObject.adharImg);
          console.log("FORMDATA===", formData);
          console.log("dbid===", this.dbId);
          this.VendorRequestDetailsService.uploadBank(
            formData,
            this.dbId,
            this.acceptfileType, (response: any) => {
              this.isLodaing = false;
              this.returnMsg = response.message;
              console.log("lllllllllll", this.dbId);
              this.showBankSc = false;
              this.showBankBtn = true;
              this.uploadImageObject.image = "";
              this.isSaving = false;
              this.getVendorById();
              this.checkImage();
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
    if (this.regInput.shop_name === '' || this.regInput.shop_name === null || this.regInput.shop_name === undefined) {
      this.toastr.warning('Please type shop name.', 'Warning', {
        disableTimeOut: false
      });
      return false;
    }
    if (this.regInput.proprietor_name === '' || this.regInput.proprietor_name === null || this.regInput.proprietor_name === undefined) {
      this.toastr.warning('Please type proprietor name', 'Warning', {
        disableTimeOut: false
      });
      return false;
    }
    if (this.regInput.contact_number_1 < 1000000000 || this.regInput.contact_number_1 > 9999999999) {
      this.toastr.warning('Please enter 10 digit phone number.', 'Warning', {
        disableTimeOut: false
      });
      return false;
    }
    if (this.regInput.gst_number === '' || this.regInput.gst_number === null || this.regInput.gst_number === undefined) {
      this.toastr.warning('Please type GST number', 'Warning', {
        disableTimeOut: false
      });
      return false;
    }
    if (this.regInput.ac_name === '' || this.regInput.ac_name === null || this.regInput.ac_name === undefined) {
      this.toastr.warning('Please type account name', 'Warning', {
        disableTimeOut: false
      });
      return false;
    }
    if (this.regInput.ac_number === '' || this.regInput.ac_number === null || this.regInput.ac_number === undefined) {
      this.toastr.warning('Please type account number', 'Warning', {
        disableTimeOut: false
      });
      return false;
    }
    if (this.regInput.ifsc === '' || this.regInput.ifsc === null || this.regInput.ifsc === undefined) {
      this.toastr.warning('Please type IFSC', 'Warning', {
        disableTimeOut: false
      });
      return false;
    }
    if (this.regInput.bank_name === '' || this.regInput.bank_name === null || this.regInput.bank_name === undefined) {
      this.toastr.warning('Please type bank name', 'Warning', {
        disableTimeOut: false
      });
      return false;
    }
    if (this.regInput.bank_branch === '' || this.regInput.bank_branch === null || this.regInput.bank_branch === undefined) {
      this.toastr.warning('Please type branch name', 'Warning', {
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
    if (this.regInput.city === '' || this.regInput.city === null || this.regInput.city === undefined) {
      this.toastr.warning('Please type city', 'Warning', {
        disableTimeOut: false
      });
      return false;
    }
    if (this.regInput.p_o === '' || this.regInput.p_o === null || this.regInput.p_o === undefined) {
      this.toastr.warning('Please type post office', 'Warning', {
        disableTimeOut: false
      });
      return false;
    }
    if (this.regInput.district === '' || this.regInput.district === null || this.regInput.district === undefined) {
      this.toastr.warning('Please type district', 'Warning', {
        disableTimeOut: false
      });
      return false;
    }
    if (this.regInput.state === '' || this.regInput.state === null || this.regInput.state === undefined) {
      this.toastr.warning('Please type state', 'Warning', {
        disableTimeOut: false
      });
      return false;
    }
    if (this.regInput.pin_code === '' || this.regInput.pin_code === null || this.regInput.pin_code === undefined) {
      this.toastr.warning('Please type pin code', 'Warning', {
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


  approve() {
    const requestObject = {
      mId: this.regInput.id,
      // brunchCode: this.brunchCode,
      status: this.approvel.status,
    };
    let isValid = this.branchValidateInputs();
    if (isValid) {
      this.VendorRequestDetailsService.vendorApprovel(requestObject, (res: any) => {
        this.getVendorById();
        this.resetForm();
      });
    }
  }


  branchValidateInputs = () => {
    console.log("Saving data before validate");

    if (this.brAction.action == "Reject") {
      if (this.reject.reason === '' || this.reject.reason === null || this.reject.reason === undefined) {
        this.toastr.warning('Please type reasons', 'Warning', {
          disableTimeOut: false
        });
        return false;
      }
    }
    return true;
  }

  remark() {
    const requestObject = {
      mId: this.regInput.id,
      remark: this.reject.reason,
      status: this.reject.status,
    };
    console.log("requestObject", requestObject);

    let isValid = this.branchValidateInputs();
    if (isValid) {
      this.VendorRequestDetailsService.vendorReject(requestObject, (res: any) => {
        this.getVendorById();
        this.resetForm();
      });
    }
  }

  resetForm() {
    console.log("resetform");
    this.brAction.action = '';
    this.approvel.acNo = '';
    this.reject.reason = '';
  }


  getAccessRightsList = () => {
    this.permission.addMembershipApprovalPrivilage = this.loginService.return_HasMembershipApprovalRight();
  };
}
