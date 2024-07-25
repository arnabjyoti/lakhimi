import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit, ViewChild } from '@angular/core';
import { MembershipRequestService } from './membership-request.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';




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
  selector: 'app-membership-request',
  templateUrl: './membership-request.component.html',
  styleUrls: ['./membership-request.component.css'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [NgxSpinnerModule, RouterModule, MatTableModule, MatPaginatorModule, MatButtonModule, MatInputModule,FormsModule, MatFormFieldModule,CommonModule],
})
export class MembershipRequestComponent implements OnInit{

  public displayedColumns: string[] = ['Sl','brunch_name','member_id','brunch_location','brunch_adrs','brunch_cntct_no','brunch_email','status','apply_date','action'];
  dataSource !: MatTableDataSource<brunchData>
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;


  public selectedAccount:any = {
    id: "",
    f_name: "",
    l_name: "",
    fathers_name: "",
    address: "",
    gender: "",
    dob: "",
    purpose: "",
    occupation: "",
    introducer: "",
    introducer_id: "",
    panNo: "",
    adharNo: "",
    phone_no: "",
    class: "",
    classPrice: "",
    classAdminFee: "",
    nomineeName: "",
    nomineeDOB: "",
    nomineeGender: "",
    nomineePhnoe: "",
    type: "",
    scheme: "",
    dep_period: "",
    dep_frequency: "",
    startDate: "",
    endDate: "",
    first_instlmnt: "",
    openingFee: "",
    brName: "",
    csp_msp: "",
    ac_name: "",
    ac_type: "",
    ac_no: "",
    ac_ifsc: "",
    ac_bankName: "",
    ac_brName: "",
    status: "",
    }

    public ckInput:any ={
      membershipId: "",
    }

    public brAction:any = {
      action:''
    }
  
    public approvel:any = {
      acNo:'',
      status: 'Approved'
    }
  
    public reject:any = {
      reason:'',
      status: 'Reject'
    }

  public check:boolean = false;
  public endpoint: any;


  public user:any;
  public userId:any;
  public brunchId:any;

  public isLodaing: boolean = true;
  
  constructor(
    private MembershipRequestService: MembershipRequestService,
    private toastr:ToastrService,
    private spinner: NgxSpinnerService,
    private datePipe: DatePipe,
  ){
    this.endpoint = environment.BASE_URL;
    this.init();
  }

  init = () =>{
    let token = JSON.parse(JSON.stringify(localStorage.getItem('token')));
    token = JSON.parse(token);

    this.user = token['usr'];
    this.userId = this.user.id;
    this.brunchId = token['brunch'].br_id;
    console.log("zzzzzzzzzzzzzzzzzzzz", this.brunchId);
    
    console.log("Token=", token);
    if(!token.usr.accessKeyword){
      console.log("gggggggggggggggggggggg");
      
      return;
    }
  }

  ngOnInit(): void {
    this.getAppliedMembership();


    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
  }

  getAppliedMembership(){
    let requestObject = {};
    this.ckInput.brunchId = this.brunchId;
    this.MembershipRequestService.getAppliedMemberData(this.ckInput, (callback:any)=>{
      this.isLodaing = false;
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


  showRequestUpdateModal(row:any){
    console.log("Selected Project=", row);
    this.selectedAccount = row;
  }


  approve(){
    const requestObject = {
      mId: this.selectedAccount.id,
      // brunchCode: this.brunchCode,
      eOfficeAcNo: this.approvel.acNo,
      status: this.approvel.status,
    };
    let isValid = this.validateInputs();
    if(isValid){
    this.MembershipRequestService.updateApprovel(requestObject, (res: any) => {

      let ele:any = document.getElementById('modalClose');
      ele.click();

      this.getAppliedMembership();
      this.resetForm();
    });
  }
  }

  validateInputs = () =>{
    console.log("Saving data before validate");
    if (this.brAction.action == "Approve") {
        if(this.approvel.acNo==='' || this.approvel.acNo===null || this.approvel.acNo===undefined){
          this.toastr.warning('Please type E-Office account number','Warning',{
            disableTimeOut:false
          });
          return false;
        }
      }
      if (this.brAction.action == "Reject") {
        if(this.reject.reason==='' || this.reject.reason===null || this.reject.reason===undefined){
          this.toastr.warning('Please type reasons','Warning',{
            disableTimeOut:false
          });
          return false;
        }
      }
    return true;
  }

  remark(){
    const requestObject = {
      mId: this.selectedAccount.id,
      remark: this.reject.reason,
      status: this.reject.status,
    };
    console.log("requestObject",requestObject);
    
    let isValid = this.validateInputs();
    if(isValid){
    this.MembershipRequestService.updateReject(requestObject, (res: any) => {

      let ele:any = document.getElementById('modalClose');
      ele.click();

      this.getAppliedMembership();
      this.resetForm();
    });
  }
  }

  resetForm(){
    console.log("resetform");
    this.brAction.action = '';
    this.approvel.acNo = '';
    this.reject.reason = '';
  }
  
}
