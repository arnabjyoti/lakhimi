import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MembershipApprovelService } from './membership-approvel.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { RouterModule } from '@angular/router';


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
  selector: 'app-membership-approvel',
  templateUrl: './membership-approvel.component.html',
  styleUrls: ['./membership-approvel.component.css'],
  standalone: true,
  imports: [RouterModule, MatTableModule, MatPaginatorModule, MatButtonModule, MatInputModule,FormsModule, MatFormFieldModule,CommonModule],
})
export class MembershipApprovelComponent implements OnInit{

  public displayedColumns: string[] = ['Sl','brunch_code','brunch_name','brunch_location','brunch_adrs','brunch_cntct_no','brunch_email','action'];
  dataSource !: MatTableDataSource<brunchData>
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  public endpoint: any;

  constructor(
    private MembershipApprovelService: MembershipApprovelService,
    private toastr:ToastrService,
  ){
    this.endpoint = environment.BASE_URL;
  }

  ngOnInit(): void {
    this.getAppliedMembership();
  }

  getAppliedMembership(){
    let requestObject = {};
    
    this.MembershipApprovelService.getAppliedMemberData(requestObject, (callback:any)=>{
      console.log(callback);
      console.log(callback);
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
  
}
