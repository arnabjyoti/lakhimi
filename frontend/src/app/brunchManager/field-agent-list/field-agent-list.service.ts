import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/app.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FieldAgentListService {
  public headers: any;

  constructor(
    private appService: AppService,
    private http: HttpClient,
    private toastr: ToastrService
  ) { }

  getFieldAgentDetails(req:any, callback:any) {
    const ENDPOINT = `${environment.BASE_URL}/api/getFieldAgentDetailsByBrunch`;
    const requestOptions = {
      headers: this.headers,
      method: 'post',
      requestObject: req
    };console.log("bbbbbbbbbbbbbbbbbbbb",requestOptions);
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
