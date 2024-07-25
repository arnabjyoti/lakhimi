import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/app.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExpressLoanDetailsUpdateService {
  public headers: any;
  constructor(
    private appService: AppService,
    private http: HttpClient,
    private toastr: ToastrService
  ) { }

  expressLoanDataById(rqstId:any, callback:any) {
    const ENDPOINT = `${environment.BASE_URL}/api/expressLoanDataById/${rqstId}`;
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

  updateExpressLoanData(req: any, callback: any) {
    const ENDPOINT = `${environment.BASE_URL}/api/updateExpressLoanData`;
    const requestOptions = {
      headers: this.appService.headers,
      method: "post",
      requestObject: req
    };
    this.http.post(ENDPOINT, requestOptions)
    .subscribe(
      (response) => {
        this.toastr.success("Express Loan details updated", "Success!", {
          disableTimeOut: false
        });
        return callback && callback(response);
      },
      error => {
        this.toastr.error("Express Loan details not updated", "warning!", {
          disableTimeOut: false
        });
        return callback && callback(error);
      },
      () => {
        console.log("Observable is now completed.");
      });
  }
}
