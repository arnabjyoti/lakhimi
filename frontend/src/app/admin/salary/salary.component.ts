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

@Component({
  selector: 'app-salary',
  templateUrl: './salary.component.html',
  styleUrls: ['./salary.component.css'],
  standalone: true,
  imports: [NgxSpinnerModule, MatStepperModule, ReactiveFormsModule, RouterModule, MatTableModule, MatPaginatorModule, MatButtonModule, MatInputModule, MatSortModule, FormsModule, MatFormFieldModule, CommonModule],
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

  public data: any;
  
  employees: any[] = []; // Will be populated with the data dictionary
  salaries: { [key: number]: { 
    basicPay: number,
    pA: number, 
    tA: number,
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
    this.SalaryService.checkSalary(this.inputData, (callback:any)=>{
      console.log(callback);
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
          basicPay: item.basicPay,
          netSalary: item.netSalary,
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
    
    this.SalaryService.employeeList(requestObject, (callback:any)=>{
      console.log(callback);

      this.employees = callback;
      console.log("eeeeeeeeeeeee",this.employees);


      // Initialize salary data correctly
      this.employees.forEach(employee => {
        if (!this.salaries[employee.id]) {
          this.salaries[employee.id] = { 
            basicPay: 0, 
            pA: 0, 
            tA: 0,
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
    salaryData.GrossSalary = salaryData.basicPay + salaryData.pA + salaryData.tA;
  }

  calculateNetPay(employeeId: number): void {
    const salaryData = this.salaries[employeeId];
    salaryData.netSalary = (salaryData.basicPay + salaryData.pA + salaryData.tA) - (salaryData.PTax + salaryData.insurance + salaryData.eWF + salaryData.canteenFee + salaryData.absentCharge + salaryData.EWFrefund + salaryData.loanEMI + salaryData.Others);
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
      pA: this.salaries[employee.id].pA,
      tA: this.salaries[employee.id].tA,
      GrossSalary: this.salaries[employee.id].GrossSalary,
      PTax: this.salaries[employee.id].PTax,
      insurance: this.salaries[employee.id].insurance,
      eWF: this.salaries[employee.id].eWF,
      canteenFee: this.salaries[employee.id].canteenFee,
      absentCharge: this.salaries[employee.id].absentCharge,
      EWFrefund: this.salaries[employee.id].EWFrefund,
      loanEMI: this.salaries[employee.id].loanEMI,
      Others: this.salaries[employee.id].Others,
      netSalary: this.salaries[employee.id].netSalary,
      entryDate: this.inputData.year+this.inputData.month,
    }));




    // Perform the save operation here, e.g., send to backend
    this.SalaryService.saveSalaries(salaryDataArray, (res: any) => {
      // this.createMsg = res.message
      // if (this.createMsg === "success") {
      //   this.toastr.success("User created successfull", "success");
      //   this.cancelRegistration();
      // }
      // else{
      //   this.toastr.error("Oops! Something went wrong. Please try again",
      //   "Warning");
      // }
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

}
