import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersService } from './users.service';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { environment } from 'src/environments/environment';
import { brunchDetailsData } from '../brunch-details/brunch-details.component';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { CommonModule } from '@angular/common';
import * as _ from 'lodash'


export interface usersData {
  id: string,
  brunch_name: string,
  brunch_code: string,
  brunch_location: string,
  brunch_adrs: string,
  brunch_cntct_no: string,
  
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  standalone: true,
  imports: [NgxSpinnerModule, MatTableModule, MatPaginatorModule, MatButtonModule, MatInputModule,FormsModule, MatFormFieldModule, MatSortModule, CommonModule],
})
export class UsersComponent implements OnInit{

  public displayedColumns: string[] = ['Sl','user_name','position', 'category', 'designation', 'salaried', 'email','phone_no','active'];
  dataSource !: MatTableDataSource<brunchDetailsData>
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  public userInputData:any = {
    f_name: "",
    l_name: "",
    address: "",
    position: "",
    category: "",
    designation: "",
    salaried: "",
    employeeId: "",
    email: "",
    phone_no: "",
    role: "",
    createdBy: "",
  }
  public isSaving: boolean = false;
  public endpoint: any;
  public userList: any;
  public user:any;
  public userId:any;
  returnMsg:any;

  public brunchFormData: any;
  public branchData:any;

  public isLodaing = true;

  public filter: any = {
    branch_id: '',
  }
  public apiResponse: any = [];

  constructor(
    private spinner: NgxSpinnerService,
    private UsersService: UsersService,
    private toastr:ToastrService,
  ){
    this.endpoint = environment.BASE_URL;
    this.init();
  }
  init = () =>{
    let token = JSON.parse(JSON.stringify(localStorage.getItem('token')));
    token = JSON.parse(token);

    this.user = token['usr'];
    this.userId = this.user.id;
    console.log("Token=", token);
    if(!token.usr.accessKeyword){
      console.log("gggggggggggggggggggggg");
      
      return;
    }
  }

  ngOnInit(): void {
    this.getUserList();
    // this.getBrunchData();
  }


  spiner() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 5000);
  }


  getBrunchData=()=>{
    let requestObject = {};
    
    this.UsersService.getBrunch(requestObject, (callback:any)=>{
      console.log(callback);
      this.brunchFormData = callback; 
      this.branchData = callback;     
    });  
  }

  getUserList=()=>{
    let requestObject = {};
    
    this.UsersService.getUser(requestObject, (callback:any)=>{
      console.log(callback);
      
      this.apiResponse = callback;

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
    this.getUserList();
  }

  save() {
    this.isSaving = true;
    let isValid = this.validateInputs();
    if(isValid){
      this.isLodaing = true;
    this.spiner();
    console.log("input data",this.userInputData);
    this.userInputData.createdBy = this.userId;
    this.UsersService.createUser(this.userInputData, (res: any) =>{
      this.returnMsg = res.message;
      this.isLodaing = false;
      console.log("lllllllllll",this.returnMsg);
      // this.location();
      let ele:any = document.getElementById('modalClose');
      ele.click();
      this.isSaving = false;
      this.getUserList();
      this.resetform();
    });
  }else{
    this.isSaving = false;
  }
  }

  validateInputs = () =>{
    console.log("Saving data before validate",this.userInputData);
    if(this.userInputData.f_name==='' || this.userInputData.f_name===null || this.userInputData.f_name===undefined){
      this.toastr.warning('Please enter first name.','Warning',{
        disableTimeOut:false
      });
      return false;
    }
    if(this.userInputData.l_name==='' || this.userInputData.l_name===null || this.userInputData.l_name===undefined){
      this.toastr.warning('Please enter last name.','Warning',{
        disableTimeOut:false
      });
      return false;
    }
    if(this.userInputData.email==='' || this.userInputData.email===null || this.userInputData.email===undefined){
      this.toastr.warning('Please enter email.','Warning',{
        disableTimeOut:false
      });
      return false;
    }
    if(this.userInputData.phone_no < 1000000000 || this.userInputData.phone_no > 9999999999){
      this.toastr.warning('Please enter phone number.','Warning',{
        disableTimeOut:false
      });
      return false;
    }
    if(this.userInputData.position==='' || this.userInputData.position===null || this.userInputData.position===undefined){
      this.toastr.warning('Please enter position.','Warning',{
        disableTimeOut:false
      });
      return false;
    }
    if (this.userInputData.position === "Branch Manager") {
      this.userInputData.role = "branch_manager"
    }
    else if (this.userInputData.position === "Field Agent" || this.userInputData.position === "Field Assistant") {
      this.userInputData.role = "field_agent"
    }
    else if (this.userInputData.position === "Cashier") {
      this.userInputData.role = "Cashier"
    }
    if(this.userInputData.category==='' || this.userInputData.category===null || this.userInputData.category===undefined){
      this.toastr.warning('Please enter category.','Warning',{
        disableTimeOut:false
      });
      return false;
    }
    if(this.userInputData.designation==='' || this.userInputData.designation===null || this.userInputData.designation===undefined){
      this.toastr.warning('Please select designation.','Warning',{
        disableTimeOut:false
      });
      return false;
    }
    if(this.userInputData.salaried==='' || this.userInputData.salaried===null || this.userInputData.salaried===undefined){
      this.toastr.warning('Please enter salaried.','Warning',{
        disableTimeOut:false
      });
      return false;
    }
    if(this.userInputData.employeeId==='' || this.userInputData.employeeId===null || this.userInputData.employeeId===undefined){
      this.toastr.warning('Please enter Employee ID.','Warning',{
        disableTimeOut:false
      });
      return false;
    }
    if(this.userInputData.address==='' || this.userInputData.address===null || this.userInputData.address===undefined){
      this.toastr.warning('Please enter address.','Warning',{
        disableTimeOut:false
      });
      return false;
    }
    return true;
  }

  resetform(){
    this.userInputData.f_name = "";
    this.userInputData.l_name = "";
    this.userInputData.address = "";
    this.userInputData.position = "";
    this.userInputData.email = "";
    this.userInputData.phone_no = "";
    this.userInputData.role = "";
    this.userInputData.category = "";
    this.userInputData.salaried = "";
    this.userInputData.employeeId = "";
    this.userInputData.designation = "";
  }

}
