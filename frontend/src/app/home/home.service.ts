import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { AppService } from 'src/app/app.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  public accessKeyword:any=null;
  public headers: any;
  constructor(
    private toastr: ToastrService,
    private appService: AppService,
    private http: HttpClient,
  ) { 
    let token = JSON.parse(JSON.stringify(localStorage.getItem('token')));
    token = JSON.parse(token);
    this.accessKeyword = token.usr.accessKeyword;
  }

  headCount(req:any, callback:any) {
    const ENDPOINT = `${environment.BASE_URL}/api/headCount`;
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


  branchOfcCount(req:any, callback:any) {
    const ENDPOINT = `${environment.BASE_URL}/api/branchOfficeCount`;
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


  fieldOfcCount(req:any, callback:any) {
    const ENDPOINT = `${environment.BASE_URL}/api/fieldOfficeCount`;
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
}
