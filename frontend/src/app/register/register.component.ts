import { Component, OnInit } from '@angular/core';
import { RegisterService } from "./register.service";
import { ToastrService } from "ngx-toastr";
import { Router, ActivatedRoute, Params } from "@angular/router";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  departmentName: any;
  returnMsg:any;
  createMsg:any;
  public isRegister: boolean = false;
  showOTPInput: boolean = false;
  showVerify: boolean =false;
  public userCredentials = {
    f_name: "",
    m_name: "",
    l_name: "",
    email:"",
    phone_no:"",
    password: "",
    otp: "",
    role: "user"
  }; 
  public OTP = {
    otp1: "",
    otp11: "",
    otp22: "",
    otp33: "",
    otp44: "",
    otp55: "",
    otp66: "",
  }
  mat0: any;

  constructor(
    private RegisterService: RegisterService,
    private toastr: ToastrService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    
    // this.getAllProjects();
    
  }
  focusNext(nextInput: HTMLInputElement) {
    nextInput.focus();
  }
  
  department=()=>{
    let requestObject = {};
    this.RegisterService.getDepartment(requestObject, (callback:any)=>{
      console.log(callback);
      this.departmentName = callback;
    });  
  }
  
  validateEmail = ()=> {
      if (this.returnMsg === "exist") {
        this.toastr.error("Email is already registered", "Warning");
        return false;
      }
    return true;
}

  sendOtp()  {
    let regExp_email = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!regExp_email.test(this.userCredentials.email)) {
      //alert('Enter valid email adress')
      this.toastr.error("Enter valid email address", "Warning");
    } else {
      this.RegisterService.verifyEmail(this.userCredentials.email, (res: any) => {
        this.returnMsg = res.message;
        console.log("lllllllllll",this.returnMsg);
      
      this.validateEmail();
      if (this.validateEmail()) {
        this.mat0 = Math.floor(Math.random()*(999-100+1)+100);
        console.log("ggg",this.mat0);
        this.userCredentials.otp = this.mat0;
        this.RegisterService.sendOtp(this.userCredentials, (res: any) => {
          this.returnMsg = res.message;
          console.log("lllllllllll",this.returnMsg);
        });
          if (this.mat0 !== "") {
            this.showOTPInput = true;
          } else {
            this.toastr.error(
              "Oops! Something went wrong. Please try again",
              "Warning"
            );
          }
        }
      });
    }

    
}

  verifyOtpData() {
    let otp77 = this.OTP.otp11+""+this.OTP.otp22+""+this.OTP.otp33+""+this.OTP.otp44+""+this.OTP.otp55+""+this.OTP.otp66;
    console.log("otppppppppppppppppppp", otp77);
    
    let requestObject = {
      otp: parseInt(otp77),
    };
    if (requestObject.otp === this.mat0) {
      this.toastr.success('OTP verification Successful.','Success!',{
        disableTimeOut:false
      });
      this.showVerify = true;
      this.department();
    } else {
      this.toastr.error('OTP not matched.','Warning',{
        disableTimeOut:false
      });
    }
    // this.publicRegistrationService.verifyOtp(requestObject, response => {
    //   if (response.type !== "error") {
    //     this.registerMe();
    //   } else {
    //     this.toastr.error(response.message, "Warning");
    //   }
    // });
    console.log("jjjj",requestObject.otp);
    console.log("kkkkkkkk",this.mat0);
    
  }

  register() {
    this.RegisterService.createUser(this.userCredentials, (res: any) => {
      this.createMsg = res.message
      if (this.createMsg === "success") {
        this.toastr.success("User created successfull", "success");
        this.cancelRegistration();
      }
      else{
        this.toastr.error("Oops! Something went wrong. Please try again",
        "Warning");
      }
    })
  }
  cancelRegistration = () => {
    this.router.navigate([""]);
  };
  
}
