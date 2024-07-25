import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/app.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MembershipRequestService {
  public headers: any;
  constructor(
    private appService: AppService,
    private http: HttpClient,
    private toastr: ToastrService
  ) { }

  getAppliedMemberData(req:any, callback:any) {
    const ENDPOINT = `${environment.BASE_URL}/api/getAppliedMemberData`;
    const requestOptions = {
      headers: this.appService.headers,
      method: 'post',
      requestObject: req
    };;console.log("bbbbbbbbbbbbbbbbbbbb",requestOptions);
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


  updateApprovel(req: any, callback: any) {
    const ENDPOINT = `${environment.BASE_URL}/api/updateApprovel`;
    const requestOptions = {
      headers: this.appService.headers,
      method: "post",
      requestObject: req
    };
    this.http.post(ENDPOINT, requestOptions)
    .subscribe(
      (response) => {
        this.toastr.success("Membership approved", "Success!", {
          disableTimeOut: false
        });
        return callback && callback(response);
      },
      error => {
        this.toastr.error("Membership not approved", "warning!", {
          disableTimeOut: false
        });
        return callback && callback(error);
      },
      () => {
        console.log("Observable is now completed.");
      });
  }


  updateReject(req: any, callback: any) {
    const ENDPOINT = `${environment.BASE_URL}/api/updateReject`;
    const requestOptions = {
      headers: this.appService.headers,
      method: "post",
      requestObject: req
    };
    this.http.post(ENDPOINT, requestOptions)
    .subscribe(
      (response) => {
        this.toastr.success("Membership rejected", "Success!", {
          disableTimeOut: false
        });
        return callback && callback(response);
      },
      error => {
        this.toastr.error("Membership not rejected", "warning!", {
          disableTimeOut: false
        });
        return callback && callback(error);
      },
      () => {
        console.log("Observable is now completed.");
      });
  }
}
