import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { NewAccountService } from './new-account.service';
import { MatSort } from '@angular/material/sort';
import { brunchData } from '../new-membership/new-membership.component';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css'],
  standalone: true,
  imports: [NgxSpinnerModule,RouterModule, MatTableModule, MatPaginatorModule, MatButtonModule, MatInputModule,FormsModule, MatFormFieldModule,CommonModule],
})
export class NewAccountComponent implements OnInit{

  public displayedColumns: string[] = ['Sl','name','account_no','type','membershipId','referenceNo','phoneNo','status','apply_date','action'];
  dataSource !: MatTableDataSource<brunchData>
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;


  
  public ckInput:any ={
    membershipId: "",
  }
 public memberData:any = {
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
 classAdminFee: 50,
 nomineeName: "",
 nomineeDOB: "",
 nomineeGender: "",
 nomineePhnoe: "",
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
 account_no: "",
 status: "",
 }


 public accountData:any = {
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
  classAdminFee: 50,
  nomineeName: "",
  nomineeDOB: "",
  nomineeGender: "",
  nomineePhnoe: "",
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
  }

  public isLodaing = true;

  public rfrncNo:any;
  public isSaving: boolean = false;
  public day:any;
  public month: any;

  public found:boolean = false;
  public notFound: boolean = false;
  public check:boolean = false;
  public checkUpdate:boolean = false;
  public endpoint: any;
  public user:any;
  public userId:any;
  public brunchId:any;
  public returnMsg:any;

  public data:any;

  constructor(
    private spinner: NgxSpinnerService,
    private NewAccountService: NewAccountService,
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
    this.brunchId = token['brunch'].br_id;
    console.log("zzzzzzzzzzzzzzzzzzzz", this.brunchId);
    
    console.log("Token=", token);
    if(!token.usr.accessKeyword){
      console.log("gggggggggggggggggggggg");
      
      return;
    }
  }

  ngOnInit(): void {
    this.spiner();
    this.getAppliedAcOpeningId();
  }

  spiner(){
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 5000);
  }

  getAppliedAcOpeningId(){
    let requestObject = {};
    this.NewAccountService.getAplAcById(this.userId, (callback:any)=>{
      console.log("bbbbbbbbbbbbbbbbbbbb",callback);
      this.isLodaing = false;
      let temp:any = [];
      callback.map((item: any) => {
        temp.push({
          f_name: item["membership.f_name"],
          l_name: item["membership.l_name"],
          fathers_name: item["membership.fathers_name"],
          address: item["membership.address"],
          gender: item["membership.gender"],
          dob: item["membership.dob"],
          purpose: item["membership.purpose"],
          occupation: item["membership.occupation"],
          introducer: item["membership.introducer"],
          introducer_id: item["membership.introducer_id"],
          membership_No: item["membership.membership_id"],
          phone_no: item["membership.phone_no"],
          adharNo: item["membership.adharNo"],
          panNo: item["membership.panNo"],
          id: item.id,
          class: item.class,
          classPrice: item.classPrice,
          classAdminFee: item.classAdminFee,
          nomineeName: item.nomineeName,
          nomineeDOB: item.nomineeDOB,
          nomineeGender: item.nomineeGender,
          nomineePhnoe: item.nomineePhnoe,
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
          status: item.status,
          createdAt: item.createdAt,
          reference_no: item.reference_no,
          type: item.type,
          account_no: item.account_no,
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

  checkMember(){
    this.ckInput.brunchId = this.brunchId;
    console.log("check input data",this.ckInput);
    
    this.NewAccountService.checkMemberData(this.ckInput, (res: any) => {
      this.returnMsg = res;
      console.log("lllllllllll",this.returnMsg);
      if (res == null) {
        this.notFound = true;
        this.found = false;
      }else{
        this.found = true;
        this.notFound = false;

        console.log("ccccccccccccc",res);
        
        
          this.memberData.id = res.id,
          this.memberData.f_name = res.f_name,
          this.memberData.l_name = res.l_name,
          this.memberData.fathers_name = res.fathers_name,
          this.memberData.address = res.address,
          this.memberData.gender = res.gender,
          this.memberData.dob = res.dob,
          this.memberData.purpose = res.purpose,
          this.memberData.occupation = res.occupation,
          this.memberData.introducer = res.introducer,
          this.memberData.introducer_id = res.introducer_id,
          this.memberData.panNo = res.panNo,
          this.memberData.adharNo = res.adharNo,
          this.memberData.phone_no = res.phone_no,
       
      console.log("aitu",this.memberData);
      
      }
  })
}



saveData() {
  this.isSaving = true;
  this.memberData.createdBy = this.userId;
  this.memberData.membershipId = this.memberData.id;
  this.memberData.brunchId = this.brunchId;
  this.memberData.csp_msp = this.user.f_name;
  this.memberData.reference_no = this.convertDate();
  console.log("input data",this.memberData);
  let isValid = this.validateInputs();
  if(isValid){
  this.NewAccountService.addNewAccount(this.memberData, (res: any) =>{
    this.spiner();
    this.returnMsg = res.message;
    this.rfrncNo =this.memberData.reference_no;
    console.log("lllllllllll",this.returnMsg);
    let ele:any = document.getElementById('modalClose');
    ele.click();
    this.getAppliedAcOpeningId();
    this.resetForm();
    this.isSaving = false;
  });
}else{
    this.isSaving = false;
  }
}

convertDate() {
  var date = new Date();
  const year = date.getFullYear();
  const month = this.padZero(date.getMonth() + 1); // Month starts from 0
  const day = this.padZero(date.getDate());
  const hours = this.padZero(date.getHours());
  const minutes = this.padZero(date.getMinutes());
  const seconds = this.padZero(date.getSeconds());
  return `${year}${month}${day}${hours}${minutes}${seconds}`;
}

padZero(num: number): string {
  return num < 10 ? `0${num}` : `${num}`;
}

validateInputs = () =>{
  console.log("Saving project before validate",this.memberData);
  if(this.memberData.class==='' || this.memberData.class===null || this.memberData.class===undefined){
    this.toastr.warning('Please select class','Warning',{
      disableTimeOut:false
    });
    return false;
  }
  if(this.memberData.classPrice==='' || this.memberData.classPrice===null || this.memberData.classPrice===undefined){
    this.toastr.warning('Please type class price','Warning',{
      disableTimeOut:false
    });
    return false;
  }
  if(this.memberData.classAdminFee==='' || this.memberData.classAdminFee===null || this.memberData.classAdminFee===undefined){
    this.toastr.warning('Please type admin fee','Warning',{
      disableTimeOut:false
    });
    return false;
  }
  if(this.memberData.nomineeName==='' || this.memberData.nomineeName===null || this.memberData.nomineeName===undefined){
    this.toastr.warning('Please type nominee name','Warning',{
      disableTimeOut:false
    });
    return false;
  }
  if(this.memberData.nomineeDOB==='' || this.memberData.nomineeDOB===null || this.memberData.nomineeDOB===undefined){
    this.toastr.warning('Please type nominee Date of birth','Warning',{
      disableTimeOut:false
    });
    return false;
  }
  if(this.memberData.nomineeGender==='' || this.memberData.nomineeGender===null || this.memberData.nomineeGender===undefined){
    this.toastr.warning('Please select nominee gender','Warning',{
      disableTimeOut:false
    });
    return false;
  }
  if(this.memberData.nomineePhnoe < 1000000000 || this.memberData.nomineePhnoe > 9999999999){
    this.toastr.warning('Please type nominee phone number & must be 10 digits','Warning',{
      disableTimeOut:false
    });
    return false;
  }
  if(this.memberData.opening_balance==='' || this.memberData.opening_balance===null || this.memberData.opening_balance===undefined){
    this.toastr.warning('Please type account opening balance','Warning',{
      disableTimeOut:false
    });
    return false;
  }
  if(this.memberData.type==='' || this.memberData.type===null || this.memberData.type===undefined){
    this.toastr.warning('Please select account type','Warning',{
      disableTimeOut:false
    });
    return false;
  }
  if(this.memberData.scheme==='' || this.memberData.scheme===null || this.memberData.scheme===undefined){
    this.toastr.warning('Please select deposit scheme','Warning',{
      disableTimeOut:false
    });
    return false;
  }
  if(this.memberData.dep_period==='' || this.memberData.dep_period===null || this.memberData.dep_period===undefined){
    this.toastr.warning('Please type deposit period','Warning',{
      disableTimeOut:false
    });
    return false;
  }
  if(this.memberData.dep_frequency==='' || this.memberData.dep_frequency===null || this.memberData.dep_frequency===undefined){
    this.toastr.warning('Please type frequency','Warning',{
      disableTimeOut:false
    });
    return false;
  }
  if(this.memberData.startDate==='' || this.memberData.startDate===null || this.memberData.startDate===undefined){
    this.toastr.warning('Please type start date','Warning',{
      disableTimeOut:false
    });
    return false;
  }
  if(this.memberData.endDate==='' || this.memberData.endDate===null || this.memberData.endDate===undefined){
    this.toastr.warning('Please type end date','Warning',{
      disableTimeOut:false
    });
    return false;
  }
  if(this.memberData.first_instlmnt==='' || this.memberData.first_instlmnt===null || this.memberData.first_instlmnt===undefined){
    this.toastr.warning('Please type first instalment amount','Warning',{
      disableTimeOut:false
    });
    return false;
  }
  if(this.memberData.openingFee==='' || this.memberData.openingFee===null || this.memberData.openingFee===undefined){
    this.toastr.warning('Please type opening fee','Warning',{
      disableTimeOut:false
    });
    return false;
  }
  if(this.memberData.csp_msp==='' || this.memberData.csp_msp===null || this.memberData.csp_msp===undefined){
    this.toastr.warning('Please type CSP/MSP','Warning',{
      disableTimeOut:false
    });
    return false;
  }
  if(this.memberData.ac_name==='' || this.memberData.ac_name===null || this.memberData.ac_name===undefined){
    this.toastr.warning('Please type name in account','Warning',{
      disableTimeOut:false
    });
    return false;
  }
  if(this.memberData.ac_type==='' || this.memberData.ac_type===null || this.memberData.ac_type===undefined){
    this.toastr.warning('Please type account type','Warning',{
      disableTimeOut:false
    });
    return false;
  }
  if(this.memberData.ac_no==='' || this.memberData.ac_no===null || this.memberData.ac_no===undefined){
    this.toastr.warning('Please type account number','Warning',{
      disableTimeOut:false
    });
    return false;
  }
  if(this.memberData.ac_ifsc==='' || this.memberData.ac_ifsc===null || this.memberData.ac_ifsc===undefined){
    this.toastr.warning('Please type account IFSC','Warning',{
      disableTimeOut:false
    });
    return false;
  }
  if(this.memberData.ac_bankName==='' || this.memberData.ac_bankName===null || this.memberData.ac_bankName===undefined){
    this.toastr.warning('Please type bank name','Warning',{
      disableTimeOut:false
    });
    return false;
  }
  if(this.memberData.ac_brName==='' || this.memberData.ac_brName===null || this.memberData.ac_brName===undefined){
    this.toastr.warning('Please type brunch name','Warning',{
      disableTimeOut:false
    });
    return false;
  }
  if (this.check === false) {
    this.toastr.warning('Please check the checkbox','Warning',{
      disableTimeOut:false
    });
    return false;
  }
  return true;
}


resetForm(){
  this.ckInput.membershipId = "";
  this.found = false;
  this.memberData.class = "";
  this.memberData.classPrice = "";
  this.memberData.classAdminFee = 50;
  this.memberData.nomineeName = "";
  this.memberData.nomineeDOB = "";
  this.memberData.nomineeGender = "";
  this.memberData.nomineePhnoe = "";
  this.memberData.opening_balance = "";
  this.memberData.type = "";
  this.memberData.scheme = "";
  this.memberData.dep_period = "";
  this.memberData.dep_frequency = "";
  this.memberData.startDate = "";
  this.memberData.endDate = "";
  this.memberData.first_instlmnt = "";
  this.memberData.openingFee = "";
  this.memberData.brName = "";
  this.memberData.csp_msp = "";
  this.memberData.ac_name = "";
  this.memberData.ac_type = "";
  this.memberData.ac_no = "";
  this.memberData.ac_ifsc = "";
  this.memberData.ac_bankName = "";
  this.check = false;
}









// update form


showRequestUpdateModal(row:any){
  console.log("Selected Project=", row);
  this.accountData = row;
}

updateData(){
  this.accountData.mId= this.accountData.id;
  let isUpdateValid = this.validateUpdateInputs();
  if(isUpdateValid){
  this.NewAccountService.updateAccountAplData(this.accountData, (res: any) => {
    let ele:any = document.getElementById('updateModalClose');
    ele.click();
    this.getAppliedAcOpeningId();
  });
  }
}



validateUpdateInputs = () =>{
  console.log("Saving project before validate",this.accountData);
  if(this.accountData.class==='' || this.accountData.class===null || this.accountData.class===undefined){
    this.toastr.warning('Please select class','Warning',{
      disableTimeOut:false
    });
    return false;
  }
  if(this.accountData.classPrice==='' || this.accountData.classPrice===null || this.accountData.classPrice===undefined){
    this.toastr.warning('Please type class price','Warning',{
      disableTimeOut:false
    });
    return false;
  }
  if(this.accountData.classAdminFee==='' || this.accountData.classAdminFee===null || this.accountData.classAdminFee===undefined){
    this.toastr.warning('Please type admin fee','Warning',{
      disableTimeOut:false
    });
    return false;
  }
  if(this.accountData.nomineeName==='' || this.accountData.nomineeName===null || this.accountData.nomineeName===undefined){
    this.toastr.warning('Please type nominee name','Warning',{
      disableTimeOut:false
    });
    return false;
  }
  if(this.accountData.nomineeDOB==='' || this.accountData.nomineeDOB===null || this.accountData.nomineeDOB===undefined){
    this.toastr.warning('Please type nominee Date of birth','Warning',{
      disableTimeOut:false
    });
    return false;
  }
  if(this.accountData.nomineeGender==='' || this.accountData.nomineeGender===null || this.accountData.nomineeGender===undefined){
    this.toastr.warning('Please select nominee gender','Warning',{
      disableTimeOut:false
    });
    return false;
  }
  if(this.accountData.nomineePhnoe < 1000000000 || this.accountData.nomineePhnoe > 9999999999){
    this.toastr.warning('Please type nominee phone number & must be 10 digits','Warning',{
      disableTimeOut:false
    });
    return false;
  }
  if(this.accountData.opening_balance==='' || this.accountData.opening_balance===null || this.accountData.opening_balance===undefined){
    this.toastr.warning('Please type account opening balance','Warning',{
      disableTimeOut:false
    });
    return false;
  }
  if(this.accountData.type==='' || this.accountData.type===null || this.accountData.type===undefined){
    this.toastr.warning('Please select account type','Warning',{
      disableTimeOut:false
    });
    return false;
  }
  if(this.accountData.scheme==='' || this.accountData.scheme===null || this.accountData.scheme===undefined){
    this.toastr.warning('Please select deposit scheme','Warning',{
      disableTimeOut:false
    });
    return false;
  }
  if(this.accountData.dep_period==='' || this.accountData.dep_period===null || this.accountData.dep_period===undefined){
    this.toastr.warning('Please type deposit period','Warning',{
      disableTimeOut:false
    });
    return false;
  }
  if(this.accountData.dep_frequency==='' || this.accountData.dep_frequency===null || this.accountData.dep_frequency===undefined){
    this.toastr.warning('Please type frequency','Warning',{
      disableTimeOut:false
    });
    return false;
  }
  if(this.accountData.startDate==='' || this.accountData.startDate===null || this.accountData.startDate===undefined){
    this.toastr.warning('Please type start date','Warning',{
      disableTimeOut:false
    });
    return false;
  }
  if(this.accountData.endDate==='' || this.accountData.endDate===null || this.accountData.endDate===undefined){
    this.toastr.warning('Please type end date','Warning',{
      disableTimeOut:false
    });
    return false;
  }
  if(this.accountData.first_instlmnt==='' || this.accountData.first_instlmnt===null || this.accountData.first_instlmnt===undefined){
    this.toastr.warning('Please type first instalment amount','Warning',{
      disableTimeOut:false
    });
    return false;
  }
  if(this.accountData.openingFee==='' || this.accountData.openingFee===null || this.accountData.openingFee===undefined){
    this.toastr.warning('Please type opening fee','Warning',{
      disableTimeOut:false
    });
    return false;
  }
  if(this.accountData.csp_msp==='' || this.accountData.csp_msp===null || this.accountData.csp_msp===undefined){
    this.toastr.warning('Please type CSP/MSP','Warning',{
      disableTimeOut:false
    });
    return false;
  }
  if(this.accountData.ac_name==='' || this.accountData.ac_name===null || this.accountData.ac_name===undefined){
    this.toastr.warning('Please type name in account','Warning',{
      disableTimeOut:false
    });
    return false;
  }
  if(this.accountData.ac_type==='' || this.accountData.ac_type===null || this.accountData.ac_type===undefined){
    this.toastr.warning('Please type account type','Warning',{
      disableTimeOut:false
    });
    return false;
  }
  if(this.accountData.ac_no==='' || this.accountData.ac_no===null || this.accountData.ac_no===undefined){
    this.toastr.warning('Please type account number','Warning',{
      disableTimeOut:false
    });
    return false;
  }
  if(this.accountData.ac_ifsc==='' || this.accountData.ac_ifsc===null || this.accountData.ac_ifsc===undefined){
    this.toastr.warning('Please type account IFSC','Warning',{
      disableTimeOut:false
    });
    return false;
  }
  if(this.accountData.ac_bankName==='' || this.accountData.ac_bankName===null || this.accountData.ac_bankName===undefined){
    this.toastr.warning('Please type bank name','Warning',{
      disableTimeOut:false
    });
    return false;
  }
  if(this.accountData.ac_brName==='' || this.accountData.ac_brName===null || this.accountData.ac_brName===undefined){
    this.toastr.warning('Please type brunch name','Warning',{
      disableTimeOut:false
    });
    return false;
  }
  if (this.checkUpdate === false) {
    this.toastr.warning('Please check the checkbox','Warning',{
      disableTimeOut:false
    });
    return false;
  }
  return true;
}

}
