import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/app.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExpressLoanApplyService {

  public headers: any;
  constructor(
    private appService: AppService,
    private http: HttpClient,
    private toastr: ToastrService
  ) { }



  getExpressLoanApplyList(req:any, callback:any){
    const ENDPOINT = `${environment.BASE_URL}/api/getExpressLoanApplyListByFA`;
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

  checkMemberReferenceData(req: any, callback: any) {
    const ENDPOINT = `${environment.BASE_URL}/api/checkMemberReferenceData`;
    const requestOptions = {
      headers: this.appService.headers,
      method: "post",
      requestObject: req


    }; console.log("mmmmmmmmmmm", requestOptions);
    this.http.post(ENDPOINT, requestOptions)
      .subscribe(
        (response) => {
          console.log("success");

          return callback && callback(response);
        },
        error => {
          console.log("fail");

          return callback && callback(error);
        },
        () => {
          console.log("Observable is now completed.");
        });
  }

  getBrunch(req: any, callback: any) {
    const ENDPOINT = `${environment.BASE_URL}/api/getBrunch`;
    const requestOptions = {
      headers: this.headers,
      method: 'post'
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

  getVendor(req: any, callback: any) {
    const ENDPOINT = `${environment.BASE_URL}/api/getVendor`;
    const requestOptions = {
      headers: this.appService.headers,
      method: 'post',
      requestObject: req
    };console.log("mmmmmmmmmmm",requestOptions);
    this.http.post(ENDPOINT, requestOptions).subscribe(
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


  createExpressLoan(req: any, callback: any) {
    const ENDPOINT = `${environment.BASE_URL}/api/createExpressLoan`;
    const requestOptions = {
      headers: this.appService.headers,
      method: "post",
      requestObject: req
      
      
    // };
  };console.log("mmmmmmmmmmm",requestOptions);
  this.http.post(ENDPOINT, requestOptions)
    .subscribe(
      (response) => {
        this.toastr.success("Loan apply request send", "Success!", {
          disableTimeOut: false
        });
        return callback && callback(response);
      },
      error => {
        this.toastr.error("Loan apply request not send", "warning!", {
          disableTimeOut: false
        });
        return callback && callback(error);
      },
      () => {
        console.log("Observable is now completed.");
      });
  }

  uploadIncmrFile(formData:any, callback:any){
    const ENDPOINT = `${environment.BASE_URL}/api/uploadExpressIncome`;
    console.log("mmmmmmmmmmm",formData);
    this.http.post(ENDPOINT, formData)
      .subscribe(
        (response) => {
          this.toastr.success("Income proof uploaded", "Success!", {
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

  uploadProduct(formData:any, callback:any){
    const ENDPOINT = `${environment.BASE_URL}/api/uploadExpressProduct`;
    console.log("mmmmmmmmmmm",formData);
    this.http.post(ENDPOINT, formData)
      .subscribe(
        (response) => {
          this.toastr.success("Product image uploaded", "Success!", {
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
}
