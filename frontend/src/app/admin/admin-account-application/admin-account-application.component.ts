import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminAccountApplicationService } from './admin-account-application.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { NgxPrintModule } from 'ngx-print';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { brunchData } from '../brunch/brunch.component';
import * as _ from 'lodash'

@Component({
  selector: 'app-admin-account-application',
  templateUrl: './admin-account-application.component.html',
  styleUrls: ['./admin-account-application.component.css'],
  standalone: true,
  imports: [NgxPrintModule,NgxSpinnerModule,RouterModule, MatTableModule, MatPaginatorModule, MatButtonModule, MatInputModule,FormsModule, MatFormFieldModule,CommonModule, MatSortModule],
})
export class AdminAccountApplicationComponent implements OnInit{

  public displayedColumns: string[] = ['Sl','name','account_no','type','membership_No','reference_no','status','createdAt','action'];
  dataSource !: MatTableDataSource<brunchData>
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;


  public branchData:any;

  public filter: any = {
    branch_id: '',
  }
  public apiResponse: any = [];

  public endpoint: any;
  public isLodaing = true;

  public data: any;

  constructor(
    private AdminAccountApplicationService: AdminAccountApplicationService,
    private toastr:ToastrService,
    private spinner: NgxSpinnerService
  ){
    this.endpoint = environment.BASE_URL;
  }



  ngOnInit(): void {
    this.getAppliedAccountReq();
    this.branch();
  }

  branch=()=>{
    let requestObject = {};
    this.AdminAccountApplicationService.getBrunch(requestObject, (callback:any)=>{
      console.log("bbbbbbbbbb",callback);
      this.branchData = callback;
      console.log("location details",this.branchData);
      
    });  
  }



  getAppliedAccountReq(){
    let requestObject = {};
    this.AdminAccountApplicationService.getAppliedAcOpenDataForAdmin(requestObject, (callback:any)=>{
      this.isLodaing = false;
      console.log(callback);

      let temp:any = [];
      callback.map((item: any) => {
        temp.push({
          f_name: item["membership.f_name"],
          l_name: item["membership.l_name"],
          membership_No: item["membership.membership_id"],
          phone_no: item["membership.phone_no"],
          panNo: item["membership.panNo"],
          status: item.status,
          reference_no: item.reference_no,
          type: item.type,
          id: item.id,
          membershipId: item.membershipId,
          fathers_name:item["membership.fathers_name"],
          address: item["membership.address"],
          gender: item["membership.gender"],
          dob: item["membership.dob"],
          purpose: item["membership.purpose"],
          occupation:item["membership.occupation"],
          introducer: item["membership.introducer"],
          introducer_id: item["membership.introducer_id"],
          adharNo: item["membership.adharNo"],
          photo: item["membership.photo"],
          sign: item["membership.sign"],
          class: item.class,
          account_no: item.account_no,
          classPrice: item.classPrice,
          classAdminFee: item.classAdminFee,
          nomineeName: item.nomineeName,
          nomineeDOB: item.nomineeDOB,
          nomineeGender: item.nomineeGender,
          nomineePhnoe: item.nomineePhnoe,
          nomineeRelation: item.nomineeRelation,
          opening_balance: item.opening_balance,
          scheme: item.scheme,
          dep_period: item.dep_period,
          dep_frequency: item.dep_frequency,
          startDate: item.startDate,
          endDate: item.endDate,
          first_instlmnt: item.first_instlmnt,
          openingFee: item.openingFee,
          brName: item.brName,
          csp_msp: item.csp_msp,
          ac_name: item.ac_name,
          ac_type: item.ac_type,
          ac_no: item.ac_no,
          ac_ifsc: item.ac_ifsc,
          ac_bankName: item.ac_bankName,
          ac_brName: item.ac_brName,
          createdAt: item.createdAt,
          brunchId: item.brunchId,
        })
        this.data = temp;
        
      });
      this.apiResponse = this.data;
      // this.departmentName = new MatTableDataSource(callback);
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log("bbbbbbbbbb",this.dataSource);
      
    });  
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
    
    this.getAppliedAccountReq();
  }
}
