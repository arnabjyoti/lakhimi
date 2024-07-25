import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/app.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VendorService {
  public headers: any;
  constructor(
    private appService: AppService,
    private http: HttpClient,
    private toastr: ToastrService
  ) { }

  addVendor(req:any, callback:any){
    const ENDPOINT = `${environment.BASE_URL}/api/addVendor`;
    const requestOptions = {
      headers: this.appService.headers,
      method: "post",
      requestObject: req
      
      
    // };
  };console.log("mmmmmmmmmmm",requestOptions);
  this.http.post(ENDPOINT, requestOptions)
    .subscribe(
      (response) => {
        this.toastr.success("Vendor registration applied", "Success!", {
          disableTimeOut: false
        });
        return callback && callback(response);
      },
      error => {
        this.toastr.error("Vendor registration not applied", "warning!", {
          disableTimeOut: false
        });
        return callback && callback(error);
      },
      () => {
        console.log("Observable is now completed.");
      });
  }


  uploadShop(formData:any, dbId:any, fileType:any, callback:any){
    const ENDPOINT = `${environment.BASE_URL}/api/uploadShop`;
    console.log("mmmmmmmmmmm",formData);
    this.http.post(ENDPOINT, formData)
      .subscribe(
        (response) => {
          this.toastr.success("Shop image uploaded", "Success!", {
            disableTimeOut: false
          });
          return callback && callback(response);
        },
        error => {
          this.toastr.error("Something went wrong", "warning!", {
            disableTimeOut: false
          });
          return callback && callback(error);
        },
        () => {
          console.log("Observable is now completed.");
        });
  }


  uploadProprietor(formData:any, dbId:any, fileType:any, callback:any){
    const ENDPOINT = `${environment.BASE_URL}/api/uploadProprietor`;
    console.log("mmmmmmmmmmm",formData);
    this.http.post(ENDPOINT, formData)
      .subscribe(
        (response) => {
          this.toastr.success("Proprietor image uploaded", "Success!", {
            disableTimeOut: false
          });
          return callback && callback(response);
        },
        error => {
          this.toastr.error("Something went wrong", "warning!", {
            disableTimeOut: false
          });
          return callback && callback(error);
        },
        () => {
          console.log("Observable is now completed.");
        });
  }


  uploadTrade(formData:any, dbId:any, fileType:any, callback:any){
    const ENDPOINT = `${environment.BASE_URL}/api/uploadTrade`;
    console.log("mmmmmmmmmmm",formData);
    this.http.post(ENDPOINT, formData)
      .subscribe(
        (response) => {
          this.toastr.success("Applicant trade license uploaded", "Success!", {
            disableTimeOut: false
          });
          return callback && callback(response);
        },
        error => {
          this.toastr.error("Something went wrong", "warning!", {
            disableTimeOut: false
          });
          return callback && callback(error);
        },
        () => {
          console.log("Observable is now completed.");
        });
  }


  uploadGST(formData:any, dbId:any, fileType:any, callback:any){
    const ENDPOINT = `${environment.BASE_URL}/api/uploadGST`;
    console.log("mmmmmmmmmmm",formData);
    this.http.post(ENDPOINT, formData)
      .subscribe(
        (response) => {
          this.toastr.success("Applicant GST certificate uploaded", "Success!", {
            disableTimeOut: false
          });
          return callback && callback(response);
        },
        error => {
          this.toastr.error("Something went wrong", "warning!", {
            disableTimeOut: false
          });
          return callback && callback(error);
        },
        () => {
          console.log("Observable is now completed.");
        });
  }

  uploadBank(formData:any, dbId:any, fileType:any, callback:any){
    const ENDPOINT = `${environment.BASE_URL}/api/uploadBank`;
    console.log("mmmmmmmmmmm",formData);
    this.http.post(ENDPOINT, formData)
      .subscribe(
        (response) => {
          this.toastr.success("Bank statement image uploaded", "Success!", {
            disableTimeOut: false
          });
          return callback && callback(response);
        },
        error => {
          this.toastr.error("Something went wrong", "warning!", {
            disableTimeOut: false
          });
          return callback && callback(error);
        },
        () => {
          console.log("Observable is now completed.");
        });
  }

  // getApplieVendorDataById(req:any, callback:any){
  //   const ENDPOINT = `${environment.BASE_URL}/api/getApplieVendorDataById`;
  //   const requestOptions = {
  //     headers: this.appService.headers,
  //     method: "post",
  //     requestObject: req
      
      
  //   };console.log("mmmmmmmmmmm",requestOptions);
  //   this.http.post(ENDPOINT, requestOptions)
  //     .subscribe(
  //       (response) => {
  //         return callback && callback(response);
  //       },
  //       error => {
  //         return callback && callback(error);
  //       },
  //       () => {
  //         console.log("Observable is now completed.");
  //       });
  // }

  getApplieVendorDataByBranchId(req:any, callback:any){
    const ENDPOINT = `${environment.BASE_URL}/api/getApplieVendorDataByBranchId`;
    const requestOptions = {
      headers: this.appService.headers,
      method: "post",
      requestObject: req
      
      
    };console.log("mmmmmmmmmmm",requestOptions);
    this.http.post(ENDPOINT, requestOptions)
      .subscribe(
        (response) => {
          return callback && callback(response);
        },
        error => {
          return callback && callback(error);
        },
        () => {
          console.log("Observable is now completed.");
        });
  }



  updateVendorAplData(req: any, callback: any) {
    const ENDPOINT = `${environment.BASE_URL}/api/updateVendorAplData`;
    const requestOptions = {
      headers: this.appService.headers,
      method: "post",
      requestObject: req
    };
    this.http.post(ENDPOINT, requestOptions)
    .subscribe(
      (response) => {
        this.toastr.success("Vendor details updated", "Success!", {
          disableTimeOut: false
        });
        return callback && callback(response);
      },
      error => {
        this.toastr.error("Vendor details not updated", "warning!", {
          disableTimeOut: false
        });
        return callback && callback(error);
      },
      () => {
        console.log("Observable is now completed.");
      });
  }
}
