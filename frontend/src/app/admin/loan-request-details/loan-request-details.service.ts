import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/app.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoanRequestDetailsService {
  public headers: any;
  constructor(
    private appService: AppService,
    private http: HttpClient,
    private toastr: ToastrService
  ) { }
  
  LoanDataById(rqstId:any, callback:any) {
    const ENDPOINT = `${environment.BASE_URL}/api/getLoanDataById/${rqstId}`;
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


  updateBMstatus(req: any, callback: any) {
    const ENDPOINT = `${environment.BASE_URL}/api/updateBMstatus`;
    const requestOptions = {
      headers: this.appService.headers,
      method: "post",
      requestObject: req
    };
    this.http.post(ENDPOINT, requestOptions)
    .subscribe(
      (response) => {
        this.toastr.success("Proposed amount forwarded to Loan Officer approved", "Success!", {
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


  rejectBMstatus(req: any, callback: any) {
    const ENDPOINT = `${environment.BASE_URL}/api/rejectBMstatus`;
    const requestOptions = {
      headers: this.appService.headers,
      method: "post",
      requestObject: req
    };
    this.http.post(ENDPOINT, requestOptions)
    .subscribe(
      (response) => {
        this.toastr.success("Loan rejected", "Success!", {
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



  updateLOstatus(req: any, callback: any) {
    const ENDPOINT = `${environment.BASE_URL}/api/updateLOstatus`;
    const requestOptions = {
      headers: this.appService.headers,
      method: "post",
      requestObject: req
    };
    this.http.post(ENDPOINT, requestOptions)
    .subscribe(
      (response) => {
        this.toastr.success("Proposed amount forwarded to Managing Director approved", "Success!", {
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


  rejectLOstatus(req: any, callback: any) {
    const ENDPOINT = `${environment.BASE_URL}/api/rejectLOstatus`;
    const requestOptions = {
      headers: this.appService.headers,
      method: "post",
      requestObject: req
    };
    this.http.post(ENDPOINT, requestOptions)
    .subscribe(
      (response) => {
        this.toastr.success("Loan rejected", "Success!", {
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


  updateMDstatus(req: any, callback: any) {
    const ENDPOINT = `${environment.BASE_URL}/api/updateMDstatus`;
    const requestOptions = {
      headers: this.appService.headers,
      method: "post",
      requestObject: req
    };
    this.http.post(ENDPOINT, requestOptions)
    .subscribe(
      (response) => {
        this.toastr.success("Proposed amount forwarded to Chairman approved", "Success!", {
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



  rejectMDstatus(req: any, callback: any) {
    const ENDPOINT = `${environment.BASE_URL}/api/rejectMDstatus`;
    const requestOptions = {
      headers: this.appService.headers,
      method: "post",
      requestObject: req
    };
    this.http.post(ENDPOINT, requestOptions)
    .subscribe(
      (response) => {
        this.toastr.success("Loan rejected", "Success!", {
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

  updateCMstatus(req: any, callback: any) {
    const ENDPOINT = `${environment.BASE_URL}/api/updateCMstatus`;
    const requestOptions = {
      headers: this.appService.headers,
      method: "post",
      requestObject: req
    };
    this.http.post(ENDPOINT, requestOptions)
    .subscribe(
      (response) => {
        this.toastr.success("Proposed amount forwarded to Loan Officer approved", "Success!", {
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


  rejectCMstatus(req: any, callback: any) {
    const ENDPOINT = `${environment.BASE_URL}/api/rejectCMstatus`;
    const requestOptions = {
      headers: this.appService.headers,
      method: "post",
      requestObject: req
    };
    this.http.post(ENDPOINT, requestOptions)
    .subscribe(
      (response) => {
        this.toastr.success("Loan rejected", "Success!", {
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