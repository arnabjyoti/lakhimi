import { Component, OnInit, ViewChild } from '@angular/core';
import { FieldAgentService } from './field-agent.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

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
  selector: 'app-field-agent',
  templateUrl: './field-agent.component.html',
  styleUrls: ['./field-agent.component.css'],
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatButtonModule, MatInputModule,FormsModule, MatFormFieldModule, CommonModule],
})
export class FieldAgentComponent implements OnInit{

  public displayedColumns: string[] = ['Sl','agent_name','Phone_number', 'agent_address', 'brunch_code','brunch_name','doj','dor','status'];
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
  public isSaving: boolean = false;
  public endpoint: any;
  public userList: any;
  public data: any;
  returnMsg:any;

  constructor(
    private FieldAgentService: FieldAgentService,
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
    this.getFieldAgentsData();
    this.getBrunchData();
    this.getFieldAgentList();
  }

  getBrunchData=()=>{
    let requestObject = {};
    
    this.FieldAgentService.getBrunch(requestObject, (callback:any)=>{
      console.log(callback);
      this.brunchFormData = callback;      
    });  
  }

  getFieldAgentList=()=>{
    let requestObject = {};
    
    this.FieldAgentService.getfieldAgent(requestObject, (callback:any)=>{
      console.log(callback);
      // this.departmentName = new MatTableDataSource(callback);
      this.userList = callback,
      console.log("user list",this.userList);
      
    });  
  }

  getFieldAgentsData=()=>{
    let requestObject = {};
    
    this.FieldAgentService.getFieldAgentDetails(requestObject, (callback:any)=>{
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
          status: item.status,
          doj: item.doj,

        })
        this.data = temp;
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

  save() {
    this.isSaving = true;
    console.log("input data",this.brunchData);
    let isValid = this.validateInputs();
    if(isValid){
    this.FieldAgentService.addBrunchDetails(this.brunchData, (res: any) =>{
      this.returnMsg = res.message;
      console.log("lllllllllll",this.returnMsg);
      // this.location();
      let ele:any = document.getElementById('modalClose');
      ele.click();
      this.isSaving = false;
      this.getFieldAgentsData();
      this.getBrunchData();
      this.getFieldAgentList();
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
