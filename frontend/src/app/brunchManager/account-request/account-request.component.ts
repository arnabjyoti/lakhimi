import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { brunchData } from '../membership-request/membership-request.component';
import { AccountRequestService } from './account-request.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import {NgxPrintModule} from 'ngx-print';

@Component({
  selector: 'app-account-request',
  templateUrl: './account-request.component.html',
  styleUrls: ['./account-request.component.css'],
  standalone: true,
  imports: [NgxPrintModule,NgxSpinnerModule,RouterModule, MatTableModule, MatPaginatorModule, MatButtonModule, MatInputModule,FormsModule, MatFormFieldModule,CommonModule],
})
export class AccountRequestComponent implements OnInit{

  public displayedColumns: string[] = ['Sl','name','ac_no','type','membershipId','referenceNo','status','apply_date','action'];
  dataSource !: MatTableDataSource<brunchData>
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;


  public ckInput:any ={
    membershipId: "",
  }
  public selectedAccount = {
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
    membership_No: "",
    panNo: "",
    adharNo: "",
    photo: "",
    sign: "",
    phone_no: "",
    class: "",
    account_no: "",
    status: "",
    classPrice: "",
    classAdminFee: "",
    nomineeName: "",
    nomineeDOB: "",
    nomineeGender: "",
    nomineePhnoe: "",
    nomineeRelation: "",
    opening_balance: "",
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
    membershipId: ""
    };

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
  public rqstId: any;
  public isLodaing = true;

  public hideAction: boolean = false;
  public showSaveData: boolean = false;
  
  public data: any;

  public user:any;
  public userId:any;
  public brunchId:any;

  constructor(
    private AccountRequestService: AccountRequestService,
    private toastr:ToastrService,
    private spinner: NgxSpinnerService
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
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 2000);


    this.getAppliedAccountReq();
  }


  getAppliedAccountReq(){
    let requestObject = {};
    this.ckInput.brunchId = this.brunchId;
    this.AccountRequestService.getAppliedAcOpenData(this.ckInput, (callback:any)=>{
      this.isLodaing = false;
      console.log(callback);

      let temp:any = [];
      callback.map((item: any) => {
        temp.push({
          f_name: item["membership.f_name"],
          l_name: item["membership.l_name"],
          membership_No: item["membership.membership_id"],
          phone_no: item["membership.phone_no"],
          panNo: item["membership.panNo"],
          status: item.status,
          reference_no: item.reference_no,
          type: item.type,
          id: item.id,
          membershipId: item.membershipId,
          fathers_name:item["membership.fathers_name"],
          address: item["membership.address"],
          gender: item["membership.gender"],
          dob: item["membership.dob"],
          purpose: item["membership.purpose"],
          occupation:item["membership.occupation"],
          introducer: item["membership.introducer"],
          introducer_id: item["membership.introducer_id"],
          adharNo: item["membership.adharNo"],
          photo: item["membership.photo"],
          sign: item["membership.sign"],
          class: item.class,
          account_no: item.account_no,
          classPrice: item.classPrice,
          classAdminFee: item.classAdminFee,
          nomineeName: item.nomineeName,
          nomineeDOB: item.nomineeDOB,
          nomineeGender: item.nomineeGender,
          nomineePhnoe: item.nomineePhnoe,
          nomineeRelation: item.nomineeRelation,
          opening_balance: item.opening_balance,
          scheme: item.scheme,
          dep_period: item.dep_period,
          dep_frequency: item.dep_frequency,
          startDate: item.startDate,
          endDate: item.endDate,
          first_instlmnt: item.first_instlmnt,
          openingFee: item.openingFee,
          brName: item.brName,
          csp_msp: item.csp_msp,
          ac_name: item.ac_name,
          ac_type: item.ac_type,
          ac_no: item.ac_no,
          ac_ifsc: item.ac_ifsc,
          ac_bankName: item.ac_bankName,
          ac_brName: item.ac_brName,
          createdAt: item.createdAt
        })
        this.data = temp;
      });
      this.rqstId = callback.id;
      console.log("idddddddddddddddddddd",this.rqstId);
      
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

  showRequestUpdateModal(row:any){
    console.log("Selected Project=", row);
    this.selectedAccount = row;
  }

  approve(){
    const requestObject = {
      mId: this.selectedAccount.id,
      status: this.approvel.status,
    };
    let isValid = this.validateInputs();
    if(isValid){
    this.AccountRequestService.updateAccountApprovel(requestObject, (res: any) => {

      let ele:any = document.getElementById('modalClose');
      ele.click();

      this.resetForm();
      this.getAppliedAccountReq();
    });
  }
  }

  remark(){
    const requestObject = {
      mId: this.selectedAccount.id,
      remark: this.reject.reason,
      status: this.reject.status,
    };
    let isValid = this.validateInputs();
    if(isValid){
    this.AccountRequestService.updateAccountReject(requestObject, (res: any) => {
      
      let ele:any = document.getElementById('modalClose');
      ele.click();

      this.resetForm();
      this.getAppliedAccountReq();
    });
  }
  }


  validateInputs = () =>{
    console.log("Saving data before validate");
    if (this.brAction.action == "Approve") {
        if (this.check === false) {
          this.toastr.warning('Please check the checkbox','Warning',{
            disableTimeOut:false
          });
          return false;
        }
      }
      if (this.brAction.action == "Reject") {
        if (this.check === false) {
          this.toastr.warning('Please check the checkbox','Warning',{
            disableTimeOut:false
          });
          return false;
        }
        if(this.reject.reason==='' || this.reject.reason===null || this.reject.reason===undefined){
          this.toastr.warning('Please type reasons','Warning',{
            disableTimeOut:false
          });
          return false;
        }
      }
    return true;
  }


  resetForm(){
    this.reject.reason = '';
    this.brAction.action = '';
    this.check = false
  }
}
