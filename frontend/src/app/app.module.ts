import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// import { HttpModule } from '@angular/http';
import {AuthService} from './auth/auth.service';
import { AuthGuardService } from './auth/auth-gaurd.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DatePipe } from '@angular/common';
import { TovnavComponent } from './components/tovnav/tovnav.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FooterComponent } from './components/footer/footer.component';
import { AccountRequestDetailsComponent } from './brunchManager/account-request-details/account-request-details.component';
import { AccountRequestComponent } from './brunchManager/account-request/account-request.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoanApplyComponent } from './field-agent/loan-apply/loan-apply.component';
import { LoanComponent } from './admin/loan/loan.component';
import { LoanRequestComponent } from './brunchManager/loan-request/loan-request.component';
import { LoanRequestDetailsComponent } from './admin/loan-request-details/loan-request-details.component';
import { VendorComponent } from './field-agent/vendor/vendor.component';
import { VendorRequestComponent } from './brunchManager/vendor-request/vendor-request.component';
import { VendorRequestDetailsComponent } from './brunchManager/vendor-request-details/vendor-request-details.component';
import { LoanRequestDetailsUpdateComponent } from './field-agent/loan-request-details-update/loan-request-details-update.component';
import { ExpressLoanApplyComponent } from './field-agent/express-loan-apply/express-loan-apply.component';
import { ExpressLoanRequestComponent } from './brunchManager/express-loan-request/express-loan-request.component';
import { ExpressLoanComponent } from './admin/express-loan/express-loan.component';
import { ExpressLoanDetailsComponent } from './admin/express-loan-details/express-loan-details.component';
import { CloseAccountRequestComponent } from './brunchManager/close-account-request/close-account-request.component';
import { CloseAccountApplyComponent } from './field-agent/close-account-apply/close-account-apply.component';
import { CloseAccountDetailsComponent } from './admin/close-account-details/close-account-details.component';
import { CloseAccountDetailsUpdateComponent } from './field-agent/close-account-details-update/close-account-details-update.component';
import { ExpressLoanDetailsUpdateComponent } from './field-agent/express-loan-details-update/express-loan-details-update.component';
import { CashierComponent } from './admin/cashier/cashier.component';
import { CashCounterPaymentComponent } from './cashier/cash-counter-payment/cash-counter-payment.component';
import { CameraCaptureComponent } from './camera-capture/camera-capture.component';
import { CashCounterPaymentListComponent } from './admin/cash-counter-payment-list/cash-counter-payment-list.component';
import { CashCounterPaymentRequestComponent } from './brunchManager/cash-counter-payment-request/cash-counter-payment-request.component';
import { SalaryComponent } from './admin/salary/salary.component';
import { AdminMembershipComponent } from './admin/admin-membership/admin-membership.component';
import { AdminAccountApplicationComponent } from './admin/admin-account-application/admin-account-application.component';
import { FileUploadComponent } from './admin/file-upload/file-upload.component';
import { VendorListComponent } from './admin/vendor-list/vendor-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    TovnavComponent,
    RegisterComponent,
    ProfileComponent,
    FooterComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MatSlideToggleModule,
    NgxSpinnerModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    BrowserAnimationsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [AuthService, AuthGuardService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
