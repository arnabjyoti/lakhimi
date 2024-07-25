import { Component, OnInit, ViewChild } from '@angular/core';
import { FieldAgentListService } from './field-agent-list.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { brunchDetailsData } from 'src/app/admin/field-agent/field-agent.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-field-agent-list',
  templateUrl: './field-agent-list.component.html',
  styleUrls: ['./field-agent-list.component.css'],
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatButtonModule, MatInputModule,FormsModule, MatFormFieldModule, CommonModule],
})
export class FieldAgentListComponent implements OnInit{
  public displayedColumns: string[] = ['Sl','agent_name','Phone_number', 'agent_address','doj','dor','status'];
  dataSource !: MatTableDataSource<brunchDetailsData>
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  public brunchData = {
    brunchId: "",
    userId: "",
    doj: "",
  }
  public brunchId: any;
  public user:any;
  public role:any;
  public brunchFormData: any;
  public isSaving: boolean = false;
  public endpoint: any;
  public userList: any;
  public data: any;
  returnMsg:any;

  constructor(
    private FieldAgentListService: FieldAgentListService,
    private toastr:ToastrService,
  ){
    this.endpoint = environment.BASE_URL;
    this.init();
  }
  init = () =>{
    let token = JSON.parse(JSON.stringify(localStorage.getItem('token')));
    token = JSON.parse(token);
    this.user = token['usr'];
    this.brunchId = token['brunch'].br_id;
    this.role = this.user.role;
    console.log("Token=", token);
    if(!token.usr.accessKeyword){
      console.log("gggggggggggggggggggggg");
      
      return;
    }
  }

  ngOnInit(): void {
    this.getFieldAgentsData();
  }


  getFieldAgentsData=()=>{
    let requestObject = {};
    console.log("brunchId",this.brunchId);
    
    this.FieldAgentListService.getFieldAgentDetails(this.brunchId, (callback:any)=>{
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


}
