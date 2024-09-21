import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/app.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SalaryService {
  public headers: any;
  constructor(
    private appService: AppService,
    private http: HttpClient,
    private toastr: ToastrService
  ) { }



  employeeList(req:any, callback:any) {
    const ENDPOINT = `${environment.BASE_URL}/api/employeeList`;
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



  saveSalaries = (req: any, callback: any) =>{
    const ENDPOINT = `${environment.BASE_URL}/api/saveSalaries`;
    const requestOptions = {
      headers: this.appService.headers,
      requestObject: req
    };
    console.log("ssssssssssss",req);
    
    this.http.post(ENDPOINT, requestOptions)
      .subscribe(
        (response) => {
          this.toastr.success("Salary generated", "Success!", {
            disableTimeOut: false
          });
          return callback && callback(response);
        },
        error => {
          this.toastr.error("Salary not generated", "warning!", {
            disableTimeOut: false
          });
          return callback && callback(error);
        },
        () => {
          console.log("Observable is now completed.");
        });
  }


  checkSalary(req:any, callback:any) {
    const ENDPOINT = `${environment.BASE_URL}/api/checkSalary`;
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
  
}
