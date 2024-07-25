import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { VendorService } from './vendor.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { MatSort, MatSortModule } from '@angular/material/sort';


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
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.css'],
  standalone: true,
  imports: [NgxSpinnerModule, RouterModule, MatTableModule, MatPaginatorModule, MatButtonModule, MatInputModule, FormsModule, MatFormFieldModule, MatSortModule, CommonModule],
})
export class VendorComponent implements OnInit{
  public displayedColumns: string[] = ['Sl', 'shop_name', 'proprietor_name', 'contact_number_1', 'gst_number', 'city', 'reference_number', 'status', 'applyDate', 'action'];
  dataSource !: MatTableDataSource<brunchData>
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;


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
    reference_number: "",
    status: "",
    created_by: "",
  }


  public selectedVendor: any = {
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
  }

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

  constructor(
    private spinner: NgxSpinnerService,
    private VendorService: VendorService,
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
    this.getApplieVendorDataById();
    // this.spiner();
  }


  spiner() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 5000);
  }


  getApplieVendorDataById() {
    let requestObject = {};
    this.VendorService.getApplieVendorDataByBranchId(this.brunchId, (callback: any) => {
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

  saveData(){
    this.isSaving = true;
    this.regInput.createdBy = this.userId;
    this.regInput.brunchId = this.brunchId;
    console.log("input data", this.regInput);
    let isValid = this.validateInputs();
    if(isValid){
    this.VendorService.addVendor(this.regInput, (res: any) => {
      this.returnMsg = res.message;
      this.rfrncNo = this.regInput.reference_no;
      console.log("lllllllllll", this.returnMsg);
      this.isSaving = false;
      this.showShop = false;
      this.showSaveData = true;
      this.showUpload = false;
      this.dbId = this.returnMsg;
    });
  }else{
      this.isSaving = false;
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
          // if (this.selectedVendor.id != '') {
            console.log("update", this.selectedVendor.id);
            const formData = new FormData();
            formData.append("dbid", this.dbId);
            formData.append("file", this.uploadImageObject.image);
            formData.append("panImg", this.uploadImageObject.panImg);
            formData.append("adharImg", this.uploadImageObject.adharImg);
            console.log("FORMDATA===", formData);
            console.log("dbid===", this.dbId);
            this.VendorService.uploadShop(
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
          formData.append("dbid", this.dbId);
          formData.append("file", this.uploadImageObject.image);
          formData.append("panImg", this.uploadImageObject.panImg);
          formData.append("adharImg", this.uploadImageObject.adharImg);
          console.log("FORMDATA===", formData);
          console.log("dbid===", this.dbId);
          this.VendorService.uploadProprietor(
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
          formData.append("dbid", this.dbId);
          formData.append("file", this.uploadImageObject.image);
          formData.append("panImg", this.uploadImageObject.panImg);
          formData.append("adharImg", this.uploadImageObject.adharImg);
          console.log("FORMDATA===", formData);
          console.log("dbid===", this.dbId);
          this.VendorService.uploadTrade(
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
          formData.append("dbid", this.dbId);
          formData.append("file", this.uploadImageObject.image);
          formData.append("panImg", this.uploadImageObject.panImg);
          formData.append("adharImg", this.uploadImageObject.adharImg);
          console.log("FORMDATA===", formData);
          console.log("dbid===", this.dbId);
          this.VendorService.uploadGST(
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
              // this.location();
              // let ele: any = document.getElementById('modalClose');
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


  uploadBank(){
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
          formData.append("status", "Applied");
          formData.append("reference_no", this.convertDate());
          formData.append("file", this.uploadImageObject.image);
          formData.append("panImg", this.uploadImageObject.panImg);
          formData.append("adharImg", this.uploadImageObject.adharImg);
          console.log("FORMDATA===", formData);
          console.log("dbid===", this.dbId);
          this.VendorService.uploadBank(
            formData,
            this.dbId,
            this.acceptfileType, (response: any) => {
              this.isLodaing = false;
              this.returnMsg = response.message;
              console.log("lllllllllll", this.dbId);
              this.showBankSc= false;
              this.showBankBtn = true;
              this.uploadImageObject.image = "";
              let ele: any = document.getElementById('modalClose');
              ele.click();
              this.isSaving = false;
              this.getApplieVendorDataById();
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



  //for update modal

  showRequestUpdateModal(row: any) {
    console.log("Selected Project=", row);
    this.selectedVendor = row;
  }

  updateData(){
      const requestObject = {
        mId: this.selectedVendor.id,

        shop_name: this.selectedVendor.shop_name,
        proprietor_name: this.selectedVendor.proprietor_name,
        contact_number_1: this.selectedVendor.contact_number_1,
        contact_number_2: this.selectedVendor.contact_number_2,
        contact_number_3: this.selectedVendor.contact_number_3,
        gst_number: this.selectedVendor.gst_number,
        ac_name: this.selectedVendor.ac_name,
        ac_number: this.selectedVendor.ac_number,
        ifsc: this.selectedVendor.ifsc,
        bank_name: this.selectedVendor.bank_name,
        bank_branch: this.selectedVendor.bank_branch,
        address: this.selectedVendor.address,
        city: this.selectedVendor.city,
        p_o: this.selectedVendor.p_o,
        district: this.selectedVendor.district,
        state: this.selectedVendor.state,
        pin_code: this.selectedVendor.pin_code,

      };
      console.log("request object",requestObject);
      
      // let isValid = this.validateInputs();
      // if (isValid) {
        this.VendorService.updateVendorAplData(requestObject, (res: any) => {
          this.getApplieVendorDataById();
          this.showRequestUpdateModal(this.getApplieVendorDataById())
        });
      }
    // }
}
