import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/app.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CashCounterPaymentService {
  public headers: any;
  constructor(
    private appService: AppService,
    private http: HttpClient,
    private toastr: ToastrService
  ) { }

  getCashCounterList(req:any, callback:any){
    const ENDPOINT = `${environment.BASE_URL}/api/getCashCounterListByCA`;
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

  createCashCounter(req: any, callback: any) {
    const ENDPOINT = `${environment.BASE_URL}/api/createCashCounter`;
    const requestOptions = {
      headers: this.appService.headers,
      method: "post",
      requestObject: req
      
      
    // };
  };console.log("mmmmmmmmmmm",requestOptions);
  this.http.post(ENDPOINT, requestOptions)
    .subscribe(
      (response) => {
        this.toastr.success("New Cash Counter Payment submitted", "Success!", {
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


  saveCashCounter(formData:any, callback:any){
    const ENDPOINT = `${environment.BASE_URL}/api/saveCashCounter`;
    console.log("mmmmmmmmmmm",formData);
    this.http.post(ENDPOINT, formData)
      .subscribe(
        (response) => {
          this.toastr.success("New Cash Counter Payment submitted", "Success!", {
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



  filterDataByCashier(req:any, callback:any){
    const ENDPOINT = `${environment.BASE_URL}/api/filterDataByCashier`;
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
}
