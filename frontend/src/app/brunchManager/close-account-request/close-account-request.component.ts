import { Component, ViewChild } from '@angular/core';
import { CloseAccountRequestService } from './close-account-request.service';
import { CommonModule, DatePipe } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { brunchData } from '../membership-request/membership-request.component';

@Component({
  selector: 'app-close-account-request',
  templateUrl: './close-account-request.component.html',
  styleUrls: ['./close-account-request.component.css'],
  standalone: true,
  imports: [NgxSpinnerModule, MatStepperModule, ReactiveFormsModule, RouterModule, MatTableModule, MatPaginatorModule, MatButtonModule, MatInputModule, MatSortModule, FormsModule, MatFormFieldModule, CommonModule],
})
export class CloseAccountRequestComponent {

  
  public displayedColumns: string[] = ['Sl','claiming_ac_holder_name','closing_type','reference_no','fwd_status', 'closing_status','apply_date','action', 'go'];
  dataSource !: MatTableDataSource<brunchData>
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  public isLodaing = true;
  public dbData:any;
  public endpoint: any;

  public user:any;
  public userId:any;
  public brunchId:any;

  constructor(
    private spinner: NgxSpinnerService,
    private CloseAccountRequestService: CloseAccountRequestService,
    private toastr: ToastrService,
    private _formBuilder: FormBuilder,
    private datePipe: DatePipe,
  ) {
    this.endpoint = environment.BASE_URL;
    this.init();
  }

  init = () =>{
    let token = JSON.parse(JSON.stringify(localStorage.getItem('token')));
    token = JSON.parse(token);

    this.user = token['usr'];
    this.userId = this.user.id;
    this.brunchId = token['brunch'].br_id;
    console.log("zzzzzzzzzzzzzzzzzzzz", this.brunchId);
    
    console.log("Token=", token);
    if(!token.usr.accessKeyword){
      console.log("gggggggggggggggggggggg");
      
      return;
    }
  }


  ngOnInit(): void {
    this.loanApplyList();
    
  }

  
  spiner() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 5000);
  }

  loanApplyList(){
    this.CloseAccountRequestService.getCloseAcApplyList(this.brunchId, (callback:any)=>{
      console.log("getLoanApplyList", callback);
      this.dbData = callback;
      
      this.dataSource = new MatTableDataSource(callback);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log("bbbbbbbbbb",this.dataSource);
    })
  }


  FilterChange(data:Event){
    const value=(data.target as HTMLInputElement).value;
    this.dataSource.filter=value;
  }


}
