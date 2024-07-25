import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/app.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FieldAgentService {
  public headers: any;
  constructor(
    private appService: AppService,
    private http: HttpClient,
    private toastr: ToastrService
  ) { }
  getFieldAgentDetails(req:any, callback:any) {
    const ENDPOINT = `${environment.BASE_URL}/api/getFieldAgentDetails`;
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
  


  getBrunch(req:any, callback:any) {
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


  getfieldAgent(req:any, callback:any) {
    const ENDPOINT = `${environment.BASE_URL}/api/getFreeFieldAgent`;
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


  addBrunchDetails(req:any, callback:any){
    const ENDPOINT = `${environment.BASE_URL}/api/addBrunchDetails`;
    const requestOptions = {
      headers: this.appService.headers,
      method: "post",
      requestObject: req
      
      
    };console.log("mmmmmmmmmmm",requestOptions);
    this.http.post(ENDPOINT, requestOptions)
      .subscribe(
        (response) => {
          this.toastr.success("Brunch details added", "Success!", {
            disableTimeOut: false
          });
          return callback && callback(response);
        },
        error => {
          this.toastr.error("Brunch details not added", "warning!", {
            disableTimeOut: false
          });
          return callback && callback(error);
        },
        () => {
          console.log("Observable is now completed.");
        });
  }
}
