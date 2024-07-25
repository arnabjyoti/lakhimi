import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/app.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CloseAccountRequestService {
  public headers: any;
  constructor(
    private appService: AppService,
    private http: HttpClient,
    private toastr: ToastrService
  ) { }


  getCloseAcApplyList(req:any, callback:any){
    const ENDPOINT = `${environment.BASE_URL}/api/getCloseAcApplyListByBM`;
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
