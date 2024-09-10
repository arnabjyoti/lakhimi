import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminMembershipService } from './admin-membership.service';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { brunchData } from '../brunch/brunch.component';
import * as _ from 'lodash'

@Component({
  selector: 'app-admin-membership',
  templateUrl: './admin-membership.component.html',
  styleUrls: ['./admin-membership.component.css'],
  standalone: true,
  imports: [NgxSpinnerModule, RouterModule, MatTableModule, MatPaginatorModule, MatButtonModule, MatInputModule,FormsModule, MatFormFieldModule,CommonModule, MatSortModule],
})
export class AdminMembershipComponent implements OnInit{

  public displayedColumns: string[] = ['Sl','brunch_name','membership_id','phone_no','panNo','adharNo','reference_no','status','apply_date','action'];
  dataSource !: MatTableDataSource<brunchData>
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;


  public filter: any = {
    branch_id: '',
  }
  public apiResponse: any = [];

  public branchData:any;

  public isLodaing: boolean = true;
  public endpoint: any;

  constructor(
    private AdminMembershipService: AdminMembershipService,
    private toastr:ToastrService,
    private spinner: NgxSpinnerService,
    private datePipe: DatePipe,
  ){
    this.endpoint = environment.BASE_URL;
  }


  ngOnInit(): void {
    this.getAppliedMembership();
    this.branch();
  }


  branch=()=>{
    let requestObject = {};
    this.AdminMembershipService.getBrunch(requestObject, (callback:any)=>{
      console.log("bbbbbbbbbb",callback);
      this.branchData = callback;
      console.log("location details",this.branchData);
      
    });  
  }


  getAppliedMembership(){
    let requestObject = {};
    this.AdminMembershipService.getMemberDataForAdmin(requestObject, (callback:any)=>{
      this.isLodaing = false;
      console.log(callback);

      this.apiResponse = callback;
      // this.departmentName = new MatTableDataSource(callback);
      this.dataSource = new MatTableDataSource(callback);
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
    
    this.getAppliedMembership();
  }
}
