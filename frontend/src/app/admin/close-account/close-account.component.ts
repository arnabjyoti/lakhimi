import { Component, ViewChild } from '@angular/core';
import { CloseAccountService } from './close-account.service';
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
import { brunchData } from '../brunch/brunch.component';
import * as _ from 'lodash'

@Component({
  selector: 'app-close-account',
  templateUrl: './close-account.component.html',
  styleUrls: ['./close-account.component.css'],
  standalone: true,
  imports: [NgxSpinnerModule, MatStepperModule, ReactiveFormsModule, RouterModule, MatTableModule, MatPaginatorModule, MatButtonModule, MatInputModule, MatSortModule, FormsModule, MatFormFieldModule, CommonModule],
})
export class CloseAccountComponent {
  public displayedColumns: string[] = ['Sl','claiming_ac_holder_name','closing_type','reference_no','fwd_status', 'closing_status','apply_date','action', 'go'];
  dataSource !: MatTableDataSource<brunchData>
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;



  public endpoint: any;

  public user:any;
  public userId:any;
  public brunchId:any;
  public role:any;

  public myDate:any = new Date();


  public loanData: any = {};
  public tokenData: any;


  public branchData:any;

  public filter: any = {
    branch_id: '',
  }
  public apiResponse: any = [];

  constructor(
    private spinner: NgxSpinnerService,
    private CloseAccountService: CloseAccountService,
    private toastr: ToastrService,
    private _formBuilder: FormBuilder,
    private datePipe: DatePipe,
  ) {
    this.endpoint = environment.BASE_URL;
    this.init();
    this.myDate = this.datePipe.transform(this.myDate, "YYYY-MM-dd");
  }

  init = () =>{
    let token = JSON.parse(JSON.stringify(localStorage.getItem('token')));
    token = JSON.parse(token);
    this.user = token['usr'];
    this.role = this.user.role;
    console.log("Token=", token);
    if(!token.usr.accessKeyword){
      console.log("gggggggggggggggggggggg");
      
      return;
    }
  }


  ngOnInit(): void {
    this.getUserDetails();
    this.branch();
  }

  branch=()=>{
    let requestObject = {};
    this.CloseAccountService.getBrunch(requestObject, (callback:any)=>{
      console.log("bbbbbbbbbb",callback);
      this.branchData = callback;
      console.log("location details",this.branchData);
      
    });  
  }

  getUserDetails = () => {
    let token = JSON.parse(JSON.stringify(localStorage.getItem('token')));
    token = JSON.parse(token);

    this.tokenData = token;

    if (token) {
      this.user = token['usr'];
      this.userId = this.user.id;
      console.log("usr name=", this.user.f_name);
    } else {
      console.log("Token not");
    }

    if (token['usr'].position == "Head office") {
      console.log("zzzzzzzzzzzzzzzzzzzzzzz",token['usr'].designation);
      if (token['usr'].designation == "Chairman") {
        this.loanApplyListCM();
      }
      if (token['usr'].designation == "Managing Director" || token['usr'].designation == "Transaction Officer") {
        this.loanApplyListMD();
      }
      if (token['usr'].designation == "Loan Officer") {
          this.loanApplyListLO();
      }
    }
  }


  loanApplyListLO(){
    let requestObject = {};
    this.CloseAccountService.getExpressLoanApplyListLO(requestObject, (callback:any)=>{
      console.log("getLoanApplyList", callback);
      
      this.apiResponse = callback;
      this.dataSource = new MatTableDataSource(callback);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log("bbbbbbbbbb",this.dataSource);
    })
  }

  loanApplyListMD(){
    let requestObject = {};
    this.CloseAccountService.getExpressLoanApplyListMD(requestObject, (callback:any)=>{
      console.log("getLoanApplyList", callback);
      
      this.apiResponse = callback;
      this.dataSource = new MatTableDataSource(callback);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log("bbbbbbbbbb",this.dataSource);
    })
  }

  loanApplyListCM(){
    let requestObject = {};
    this.CloseAccountService.getExpressLoanApplyListCM(requestObject, (callback:any)=>{
      console.log("getLoanApplyList", callback);
      
      this.apiResponse = callback;
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

  FilterChangeBranch($event:any){
    console.log("fffffffff",_.filter(this.apiResponse));
    let filteredData = _.filter(this.apiResponse,(item)=>{
      
      
      return item.brunchId == this.filter.branch_id;
    })
    console.log("ssssss",filteredData);
    this.dataSource = new MatTableDataSource(filteredData);
  }

  resetFilter(){
    this.filter.branch_id = '';
    
    this.getUserDetails();
  }

}
