import { Component, OnInit, ViewChild } from '@angular/core';
import { CashierService } from './cashier.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { MatSort } from '@angular/material/sort';
import * as _ from 'lodash'


export interface brunchDetailsData {
  id: string,
  brunchId: string,
  userId: string,
  doj: string,
  dor: string,
  phone_no: string,
  address: string,
}

@Component({
  selector: 'app-cashier',
  templateUrl: './cashier.component.html',
  styleUrls: ['./cashier.component.css'],
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatButtonModule, MatInputModule,FormsModule, MatFormFieldModule, CommonModule],
})
export class CashierComponent implements OnInit{

  public displayedColumns: string[] = ['Sl','cashier_name','Phone_number', 'agent_address', 'brunch_code','brunch_name', 'email', 'doj','dor','status'];
  dataSource !: MatTableDataSource<brunchDetailsData>
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;


  public brunchData = {
    brunchId: "",
    userId: "",
    doj: "",
  }

  public user:any;
  public role:any;
  public brunchFormData: any;
  public cashierList: any;
  public endpoint: any;
  public data: any;
  public isSaving: boolean = false;
  public returnMsg:any;


  public branchData:any;

  public filter: any = {
    branch_id: '',
  }
  public apiResponse: any = [];

  constructor(
    private CashierService: CashierService,
    private toastr:ToastrService,
  ){
    this.endpoint = environment.BASE_URL;
    this.init();
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
    this.getCashierData();
    this.getBrunchData();
    this.getCashierList();
  }


  getBrunchData=()=>{
    let requestObject = {};
    
    this.CashierService.getBrunch(requestObject, (callback:any)=>{
      console.log(callback);
      this.brunchFormData = callback;      
      this.branchData = callback;
    });  
  }


  getCashierList=()=>{
    let requestObject = {};
    
    this.CashierService.getCashier(requestObject, (callback:any)=>{
      console.log(callback);
      // this.departmentName = new MatTableDataSource(callback);
      this.cashierList = callback,
      console.log("cashier list",this.cashierList);
      
    });  
  }



  getCashierData=()=>{
    let requestObject = {};
    
    this.CashierService.getCashierDetails(requestObject, (callback:any)=>{
      console.log(callback);

      let temp:any = [];
      callback.map((item: any) => {
        temp.push({
          brunch_name: item["brunch.brunch_name"],
          brunch_code: item["brunch.brunch_code"],
          f_name: item["user.f_name"],
          l_name: item["user.l_name"],
          phone_no: item["user.phone_no"],
          address: item["user.address"],
          email: item["user.email"],
          status: item.status,
          doj: item.doj,
          brunchId: item.brunchId,

        })
        this.data = temp;
        this.apiResponse = this.data;
        console.log("data",this.data);
      });

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
    
    this.getCashierData();
  }


  save() {
    this.isSaving = true;
    console.log("input data",this.brunchData);
    let isValid = this.validateInputs();
    if(isValid){
    this.CashierService.addCashierBrunchDetails(this.brunchData, (res: any) =>{
      this.returnMsg = res.message;
      console.log("lllllllllll",this.returnMsg);
      // this.location();
      let ele:any = document.getElementById('modalClose');
      ele.click();
      this.isSaving = false;
      this.getCashierData();
      this.getBrunchData();
      this.getCashierList();
      this.resetform();
    });
  }else{
    this.isSaving = false;
  };
  }



  validateInputs = () =>{
    console.log("Saving project before validate",this.brunchData);
    if(this.brunchData.brunchId==='' || this.brunchData.brunchId===null || this.brunchData.brunchId===undefined){
      this.toastr.warning('Please select brunch name.','Warning',{
        disableTimeOut:false
      });
      return false;
    }
    if(this.brunchData.userId==='' || this.brunchData.userId===null || this.brunchData.userId===undefined){
      this.toastr.warning('Please select branch manager','Warning',{
        disableTimeOut:false
      });
      return false;
    }
    if(this.brunchData.doj==='' || this.brunchData.doj===null || this.brunchData.doj===undefined){
      this.toastr.warning('Please type date of joining','Warning',{
        disableTimeOut:false
      });
      return false;
    }
    return true;
  }
  

  resetform(){
    this.brunchData.brunchId = "";
    this.brunchData.userId = "";
    this.brunchData.doj = "";
  }

}
