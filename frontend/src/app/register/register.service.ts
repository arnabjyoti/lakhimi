import { Injectable } from '@angular/core';
// import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { environment } from '../../environments/environment';
import { AppService } from '../app.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  public headers: any;

  constructor(
    private appService: AppService,
    private http: HttpClient,
  ) { }

  getDepartment(req:any, callback:any) {
    const ENDPOINT = `${environment.BASE_URL}/api/department`;
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

  getOTP(req: any, callback: any) {
    const ENDPOINT = `${environment.BASE_URL}/api/getOTP`;
    const requestOptions = {
      headers: this.appService.headers,
      requestObject: req
    };
    this.http.post(ENDPOINT, requestOptions)
      .subscribe(
        (response) => {            
          return callback && callback(response);
        },
        error => {
          
          return callback && callback(error);
          
        },
        () => {
        });
  }
  // End 

  verifyOtp = (req: any, callback: any) =>{
    const ENDPOINT = `${environment.BASE_URL}/api/verifyOTP`;
    const requestOptions = {
      headers: this.appService.headers,
      requestObject: req
    };
    this.http.post(ENDPOINT, requestOptions)
      .subscribe(
        (response) => {            
          return callback && callback(response);
        },
        error => {
          
          return callback && callback(error);
          
        },
        () => {
        });
  }

  sendOtp(req:any, callback:any){
    const ENDPOINT = `${environment.BASE_URL}/api/sendOtp`;
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

  createUser = (req: any, callback: any) =>{
    const ENDPOINT = `${environment.BASE_URL}/api/createUser`;
    const requestOptions = {
      headers: this.appService.headers,
      requestObject: req
    };
    console.log("ssssssssssss",req);
    
    this.http.post(ENDPOINT, requestOptions)
      .subscribe(
        (response) => {            
          return callback && callback(response);
        },
        error => {
          
          return callback && callback(error);
          
        },
        () => {
        });
  }

  verifyEmail(req:any, callback:any){
    const ENDPOINT = `${environment.BASE_URL}/api/verifyEmail`;
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

