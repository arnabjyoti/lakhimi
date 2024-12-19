import { Component, OnInit, ViewChild } from '@angular/core';
import { VendorListService } from './vendor-list.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import * as _ from 'lodash'


export interface brunchData {
  id: string,
  f_name: string,
  l_name: string,
  dob: string,
  phone_no: string,
  panNo: string,
  adharNo: string,
  reference_no: string,

}

@Component({
  selector: 'app-vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrls: ['./vendor-list.component.css'],
  standalone: true,
  imports: [NgxSpinnerModule, RouterModule, MatTableModule, MatPaginatorModule, MatButtonModule, MatInputModule, FormsModule, MatFormFieldModule, MatSortModule, CommonModule],
})
export class VendorListComponent implements OnInit{
  public displayedColumns: string[] = ['Sl', 'shop_name', 'proprietor_name', 'contact_number_1', 'gst_number', 'city', 'reference_number', 'status', 'applyDate', 'action'];
  dataSource !: MatTableDataSource<brunchData>
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;
  public isSaving: boolean = false;
  public endpoint: any;
  public userList: any;
  public user: any;
  public userId: any;
  public brunchId: any;
  public returnMsg: any;
  public isLodaing = true;


  public branchData:any;
  public brunchFormData: any;

  public filter: any = {
    branch_id: '',
  }
  public apiResponse: any = [];

  constructor(
    private spinner: NgxSpinnerService,
    private VendorListService: VendorListService,
    private toastr: ToastrService,
  ) {
    this.endpoint = environment.BASE_URL;
    this.init();
  }
  init = () => {
    let token = JSON.parse(JSON.stringify(localStorage.getItem('token')));
    token = JSON.parse(token);

    this.user = token['usr'];

    console.log("Token=", token);
    if (!token.usr.accessKeyword) {
      console.log("gggggggggggggggggggggg");

      return;
    }
  }

  ngOnInit(): void {
    this.getApplieVendorDataByBranchId();
    this.getBrunchData();
    // this.spiner();
  }

  spiner() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 5000);
  }

  getBrunchData=()=>{
    let requestObject = {};
    
    this.VendorListService.getBrunch(requestObject, (callback:any)=>{
      console.log(callback);
      this.brunchFormData = callback; 
      this.branchData = callback;     
    });  
  }


  getApplieVendorDataByBranchId() {
    let requestObject = {};
    this.VendorListService.getAllVendorList(requestObject, (callback: any) => {
      this.isLodaing = false;
      console.log("bbbbbbbbbbbbbbbbbbbb", callback);
      console.log(callback);
      this.apiResponse = callback;
      // this.departmentName = new MatTableDataSource(callback);
      this.dataSource = new MatTableDataSource(callback);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log("bbbbbbbbbb", this.dataSource);

    });
  }

  FilterChange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
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
      this.getApplieVendorDataByBranchId();
    }
}
