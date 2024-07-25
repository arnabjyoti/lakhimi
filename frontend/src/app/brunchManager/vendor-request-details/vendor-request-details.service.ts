import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/app.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VendorRequestDetailsService {
  public headers: any;
  constructor(
    private appService: AppService,
    private http: HttpClient,
    private toastr: ToastrService
  ) { }


  getVendorById(rqstId:any, callback:any) {
    const ENDPOINT = `${environment.BASE_URL}/api/getVendorById/${rqstId}`;
    const requestOptions = {
      headers: this.headers,
      method: "get"
    };
    this.http.get(ENDPOINT, requestOptions).subscribe(
      (response) => {
        console.log('Success');
        return callback && callback(response);
      },
      (error) => {
        return callback && callback(error);
      },
      () => {
        console.log('Observable is now completed.');
      }
    );
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

  resubmitVendorAplData(req: any, callback: any) {
    const ENDPOINT = `${environment.BASE_URL}/api/resubmitVendorAplData`;
    const requestOptions = {
      headers: this.appService.headers,
      method: "post",
      requestObject: req
    };
    this.http.post(ENDPOINT, requestOptions)
    .subscribe(
      (response) => {
        this.toastr.success("Form Resubmitted", "Success!", {
          disableTimeOut: false
        });
        return callback && callback(response);
      },
      error => {
        this.toastr.error("Form not Resubmitted", "warning!", {
          disableTimeOut: false
        });
        return callback && callback(error);
      },
      () => {
        console.log("Observable is now completed.");
      });
  }


  vendorApprovel(req: any, callback: any) {
    const ENDPOINT = `${environment.BASE_URL}/api/vendorApprovel`;
    const requestOptions = {
      headers: this.appService.headers,
      method: "post",
      requestObject: req
    };
    this.http.post(ENDPOINT, requestOptions)
    .subscribe(
      (response) => {
        this.toastr.success("Vendor approved", "Success!", {
          disableTimeOut: false
        });
        return callback && callback(response);
      },
      error => {
        this.toastr.error("Vendor not approved", "warning!", {
          disableTimeOut: false
        });
        return callback && callback(error);
      },
      () => {
        console.log("Observable is now completed.");
      });
  }


  vendorReject(req: any, callback: any) {
    const ENDPOINT = `${environment.BASE_URL}/api/vendorReject`;
    const requestOptions = {
      headers: this.appService.headers,
      method: "post",
      requestObject: req
    };
    this.http.post(ENDPOINT, requestOptions)
    .subscribe(
      (response) => {
        this.toastr.success("Vendor rejected", "Success!", {
          disableTimeOut: false
        });
        return callback && callback(response);
      },
      error => {
        this.toastr.error("Vendor not rejected", "warning!", {
          disableTimeOut: false
        });
        return callback && callback(error);
      },
      () => {
        console.log("Observable is now completed.");
      });
  }
}
