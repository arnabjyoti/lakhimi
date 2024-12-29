import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/app.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewMembershipService {
  public headers: any;
  constructor(
    private appService: AppService,
    private http: HttpClient,
    private toastr: ToastrService
  ) { }

  addMembership(req:any, callback:any){
    const ENDPOINT = `${environment.BASE_URL}/api/addMembership`;
    const requestOptions = {
      headers: this.appService.headers,
      method: "post",
      requestObject: req
      
      
    // };
  };console.log("mmmmmmmmmmm",requestOptions);
  this.http.post(ENDPOINT, requestOptions)
    .subscribe(
      (response) => {
        this.toastr.success("Membership registration applied", "Success!", {
          disableTimeOut: false
        });
        return callback && callback(response);
      },
      error => {
        this.toastr.error("Membership registration not applied", "warning!", {
          disableTimeOut: false
        });
        return callback && callback(error);
      },
      () => {
        console.log("Observable is now completed.");
      });
  }

  checkExistMember(req:any, callback:any){
    const ENDPOINT = `${environment.BASE_URL}/api/checkExistMember`;
    const requestOptions = {
      headers: this.appService.headers,
      method: "post",
      requestObject: req
      
      
    // };
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


  uploadPan(formData:any, dbId:any, fileType:any, callback:any){
    const ENDPOINT = `${environment.BASE_URL}/api/uploadPan`;
    // const requestOptions = {
    //   headers: this.appService.headers,
    //   method: "post",
    //   requestObject: req
      
      
    // };
    console.log("mmmmmmmmmmm",formData);
    this.http.post(ENDPOINT, formData)
      .subscribe(
        (response) => {
          this.toastr.success("PAN Card uploaded", "Success!", {
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


  uploadAdhar(formData:any, dbId:any, fileType:any, callback:any){
    const ENDPOINT = `${environment.BASE_URL}/api/uploadAdhar`;
    // const requestOptions = {
    //   headers: this.appService.headers,
    //   method: "post",
    //   requestObject: req
      
      
    // };
    console.log("mmmmmmmmmmm",formData);
    this.http.post(ENDPOINT, formData)
      .subscribe(
        (response) => {
          this.toastr.success("ADHAR Card uploaded", "Success!", {
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


  uploadPhoto(formData:any, dbId:any, fileType:any, callback:any){
    const ENDPOINT = `${environment.BASE_URL}/api/uploadPhoto`;
    console.log("mmmmmmmmmmm",formData);
    this.http.post(ENDPOINT, formData)
      .subscribe(
        (response) => {
          this.toastr.success("Applicant photo uploaded", "Success!", {
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


  uploadSign(formData:any, dbId:any, fileType:any, callback:any){
    const ENDPOINT = `${environment.BASE_URL}/api/uploadSign`;
    console.log("mmmmmmmmmmm",formData);
    this.http.post(ENDPOINT, formData)
      .subscribe(
        (response) => {
          this.toastr.success("Applicant signature uploaded", "Success!", {
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


  getAppliedMemberData(req:any, callback:any) {
    const ENDPOINT = `${environment.BASE_URL}/api/getAppliedMemberData`;
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

  getAppliedMemberDataById(req:any, callback:any){
    const ENDPOINT = `${environment.BASE_URL}/api/getAplMembrById`;
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

  updatemember(req:any, callback:any){
    const ENDPOINT = `${environment.BASE_URL}/api/updateMember`;
    const requestOptions = {
      headers: this.appService.headers,
      method: "post",
      requestObject: req
      
      
    };console.log("mmmmmmmmmmm",requestOptions);
    this.http.post(ENDPOINT, requestOptions)
      .subscribe(
        (response) => {
          this.toastr.success("Applicant data updated.", "Success!", {
            disableTimeOut: false
          });
          return callback && callback(response);
        },
        error => {
          this.toastr.error("Applicant data not updated.", "Failed!", {
            disableTimeOut: false
          });
          return callback && callback(error);
        },
        () => {
          console.log("Observable is now completed.");
        });
  }






  //update form

  updateMemberAplData(req: any, callback: any) {
    const ENDPOINT = `${environment.BASE_URL}/api/updateMemberAplData`;
    const requestOptions = {
      headers: this.appService.headers,
      method: "post",
      requestObject: req
    };
    this.http.post(ENDPOINT, requestOptions)
    .subscribe(
      (response) => {
        this.toastr.success("Membership registration updated", "Success!", {
          disableTimeOut: false
        });
        return callback && callback(response);
      },
      error => {
        this.toastr.error("Membership registration not updated", "warning!", {
          disableTimeOut: false
        });
        return callback && callback(error);
      },
      () => {
        console.log("Observable is now completed.");
      });
  }
}

