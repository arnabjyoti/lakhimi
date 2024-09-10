import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { BrunchDetailsService } from './brunch-details.service';
import { environment } from 'src/environments/environment';
import { MatSort } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import * as _ from 'lodash'


export interface brunchDetailsData {
  id: string,
  brunchId: string,
  userId: string,
  doj: string,
  dor: string,
}

@Component({
  selector: 'app-brunch-details',
  templateUrl: './brunch-details.component.html',
  styleUrls: ['./brunch-details.component.css'],
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatButtonModule, MatInputModule,FormsModule, MatFormFieldModule, CommonModule,],
})
export class BrunchDetailsComponent implements OnInit{

  public displayedColumns: string[] = ['Sl','brunch_code','brunch_name','brunch_manager','doj','status', 'action'];
  dataSource !: MatTableDataSource<brunchDetailsData>
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  public brunchData = {
    brunchId: "",
    userId: "",
    doj: "",
  }

  public brunchDetailsData = {
    id: "",
    brunchId: "",
    userId: "",
    usr_id: "",
    doj: "",
    brunch_name: "",
    brunch_code: "",
    f_name: "",
    l_name: "",
  }
  public allBrunchManager: any;
  public brunchFormData: any;
  public isSaving: boolean = false;
  public endpoint: any;
  public userList: any;
  public data: any;
  returnMsg:any;


  public branchData:any;

  public filter: any = {
    branch_id: '',
  }
  public apiResponse: any = [];

  constructor(
    private BrunchDetailsService: BrunchDetailsService,
    private toastr:ToastrService,
  ){
    this.endpoint = environment.BASE_URL;
    this.init();
  }
  init = () =>{
    let token = JSON.parse(JSON.stringify(localStorage.getItem('token')));
    token = JSON.parse(token);
    console.log("Token=", token);
    if(!token.usr.accessKeyword){
      console.log("gggggggggggggggggggggg");
      
      return;
    }
  }

  ngOnInit(): void {
    this.getBrunchDetailsData();
    this.getBrunchData();
    this.getUserList();
    this.getBrunchManager()
    this.branch();
  }

  getBrunchManager=()=>{
    let requestObject = {};
    
    this.BrunchDetailsService.getBrunchManager(requestObject, (callback:any)=>{
      this.allBrunchManager = callback;
      console.log(callback);
      
      console.log("bbbbbbbbbb",this.allBrunchManager);
      
    });  
  }

  branch=()=>{
    let requestObject = {};
    this.BrunchDetailsService.getBrunch(requestObject, (callback:any)=>{
      console.log("bbbbbbbbbb",callback);
      this.branchData = callback;
      console.log("location details",this.branchData);
      
    });  
  }

  getBrunchData=()=>{
    let requestObject = {};
    
    this.BrunchDetailsService.getFreeBrunch(requestObject, (callback:any)=>{
      console.log(callback);
      this.brunchFormData = callback;      
    });  
  }

  getUserList=()=>{
    let requestObject = {};
    
    this.BrunchDetailsService.getFreeUser(requestObject, (callback:any)=>{
      console.log(callback);
      // this.departmentName = new MatTableDataSource(callback);
      this.userList = callback,
      console.log("user list",this.userList);
      
    });  
  }

  getBrunchDetailsData=()=>{
    let requestObject = {};
    
    this.BrunchDetailsService.getBrunchDetails(requestObject, (callback:any)=>{
      console.log("callback",callback);

      let temp:any = [];
      callback.map((item: any) => {
        temp.push({
          id: item.id,
          brunch_name: item["brunch.brunch_name"],
          brunch_code: item["brunch.brunch_code"],
          f_name: item["user.f_name"],
          l_name: item["user.l_name"],
          status: item.status,
          doj: item.doj,
          brunchId: item.brunchId,

        })
        this.data = temp;
        this.apiResponse = this.data;
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
    
    this.getBrunchDetailsData();
  }

  save() {
    this.isSaving = true;
    console.log("input data",this.brunchData);
    let isValid = this.validateInputs();
    if(isValid){
    this.BrunchDetailsService.addBrunchDetails(this.brunchData, (res: any) =>{
      this.returnMsg = res.message;
      console.log("lllllllllll",this.returnMsg);
      // this.location();
      let ele:any = document.getElementById('modalClose');
      ele.click();
      this.isSaving = false;
      this.getBrunchDetailsData();
      this.resetForm();
      this.getBrunchData();
      this.getUserList();
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

  resetForm(){
    this.brunchData.brunchId = '';
    this.brunchData.userId = '';
    this.brunchData.doj = '';
  }




  showRequestUpdateModal(row:any){
    console.log("Selected Project=", row);
    this.brunchDetailsData.f_name = row.f_name;
    this.brunchDetailsData.l_name = row.l_name;
    this.brunchDetailsData.brunch_code = row.brunch_code;
    this.brunchDetailsData.brunch_name = row.brunch_name;
    this.brunchDetailsData.userId = row.userId;
    this.brunchDetailsData.id = row.id;
  }


  updateData(){
    console.log("this.brunchDetailsData", this.brunchDetailsData);
    this.isSaving = true;
    let isValid = this.validateUpdateInputs();
    if(isValid){
    this.BrunchDetailsService.updateBrunchManager(this.brunchDetailsData, (res: any) =>{
      this.returnMsg = res.message;
      console.log("lllllllllll",this.returnMsg);
      // this.location();
      let ele:any = document.getElementById('updateModalClose');
      ele.click();
      this.isSaving = false;
      this.getBrunchDetailsData();
      this.getBrunchData();
      this.getUserList();
      this.brunchDetailsData.usr_id = '';
    });
  }else{
    this.isSaving = false;
  };
  }

  validateUpdateInputs = () =>{
    console.log("Saving project before validate",this.brunchDetailsData);
    if(this.brunchDetailsData.usr_id==='' || this.brunchDetailsData.usr_id===null || this.brunchDetailsData.usr_id===undefined){
      this.toastr.warning('Please select branch manager name.','Warning',{
        disableTimeOut:false
      });
      return false;
    }
    return true;
  }
}
