import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/app.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewAccountService {
  public headers: any;
  constructor(
    private appService: AppService,
    private http: HttpClient,
    private toastr: ToastrService
  ) { }
  checkMemberData(req:any, callback:any){
    const ENDPOINT = `${environment.BASE_URL}/api/checkMemberData`;
    const requestOptions = {
      headers: this.appService.headers,
      method: "post",
      requestObject: req
      
      
    };console.log("mmmmmmmmmmm",requestOptions);
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



  addNewAccount(req:any, callback:any){
    const ENDPOINT = `${environment.BASE_URL}/api/addNewAccount`;
    const requestOptions = {
      headers: this.appService.headers,
      method: "post",
      requestObject: req
      
      
    // };
  };console.log("mmmmmmmmmmm",requestOptions);
  this.http.post(ENDPOINT, requestOptions)
    .subscribe(
      (response) => {
        this.toastr.success("Account opening request send", "Success!", {
          disableTimeOut: false
        });
        return callback && callback(response);
      },
      error => {
        this.toastr.error("Account opening request not send", "warning!", {
          disableTimeOut: false
        });
        return callback && callback(error);
      },
      () => {
        console.log("Observable is now completed.");
      });
  }



  getAplAcById(req:any, callback:any){
    const ENDPOINT = `${environment.BASE_URL}/api/getAplAcById`;
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



  //update form

  updateAccountAplData(req: any, callback: any) {
    const ENDPOINT = `${environment.BASE_URL}/api/updateAccountAplData`;
    const requestOptions = {
      headers: this.appService.headers,
      method: "post",
      requestObject: req
    };console.log("requestdata",requestOptions);
    
    this.http.post(ENDPOINT, requestOptions)
    .subscribe(
      (response) => {
        this.toastr.success("Application updated", "Success!", {
          disableTimeOut: false
        });
        return callback && callback(response);
      },
      error => {
        this.toastr.error("Application not updated", "warning!", {
          disableTimeOut: false
        });
        return callback && callback(error);
      },
      () => {
        console.log("Observable is now completed.");
      });
  }
}
