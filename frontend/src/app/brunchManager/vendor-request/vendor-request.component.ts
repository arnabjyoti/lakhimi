import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { VendorRequestService } from './vendor-request.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';



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
  selector: 'app-vendor-request',
  templateUrl: './vendor-request.component.html',
  styleUrls: ['./vendor-request.component.css'],
  standalone: true,
  imports: [NgxSpinnerModule, RouterModule, MatTableModule, MatPaginatorModule, MatButtonModule, MatInputModule, FormsModule, MatFormFieldModule, MatSortModule, CommonModule],
})
export class VendorRequestComponent implements OnInit{
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


  constructor(
    private spinner: NgxSpinnerService,
    private VendorRequestService: VendorRequestService,
    private toastr: ToastrService,
  ) {
    this.endpoint = environment.BASE_URL;
    this.init();
  }
  init = () => {
    let token = JSON.parse(JSON.stringify(localStorage.getItem('token')));
    token = JSON.parse(token);

    this.user = token['usr'];
    this.userId = this.user.id;
    this.brunchId = token['brunch'].br_id;
    console.log("zzzzzzzzzzzzzzzzzzzz", this.brunchId);

    console.log("Token=", token);
    if (!token.usr.accessKeyword) {
      console.log("gggggggggggggggggggggg");

      return;
    }
  }

  ngOnInit(): void {
    this.getApplieVendorDataByBranchId();
    // this.spiner();
  }

  spiner() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 5000);
  }


  getApplieVendorDataByBranchId() {
    let requestObject = {};
    this.VendorRequestService.getApplieVendorDataByBranchId(this.brunchId, (callback: any) => {
      this.isLodaing = false;
      console.log("bbbbbbbbbbbbbbbbbbbb", callback);
      console.log(callback);
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
}
