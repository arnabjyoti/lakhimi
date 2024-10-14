import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { SalaryService } from './salary.service';
import { months } from 'moment';
import { NgxPrintModule } from 'ngx-print';

@Component({
  selector: 'app-salary',
  templateUrl: './salary.component.html',
  styleUrls: ['./salary.component.css'],
  standalone: true,
  imports: [NgxPrintModule, NgxSpinnerModule, MatStepperModule, ReactiveFormsModule, RouterModule, MatTableModule, MatPaginatorModule, MatButtonModule, MatInputModule, MatSortModule, FormsModule, MatFormFieldModule, CommonModule],
})
export class SalaryComponent implements OnInit {


  public salaryGen: boolean = false;
  public salaryDown: boolean = false;
  public salaryshow: boolean = false;

  public inputData: any = {
    month: "",
    monthName: "",
    year: "",
  }
  public isLodaing = true;

  public data: any;
  
  employees: any[] = []; // Will be populated with the data dictionary
  salaries: { [key: number]: { 
    basicPay: number,
    pA: number, 
    tA: number,
    oA: number,
    GrossSalary: number,
    PTax: number,
    insurance: number,
    eWF: number,
    canteenFee: number,
    absentCharge: number,
    EWFrefund: number,
    loanEMI: number,
    Others: number,
    netSalary: number
   } } = {}; // To store salary, basic pay, and net pay for each employee

  public endpoint: any;


  //pay slip modal

  public selectedPaySlip:any ={
    basicPay: "",
    pA: "", 
    tA: "",
    oA: "",
    GrossSalary: "",
    PTax: "",
    insurance: "",
    eWF: "",
    canteenFee: "",
    absentCharge: "",
    EWFrefund: "",
    loanEMI: "",
    Others: "",
    netSalary: "",
    id: "",
    name: "",
    designation: "",
    employeeId: "",
    entryDate: "",
    year: "",
    monthName: "",
    month: "",
    totalGross: "",
    totalDeduct: ""
  }

  // public data: any;

  constructor(
    private spinner: NgxSpinnerService,
    private SalaryService: SalaryService,
    private toastr: ToastrService,
    private _formBuilder: FormBuilder,
    private datePipe: DatePipe,
  ) {
    this.endpoint = environment.BASE_URL;
  }

  ngOnInit(): void {
    this.employeeList();
    // this.checkSalaries();
  }


  spiner() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 5000);
  }

  checkSalaries(){
    if (this.inputData.month == "01") {
      this.inputData.monthName = "January";
    }
    if (this.inputData.month == "02") {
      this.inputData.monthName = "February";
    }
    if (this.inputData.month == "03") {
      this.inputData.monthName = "March";
    }
    if (this.inputData.month == "04") {
      this.inputData.monthName = "April";
    }
    if (this.inputData.month == "05") {
      this.inputData.monthName = "May";
    }
    if (this.inputData.month == "06") {
      this.inputData.monthName = "June";
    }
    if (this.inputData.month == "07") {
      this.inputData.monthName = "July";
    }
    if (this.inputData.month == "08") {
      this.inputData.monthName = "August";
    }
    if (this.inputData.month == "09") {
      this.inputData.monthName = "September";
    }
    if (this.inputData.month == "10") {
      this.inputData.monthName = "October";
    }
    if (this.inputData.month == "11") {
      this.inputData.monthName = "November";
    }
    if (this.inputData.month == "12") {
      this.inputData.monthName = "December";
    }

    console.log("inputData", this.inputData);
    let isValid = this.validateInputs();
    if(isValid){
    this.isLodaing = true;
    this.spiner();
    this.SalaryService.checkSalary(this.inputData, (callback:any)=>{
      console.log(callback);
      this.isLodaing = false;
      if (callback.length == 0) {
        this.salaryDown = true;
        this.salaryshow = false;
      }else{
        this.salaryDown = false;
        this.salaryshow = true;

        let temp:any = [];
      callback.map((item: any) => {
        temp.push({
          id: item.id,
          category: item["user.category"],
          name: item["user.f_name"]+" "+item["user.l_name"],
          designation: item["user.designation"],
          employeeId: item["user.employeeId"],
          entryDate: item.entryDate,
          basicPay: item.basicPay,
          netSalary: item.netSalary,
          pA: item.pA, 
          tA: item.tA,
          oA: item.oA,
          GrossSalary: item.GrossSalary,
          PTax: item.PTax,
          insurance: item.insurance,
          eWF: item.eWF,
          canteenFee: item.canteenFee,
          absentCharge: item.absentCharge,
          EWFrefund: item.EWFrefund,
          loanEMI: item.loanEMI,
          Others: item.Others,
        })
        
        
      });
     this.data = temp;
        console.log("data",this.data);
      }
    })
  }
  }

  employeeList=()=>{
    let requestObject = {};
    this.isLodaing = true;
    this.spiner();
    this.SalaryService.employeeList(requestObject, (callback:any)=>{
      console.log(callback);
      this.isLodaing = false;

      this.employees = callback;
      console.log("eeeeeeeeeeeee",this.employees);


      // Initialize salary data correctly
      this.employees.forEach(employee => {
        if (!this.salaries[employee.id]) {
          this.salaries[employee.id] = { 
            basicPay: 0, 
            pA: 0, 
            tA: 0,
            oA: 0,
            GrossSalary: 0,
            PTax: 0,
            insurance: 0,
            eWF: 0,
            canteenFee: 0,
            absentCharge: 0,
            EWFrefund: 0,
            loanEMI: 0,
            Others: 0,
            netSalary: 0
           };
        }
      });
    });      
  }

  calculateGrossSalary(employeeId: number): void {
    const salaryData = this.salaries[employeeId];
    console.log("bbbbbbbbbb",salaryData);
    
    salaryData.GrossSalary = salaryData.basicPay + salaryData.pA + salaryData.tA + salaryData.oA;
  }

  calculateNetPay(employeeId: number): void {
    const salaryData = this.salaries[employeeId];
    salaryData.netSalary = (salaryData.basicPay + salaryData.pA + salaryData.tA + salaryData.oA) - (salaryData.PTax + salaryData.insurance + salaryData.eWF + salaryData.canteenFee + salaryData.absentCharge + salaryData.EWFrefund + salaryData.loanEMI + salaryData.Others);
  }


  openSalaryGen(){
    this.salaryGen = true;
    this.salaryDown = false;
  }

  openSalaryDown(){
    this.salaryDown = true;
    this.salaryGen = false;
  }



  saveSalaries(): void {
    console.log(this.salaries);

    const salaryDataArray = this.employees.map(employee => ({
      employeeId: employee.id,
      basicPay: this.salaries[employee.id].basicPay,
      pA: this.salaries[employee.id].pA == null ? 0 : this.salaries[employee.id].pA,
      tA: this.salaries[employee.id].tA == null ? 0 : this.salaries[employee.id].tA,
      oA: this.salaries[employee.id].oA == null ? 0 : this.salaries[employee.id].oA,
      GrossSalary: this.salaries[employee.id].GrossSalary,
      PTax: this.salaries[employee.id].PTax == null ? 0 : this.salaries[employee.id].PTax,
      insurance: this.salaries[employee.id].insurance == null ? 0 : this.salaries[employee.id].insurance,
      eWF: this.salaries[employee.id].eWF == null ? 0 : this.salaries[employee.id].eWF,
      canteenFee: this.salaries[employee.id].canteenFee == null ? 0 : this.salaries[employee.id].canteenFee,
      absentCharge: this.salaries[employee.id].absentCharge == null ? 0 : this.salaries[employee.id].absentCharge,
      EWFrefund: this.salaries[employee.id].EWFrefund == null ? 0 : this.salaries[employee.id].EWFrefund,
      loanEMI: this.salaries[employee.id].loanEMI == null ? 0 : this.salaries[employee.id].loanEMI,
      Others: this.salaries[employee.id].Others == null ? 0 : this.salaries[employee.id].Others,
      netSalary: this.salaries[employee.id].netSalary,
      entryDate: this.inputData.year+this.inputData.month,
    }));



    this.isLodaing = true;
    this.spiner();
    // Perform the save operation here, e.g., send to backend
    this.SalaryService.saveSalaries(salaryDataArray, (res: any) => {
      this.isLodaing = false;

      this.salaryDown = false;
      this.salaryshow = true;

      this.checkSalaries();
      
    })
  }


  validateInputs = () =>{
    console.log("Saving data before validate");
    if(this.inputData.month==='' || this.inputData.month===null || this.inputData.month===undefined){
      this.toastr.warning('Please enter month','Warning',{
        disableTimeOut:false
      });
      return false;
    }
    if(this.inputData.year==='' || this.inputData.year===null || this.inputData.year===undefined){
      this.toastr.warning('Please enter year','Warning',{
        disableTimeOut:false
      });
      return false;
    }
    return true;
  }



  showPaySlipModal(row:any){
    // this.showImage = true;
    console.log("Selected Project=", row);
    this.selectedPaySlip = row;

    this.selectedPaySlip.totalGross = Number(this.selectedPaySlip.basicPay)+ Number(this.selectedPaySlip.pA) + Number(this.selectedPaySlip.tA) + Number(this.selectedPaySlip.oA)

    this.selectedPaySlip.totalDeduct = Number(this.selectedPaySlip.PTax)+ Number(this.selectedPaySlip.insurance) + Number(this.selectedPaySlip.eWF) + Number(this.selectedPaySlip.canteenFee) + Number(this.selectedPaySlip.absentCharge) + Number(this.selectedPaySlip.EWFrefund) + Number(this.selectedPaySlip.loanEMI) + Number(this.selectedPaySlip.Others);

    const numberString = this.selectedPaySlip.entryDate;
    this.selectedPaySlip.month = numberString.slice(4);    // Extract the first 4 digits for the year
    this.selectedPaySlip.year = numberString.slice(0, 4);   // Extract the last 2 digits for the month


    if (this.selectedPaySlip.month == "01") {
      this.selectedPaySlip.monthName = "January";
    }
    if (this.selectedPaySlip.month == "02") {
      this.selectedPaySlip.monthName = "February";
    }
    if (this.selectedPaySlip.month == "03") {
      this.selectedPaySlip.monthName = "March";
    }
    if (this.selectedPaySlip.month == "04") {
      this.selectedPaySlip.monthName = "April";
    }
    if (this.selectedPaySlip.month == "05") {
      this.selectedPaySlip.monthName = "May";
    }
    if (this.selectedPaySlip.month == "06") {
      this.selectedPaySlip.monthName = "June";
    }
    if (this.selectedPaySlip.month == "07") {
      this.selectedPaySlip.monthName = "July";
    }
    if (this.selectedPaySlip.month == "08") {
      this.selectedPaySlip.monthName = "August";
    }
    if (this.selectedPaySlip.month == "09") {
      this.selectedPaySlip.monthName = "September";
    }
    if (this.selectedPaySlip.month == "10") {
      this.selectedPaySlip.monthName = "October";
    }
    if (this.selectedPaySlip.month == "11") {
      this.selectedPaySlip.monthName = "November";
    }
    if (this.selectedPaySlip.month == "12") {
      this.selectedPaySlip.monthName = "December";
    }


    // number to text convert
    const numStr = this.selectedPaySlip.netSalary.toString();

    // Split number into parts for crore, lakh, and thousand
    const crores = Math.floor(numStr / 10000000);
    const lakhs = Math.floor((numStr % 10000000) / 100000);
    const thousands = Math.floor((numStr % 100000) / 1000);
    const ones = Math.floor(numStr % 1000);

    // Format parts to Indian currency
    let result = '';
    if (crores > 0) {
      result += this.formatNumber(crores) + ' crore ';
    }
    if (lakhs > 0) {
      result += this.formatNumber(lakhs) + ' lakh ';
    }
    if (thousands > 0) {
      result += this.formatNumber(thousands) + ' thousand ';
    }
    if (ones > 0) {
      result += this.formatNumber(ones);
    }

    result = result.charAt(0).toUpperCase() + result.slice(1);

    this.selectedPaySlip.amountText = result.trim();
    // return result.trim();
    console.log("selectedPaySlip",this.selectedPaySlip);
    
  }


  private formatNumber(num: number): string {
    const onesMap = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    const teensMap = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
    const tensMap = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

    let result = '';
    const hundreds = Math.floor(num / 100);
    const tensUnits = num % 100;

    if (hundreds > 0) {
      result += onesMap[hundreds] + ' hundred ';
    }

    if (tensUnits > 0) {
      if (tensUnits < 10) {
        result += onesMap[tensUnits];
      } else if (tensUnits < 20) {
        result += teensMap[tensUnits - 10];
      } else {
        const tens = Math.floor(tensUnits / 10);
        const units = tensUnits % 10;
        result += tensMap[tens];
        if (units > 0) {
          result += ' ' + onesMap[units];
        }
      }
    }

    return result;
  }

}
