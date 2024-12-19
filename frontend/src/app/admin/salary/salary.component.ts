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
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-salary',
  templateUrl: './salary.component.html',
  styleUrls: ['./salary.component.css'],
  standalone: true,
  imports: [NgxPrintModule, NgxSpinnerModule, MatStepperModule, ReactiveFormsModule, RouterModule, MatTableModule, MatPaginatorModule, MatButtonModule, MatInputModule, MatSortModule, FormsModule, MatFormFieldModule, CommonModule],
})
export class SalaryComponent implements OnInit {

  public showMonthlySalary: boolean = false;
  public showComulativeSalary: boolean = false;

  //comulative
  public comulativeInput: any = {
    fromMonth: "",
    fromYear: "",
    toMonth: "",
    toYear: "",
    fromMonthName: "",
    toMonthName: ""
  }

  public fromMonthYear: any;
  public toMonthYear: any;

  public camulativeData: any;
  public showComulativeData: boolean = false;



  //monthly salary

  public all_BasicPay: number = 0;
  public all_netSalary: number = 0;
  public all_pA: number = 0;
  public all_tA: number = 0;
  public all_oA: number = 0;
  public all_GrossSalary: number = 0;
  public all_PTax: number = 0;
  public all_insurance: number = 0;
  public all_eWF: number = 0;
  public all_canteenFee: number = 0;
  public all_absentCharge: number = 0;
  public all_EWFrefund: number = 0;
  public all_loanEMI: number = 0;
  public all_Others: number = 0;


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
  salaries: {
    [key: number]: {
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
    }
  } = {}; // To store salary, basic pay, and net pay for each employee

  public endpoint: any;


  //pay slip modal

  public selectedPaySlip: any = {
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


  public comulativeEmployeeData: any[] = [];
  public selectedEmployee: any = null;

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

  checkSalaries() {
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

    // console.log("inputData", this.inputData);
    let isValid = this.validateInputs();
    if (isValid) {
      this.isLodaing = true;
      this.spiner();
      this.SalaryService.checkSalary(this.inputData, (callback: any) => {
        // console.log(callback);
        this.isLodaing = false;
        if (callback.length == 0) {
          this.salaryDown = true;
          this.salaryshow = false;
        } else {
          this.salaryDown = false;
          this.salaryshow = true;

          let temp: any = [];
          let totalBasicPay = 0;
          callback.map((item: any) => {

            const basicPay = parseInt(item.basicPay) || 0;
            const pA = parseInt(item.pA) || 0;
            const tA = parseInt(item.tA) || 0;
            const oA = parseInt(item.oA) || 0;
            const GrossSalary = parseInt(item.GrossSalary) || 0;
            const PTax = parseInt(item.PTax) || 0;
            const insurance = parseInt(item.insurance) || 0;
            const eWF = parseInt(item.eWF) || 0;
            const canteenFee = parseInt(item.canteenFee) || 0;
            const absentCharge = parseInt(item.absentCharge) || 0;
            const EWFrefund = parseInt(item.EWFrefund) || 0;
            const loanEMI = parseInt(item.loanEMI) || 0;
            const Others = parseInt(item.Others) || 0;
            const netSalary = parseInt(item.netSalary) || 0;

            temp.push({
              id: item.id,
              category: item["user.category"],
              name: item["user.f_name"] + " " + item["user.l_name"],
              designation: item["user.designation"],
              employeeId: item["user.employeeId"],
              entryDate: parseInt(item.entryDate) || 0,
              basicPay: basicPay,
              netSalary: netSalary,
              pA: pA,
              tA: tA,
              oA: oA,
              GrossSalary: GrossSalary,
              PTax: PTax,
              insurance: insurance,
              eWF: eWF,
              canteenFee: canteenFee,
              absentCharge: absentCharge,
              EWFrefund: EWFrefund,
              loanEMI: loanEMI,
              Others: Others,
            })

            this.all_BasicPay += basicPay;
            this.all_netSalary += netSalary;
            this.all_pA += pA;
            this.all_tA += tA;
            this.all_oA += oA;
            this.all_GrossSalary += GrossSalary;
            this.all_PTax += PTax;
            this.all_insurance += insurance;
            this.all_eWF += eWF;
            this.all_canteenFee += canteenFee;
            this.all_absentCharge += absentCharge;
            this.all_EWFrefund += EWFrefund;
            this.all_loanEMI += loanEMI;
            this.all_Others += Others;

          });
          this.data = temp;
          // console.log("data", totalBasicPay);
        }
      })
    }
  }

  employeeList = () => {
    let requestObject = {};
    this.isLodaing = true;
    this.spiner();
    this.SalaryService.employeeList(requestObject, (callback: any) => {
      // console.log(callback);
      this.isLodaing = false;

      this.employees = callback;
      // console.log("eeeeeeeeeeeee", this.employees);


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
    // console.log("bbbbbbbbbb", salaryData);

    salaryData.GrossSalary = salaryData.basicPay + salaryData.pA + salaryData.tA + salaryData.oA;
  }

  calculateNetPay(employeeId: number): void {
    const salaryData = this.salaries[employeeId];
    salaryData.netSalary = (salaryData.basicPay + salaryData.pA + salaryData.tA + salaryData.oA) - (salaryData.PTax + salaryData.insurance + salaryData.eWF + salaryData.canteenFee + salaryData.absentCharge + salaryData.EWFrefund + salaryData.loanEMI + salaryData.Others);
  }


  monthlySalary() {
    this.showMonthlySalary = true;
    this.showComulativeSalary = false;
  }

  ComulativeSalary() {
    this.showMonthlySalary = false;
    this.showComulativeSalary = true;
  }



  saveSalaries(): void {
    // console.log(this.salaries);

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
      entryDate: this.inputData.year + this.inputData.month,
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


  validateInputs = () => {
    // console.log("Saving data before validate");
    if (this.inputData.month === '' || this.inputData.month === null || this.inputData.month === undefined) {
      this.toastr.warning('Please enter month', 'Warning', {
        disableTimeOut: false
      });
      return false;
    }
    if (this.inputData.year === '' || this.inputData.year === null || this.inputData.year === undefined) {
      this.toastr.warning('Please enter year', 'Warning', {
        disableTimeOut: false
      });
      return false;
    }
    return true;
  }


  // showPaySlipModal(row: any) {
  //   // console.log("Selected Project=", row);
  //   this.selectedPaySlip = row;

  //   // Calculate totalGross and totalDeduct
  //   this.selectedPaySlip.totalGross = Number(this.selectedPaySlip.basicPay) + Number(this.selectedPaySlip.pA) + Number(this.selectedPaySlip.tA) + Number(this.selectedPaySlip.oA);
  //   this.selectedPaySlip.totalDeduct = Number(this.selectedPaySlip.PTax) + Number(this.selectedPaySlip.insurance) + Number(this.selectedPaySlip.eWF) + Number(this.selectedPaySlip.canteenFee) + Number(this.selectedPaySlip.absentCharge) + Number(this.selectedPaySlip.EWFrefund) + Number(this.selectedPaySlip.loanEMI) + Number(this.selectedPaySlip.Others);

  //   // Convert entryDate to a string and extract month and year
  //   const numberString = this.selectedPaySlip.entryDate.toString();
  //   this.selectedPaySlip.year = numberString.slice(0, 4);  // Extract the first 4 digits for the year
  //   this.selectedPaySlip.month = numberString.slice(4, 6); // Extract the next 2 digits for the month

  //   // Map month number to month name
  //   const monthNames: { [key: string]: string } = {
  //     "01": "January",
  //     "02": "February",
  //     "03": "March",
  //     "04": "April",
  //     "05": "May",
  //     "06": "June",
  //     "07": "July",
  //     "08": "August",
  //     "09": "September",
  //     "10": "October",
  //     "11": "November",
  //     "12": "December"
  //   };
  //   this.selectedPaySlip.monthName = monthNames[this.selectedPaySlip.month] || "Unknown";

  //   // Convert netSalary to words
  //   this.selectedPaySlip.amountText = this.convertNumberToWords(this.selectedPaySlip.netSalary);

  //   // console.log("selectedPaySlip", this.selectedPaySlip);
  // }

  // // Helper function to convert numbers to words
  // convertNumberToWords(num: number): string {
  //   const ones = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
  //   const teens = ["Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
  //   const tens = ["", "Ten", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
  //   const thousands = ["", "Thousand", "Lakh", "Crore"];

  //   if (num === 0) return "Zero";

  //   let result = "";
  //   let partCount = 0;

  //   while (num > 0) {
  //     let part = num % 1000;
  //     if (part > 0) {
  //       const partText = this.convertThreeDigitNumber(part).trim();
  //       if (thousands[partCount]) result = partText + " " + thousands[partCount] + " " + result;
  //       else result = partText + " " + result;
  //     }
  //     partCount++;
  //     num = Math.floor(num / 1000);
  //   }

  //   return result.trim();
  // }

  // // Helper to convert three-digit numbers to words
  // convertThreeDigitNumber(num: number): string {
  //   const ones = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
  //   const teens = ["Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
  //   const tens = ["", "Ten", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

  //   let result = "";

  //   if (num >= 100) {
  //     result += ones[Math.floor(num / 100)] + " Hundred ";
  //     num = num % 100;
  //   }

  //   if (num >= 11 && num <= 19) {
  //     result += teens[num - 11] + " ";
  //   } else {
  //     result += tens[Math.floor(num / 10)] + " ";
  //     num = num % 10;
  //     result += ones[num] + " ";
  //   }

  //   return result.trim();
  // }


  showPaySlipModal(row: any) {
    // this.showImage = true;
    // console.log("Selected Project=", row);
    this.selectedPaySlip = row;

    this.selectedPaySlip.totalGross = Number(this.selectedPaySlip.basicPay) + Number(this.selectedPaySlip.pA) + Number(this.selectedPaySlip.tA) + Number(this.selectedPaySlip.oA)

    this.selectedPaySlip.totalDeduct = Number(this.selectedPaySlip.PTax) + Number(this.selectedPaySlip.insurance) + Number(this.selectedPaySlip.eWF) + Number(this.selectedPaySlip.canteenFee) + Number(this.selectedPaySlip.absentCharge) + Number(this.selectedPaySlip.EWFrefund) + Number(this.selectedPaySlip.loanEMI) + Number(this.selectedPaySlip.Others);

    const numberString = this.selectedPaySlip.entryDate.toString();
    this.selectedPaySlip.month = numberString.slice(4);    // Extract the last 2 digits for the month
    this.selectedPaySlip.year = numberString.slice(0, 4);   // Extract the first 4 digits for the year


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
    // console.log("selectedPaySlip", this.selectedPaySlip);

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


  public saveAsPDF() {
    const data = document.getElementById('salary-report'); // Element to be saved as PDF

    if (data) {
      html2canvas(data, { scale: 2 }).then(canvas => {
        // Convert canvas to a lower-quality JPEG image
        const imgData = canvas.toDataURL('image/jpeg', 1); // Adjust quality from 0.1 to 1 (0.7 is a good balance)
        const pdf = new jsPDF('landscape', 'mm', 'legal'); // Legal page size in landscape mode

        const topMargin = 5; // Top margin in mm
        const bottomMargin = 3; // Bottom margin in mm
        const pageWidth = 355.6; // Legal page width in landscape mode
        const pageHeight = 215.9; // Legal page height in landscape mode
        const imgWidth = pageWidth - 2 * topMargin; // Image width minus left and right margins
        const imgHeight = canvas.height * imgWidth / canvas.width; // Scaled image height based on width
        const contentHeightPerPage = pageHeight - topMargin - bottomMargin; // Adjusted content height for each page

        let heightLeft = imgHeight;
        let position = topMargin; // Start position at the top margin

        // If content fits on one page
        if (imgHeight <= contentHeightPerPage) {
          pdf.addImage(imgData, 'JPEG', topMargin, position, imgWidth, imgHeight);
        } else {
          // Render first page with margins
          pdf.addImage(imgData, 'JPEG', topMargin, position, imgWidth, contentHeightPerPage);
          heightLeft -= contentHeightPerPage;

          // Render additional pages with margins
          while (heightLeft > 0) {
            position = topMargin - (imgHeight - heightLeft); // Calculate position for next slice
            pdf.addPage();
            pdf.addImage(imgData, 'JPEG', topMargin, position, imgWidth, contentHeightPerPage);
            heightLeft -= contentHeightPerPage;
          }
        }

        pdf.save(this.inputData.monthName + '-' + this.inputData.year + '-report.pdf');
      });
    }
  }





  // multipage print


  // public saveAsPDF() {
  //   const data = document.getElementById('salary-report'); // Element to be saved as PDF

  //   if (data) {
  //     html2canvas(data, { scale: 2 }).then(canvas => {
  //       const imgData = canvas.toDataURL('image/png');
  //       const pdf = new jsPDF('landscape', 'mm', 'legal'); // Set to legal page size in landscape

  //       const margin = 10; // Margin size in mm
  //       const pageWidth = 355.6; // Full legal page width in landscape in mm
  //       const pageHeight = 215.9; // Full legal page height in landscape in mm
  //       const imgWidth = pageWidth - 2 * margin; // Image width minus margins
  //       const imgHeight = canvas.height * imgWidth / canvas.width; // Scaled image height
  //       let heightLeft = imgHeight;
  //       let position = margin;

  //       // Add first page
  //       pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
  //       heightLeft -= pageHeight;

  //       // If content is longer than a single page
  //       while (heightLeft > 0) {
  //         position -= pageHeight;
  //         pdf.addPage(); // Add new page in the same orientation
  //         pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
  //         heightLeft -= pageHeight;
  //       }

  //       pdf.save('document-legal.pdf');
  //     });
  //   }
  // }









  // comulative report

  generateData() {
    this.fromMonthYear = this.comulativeInput.fromYear + this.comulativeInput.fromMonth;
    this.toMonthYear = this.comulativeInput.toYear + this.comulativeInput.toMonth;
    let isValid = this.chekInput();
    if (isValid) {
      this.isLodaing = true;
      let requestObject = {
        fromMonthYear: this.fromMonthYear,
        toMonthYear: this.toMonthYear,
      };
      // console.log("requestObject", requestObject);

      this.spiner();
      this.SalaryService.checkSalaryRange(requestObject, (callback: any) => {
        // console.log("callback", callback);
        this.isLodaing = false;
        if (callback.status == true) {
          //change month digit to month name
          if (this.comulativeInput.fromMonth == "01") {
            this.comulativeInput.fromMonthName = "January";
          }
          if (this.comulativeInput.fromMonth == "02") {
            this.comulativeInput.fromMonthName = "February";
          }
          if (this.comulativeInput.fromMonth == "03") {
            this.comulativeInput.fromMonthName = "March";
          }
          if (this.comulativeInput.fromMonth == "04") {
            this.comulativeInput.fromMonthName = "April";
          }
          if (this.comulativeInput.fromMonth == "05") {
            this.comulativeInput.fromMonthName = "May";
          }
          if (this.comulativeInput.fromMonth == "06") {
            this.comulativeInput.fromMonthName = "June";
          }
          if (this.comulativeInput.fromMonth == "07") {
            this.comulativeInput.fromMonthName = "July";
          }
          if (this.comulativeInput.fromMonth == "08") {
            this.comulativeInput.fromMonthName = "August";
          }
          if (this.comulativeInput.fromMonth == "09") {
            this.comulativeInput.fromMonthName = "September";
          }
          if (this.comulativeInput.fromMonth == "10") {
            this.comulativeInput.fromMonthName = "October";
          }
          if (this.comulativeInput.fromMonth == "11") {
            this.comulativeInput.fromMonthName = "November";
          }
          if (this.comulativeInput.fromMonth == "12") {
            this.comulativeInput.fromMonthName = "December";
          }

          //change month digit to month name
          if (this.comulativeInput.toMonth == "01") {
            this.comulativeInput.toMonthName = "January";
          }
          if (this.comulativeInput.toMonth == "02") {
            this.comulativeInput.toMonthName = "February";
          }
          if (this.comulativeInput.toMonth == "03") {
            this.comulativeInput.toMonthName = "March";
          }
          if (this.comulativeInput.toMonth == "04") {
            this.comulativeInput.toMonthName = "April";
          }
          if (this.comulativeInput.toMonth == "05") {
            this.comulativeInput.toMonthName = "May";
          }
          if (this.comulativeInput.toMonth == "06") {
            this.comulativeInput.toMonthName = "June";
          }
          if (this.comulativeInput.toMonth == "07") {
            this.comulativeInput.toMonthName = "July";
          }
          if (this.comulativeInput.toMonth == "08") {
            this.comulativeInput.toMonthName = "August";
          }
          if (this.comulativeInput.toMonth == "09") {
            this.comulativeInput.toMonthName = "September";
          }
          if (this.comulativeInput.toMonth == "10") {
            this.comulativeInput.toMonthName = "October";
          }
          if (this.comulativeInput.toMonth == "11") {
            this.comulativeInput.toMonthName = "November";
          }
          if (this.comulativeInput.toMonth == "12") {
            this.comulativeInput.toMonthName = "December";
          }

          this.showComulativeData = true;
          this.camulativeData = callback;
          this.toastr.success(callback.message, 'Success', {
            disableTimeOut: false
          });
          this.getEmployeeCumulativeSalaryData();
        } if (callback.status == false) {
          this.showComulativeData = false;
          this.toastr.warning(callback.message, 'Warning', {
            disableTimeOut: false
          });
        }

      });
    }
  }

  getEmployeeCumulativeSalaryData(){
    let requestObject = {
      fromMonthYear: this.fromMonthYear,
      toMonthYear: this.toMonthYear,
    };
    // console.log("requestObject", requestObject);

    // this.spiner();
    this.SalaryService.getEmployeeCumulativeSalaryData(requestObject, (callback: any) => {
      // console.log("callback", callback);
      this.comulativeEmployeeData = callback.data
    })
  }


    // Function to open the modal with employee data
    openModal(employeeData: any): void {
      this.selectedEmployee = employeeData;
      // console.log("selectedEmployee",this.selectedEmployee);
      
    }
  


  chekInput = () => {
    // console.log("Saving data before validate");
    if (this.comulativeInput.fromMonth === '' || this.comulativeInput.fromMonth === null || this.comulativeInput.fromMonth === undefined) {
      this.toastr.warning('Please enter from month', 'Warning', {
        disableTimeOut: false
      });
      return false;
    }
    if (this.comulativeInput.fromYear === '' || this.comulativeInput.fromYear === null || this.comulativeInput.fromYear === undefined) {
      this.toastr.warning('Please enter from Year', 'Warning', {
        disableTimeOut: false
      });
      return false;
    }
    if (this.comulativeInput.toMonth === '' || this.comulativeInput.toMonth === null || this.comulativeInput.toMonth === undefined) {
      this.toastr.warning('Please enter to month', 'Warning', {
        disableTimeOut: false
      });
      return false;
    }
    if (this.comulativeInput.toYear === '' || this.comulativeInput.toYear === null || this.comulativeInput.toYear === undefined) {
      this.toastr.warning('Please enter to year', 'Warning', {
        disableTimeOut: false
      });
      return false;
    }
    if (this.fromMonthYear > this.toMonthYear || this.fromMonthYear == this.toMonthYear) {
      this.toastr.warning('from month-year can not be more than to month-year', 'Warning', {
        disableTimeOut: false
      });
      return false;
    }
    return true;
  }
}
