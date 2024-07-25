import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/app.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  public headers: any;
  constructor(
    private appService: AppService,
    private http: HttpClient,
    private toastr: ToastrService
  ) { }

  getUser(req:any, callback:any) {
    const ENDPOINT = `${environment.BASE_URL}/api/getUserList`;
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


  createUser(req:any, callback:any){
    const ENDPOINT = `${environment.BASE_URL}/api/createUser`;
    const requestOptions = {
      headers: this.appService.headers,
      method: "post",
      requestObject: req
      
      
    };console.log("mmmmmmmmmmm",requestOptions);
    this.http.post(ENDPOINT, requestOptions)
      .subscribe(
        (response) => {
          this.toastr.success("User added", "Success!", {
            disableTimeOut: false
          });
          return callback && callback(response);
        },
        error => {
          this.toastr.error("User not added", "warning!", {
            disableTimeOut: false
          });
          return callback && callback(error);
        },
        () => {
          console.log("Observable is now completed.");
        });
  }
}
