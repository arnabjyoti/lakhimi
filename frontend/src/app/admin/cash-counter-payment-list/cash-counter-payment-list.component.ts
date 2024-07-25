import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { CameraCaptureComponent } from 'src/app/camera-capture/camera-capture.component';
import { CashCounterPaymentListService } from './cash-counter-payment-list.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { brunchData } from '../brunch/brunch.component';
import { NgxPrintModule } from 'ngx-print';

@Component({
  selector: 'app-cash-counter-payment-list',
  templateUrl: './cash-counter-payment-list.component.html',
  styleUrls: ['./cash-counter-payment-list.component.css'],
  standalone: true,
  imports: [NgxPrintModule, CameraCaptureComponent, NgxSpinnerModule, MatStepperModule, ReactiveFormsModule, RouterModule, MatTableModule, MatPaginatorModule, MatButtonModule, MatInputModule, MatSortModule, FormsModule, MatFormFieldModule, CommonModule],
})
export class CashCounterPaymentListComponent implements OnInit{
  public displayedColumns: string[] = ['Sl', 'Co_op_ac_no', 'voucer_no', 'Amount', 'entry_date', 'action'];
  dataSource !: MatTableDataSource<brunchData>
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;


  
  startDate: Date | null = null;
  endDate: Date | null = null;

  items: any[] = [];

  public inputForm: any = {
    Co_op_ac_no: "",
    voucer_no: "",
    amount: "",
    userId: "",
    brunchId: "",
    branch_name: "",
    entry_date: "",
  }
  
  public isLodaing = true;
  public endpoint: any;
  public user: any;
  public userId: any;
  public brunchId: any;
  public brunchDetails: any;
  public returnMsg: any;
  public myDate: any = new Date();

  public selectedAccount:any = {
    userId: "",
    photo: "",
  }
  public showImage = false;

  constructor(
    private spinner: NgxSpinnerService,
    private CashCounterPaymentListService: CashCounterPaymentListService,
    private toastr: ToastrService,
    private _formBuilder: FormBuilder,
    private datePipe: DatePipe,
  ) {
    this.endpoint = environment.BASE_URL;
    this.init();
    this.myDate = this.datePipe.transform(this.myDate, "YYYY-MM-dd");
  }
  init = () => {
    let token = JSON.parse(JSON.stringify(localStorage.getItem('token')));
    token = JSON.parse(token);
    this.user = token['usr'];
    console.log("Token=", token);
    if (!token.usr.accessKeyword) {
      console.log("gggggggggggggggggggggg");

      return;
    }
  }

  ngOnInit(): void {
    this.loanApplyList();
  }

  spiner() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 5000);
  }
  

  loanApplyList() {
    let requestObject = {};
    this.CashCounterPaymentListService.getCashCounterList(requestObject, (callback: any) => {
      console.log("getLoanApplyList", callback);

      this.dataSource = new MatTableDataSource(callback);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log("bbbbbbbbbb", this.dataSource);
    })
  }

  FilterChange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }

  applyFilter() {
    let isValid = this.validateFilter();
    if (isValid) {
    if (this.startDate && this.endDate) {
      let ele:any = document.getElementById('loanAccountOpeningPdf');
            ele.click();
      // Your filter logic here
      // For example, filtering an array of data based on the date range
      console.log('Filtering from', this.startDate, 'to', this.endDate);


      let requestObject = {
        brunchId: this.brunchId,
        startDate: this.startDate,
        endDate: this.endDate,
      };
      this.CashCounterPaymentListService.filterDataByCashier(requestObject, (callback: any) => {
        console.log("filter data", callback);


          this.items = callback;
          // this.downloadPdf();
      })
    }
  } 
  }
  

  validateFilter(){
    if (this.startDate === null || this.startDate === undefined) {
      this.toastr.warning('Please enter start date', 'Warning', {
        disableTimeOut: false
      });
      return false;
    }
    if (this.endDate === null || this.endDate === undefined) {
      this.toastr.warning('Please enter end date', 'Warning', {
        disableTimeOut: false
      });
      return false;
    }
    return true;
  }


  showImageModal(row:any){
    this.showImage = true;
    console.log("Selected Project=", row);
    this.selectedAccount = row;
    console.log("selectedAccount",this.selectedAccount);
    
  }

  closeShowImage(){
    this.showImage = false;
  }
}
