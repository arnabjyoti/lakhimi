import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { BrunchService } from './brunch.service';
import { environment } from 'src/environments/environment';
import { MatSort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';


export interface brunchData {
  id: string,
  brunch_name: string,
  brunch_code: string,
  brunch_location: string,
  brunch_adrs: string,
  brunch_cntct_no: string,
  brunch_email: string,
  
}

@Component({
  selector: 'app-brunch',
  templateUrl: './brunch.component.html',
  styleUrls: ['./brunch.component.css'],
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatButtonModule, MatInputModule,FormsModule, MatFormFieldModule,],
})
export class BrunchComponent implements OnInit{

  public displayedColumns: string[] = ['Sl','brunch_code','brunch_name','brunch_location','brunch_adrs','brunch_cntct_no','brunch_email'];
  dataSource !: MatTableDataSource<brunchData>
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  public brunchData:any = {
    brunch_name: "",
    brunch_code: "",
    brunch_location: "",
    brunch_adrs: "",
    brunch_cntct_no: "",
    brunch_email: "",
  }
  public isSaving: boolean = false;
  public endpoint: any;
  returnMsg:any;

  constructor(
    private BrunchService: BrunchService,
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
    this.getBrunch();
  }

  getBrunch=()=>{
    let requestObject = {};
    
    this.BrunchService.getBrunch(requestObject, (callback:any)=>{
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

  save() {
    this.isSaving = true;
    console.log("input data",this.brunchData);
    let isValid = this.validateInputs();
    if(isValid){
    this.BrunchService.addBrunch(this.brunchData, (res: any) =>{
      this.returnMsg = res.message;
      console.log("lllllllllll",this.returnMsg);
      // this.location();
      let ele:any = document.getElementById('modalClose');
      ele.click();
      this.isSaving = false;
      this.resetForm();
      this.getBrunch();
    })
  }else{
    this.isSaving = false;
  };
  }

  resetForm(){
    this.brunchData.brunch_adrs = '';
    this.brunchData.brunch_cntct_no = '';
    this.brunchData.brunch_code = '';
    this.brunchData.brunch_email = '';
    this.brunchData.brunch_location = '';
    this.brunchData.brunch_name = '';
  }


  validateInputs = () =>{
    console.log("Saving project before validate",this.brunchData);
    if(this.brunchData.brunch_name==='' || this.brunchData.brunch_name===null || this.brunchData.brunch_name===undefined){
      this.toastr.warning('Please type branch name.','Warning',{
        disableTimeOut:false
      });
      return false;
    }
    if(this.brunchData.brunch_code==='' || this.brunchData.brunch_code===null || this.brunchData.brunch_code===undefined){
      this.toastr.warning('Please type branch code','Warning',{
        disableTimeOut:false
      });
      return false;
    }
    if(this.brunchData.brunch_location==='' || this.brunchData.brunch_location===null || this.brunchData.brunch_location===undefined){
      this.toastr.warning('Please type branch location','Warning',{
        disableTimeOut:false
      });
      return false;
    }
    if(this.brunchData.brunch_adrs==='' || this.brunchData.brunch_adrs===null || this.brunchData.brunch_adrs===undefined){
      this.toastr.warning('Please type branch address','Warning',{
        disableTimeOut:false
      });
      return false;
    }
    if(this.brunchData.brunch_cntct_no < 1000000000 || this.brunchData.brunch_cntct_no > 9999999999){
      this.toastr.warning('Please type branch contact number must be 10 digits','Warning',{
        disableTimeOut:false
      });
      return false;
    }
    if(this.brunchData.brunch_email==='' || this.brunchData.brunch_email===null || this.brunchData.brunch_email===undefined){
      this.toastr.warning('Please type branch email','Warning',{
        disableTimeOut:false
      });
      return false;
    }
    return true;
  }

}

