import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuardService as AuthGuard } from "./auth/auth-gaurd.service";
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { BrunchComponent } from './admin/brunch/brunch.component';
import { FieldAgentComponent } from './admin/field-agent/field-agent.component';
import { BrunchDetailsComponent } from './admin/brunch-details/brunch-details.component';
import { UsersComponent } from './admin/users/users.component';
import { MembershipRequestDetailsComponent } from './brunchManager/membership-request-details/membership-request-details.component';
import { NewMembershipComponent } from './field-agent/new-membership/new-membership.component';
import { MembershipRequestComponent } from './brunchManager/membership-request/membership-request.component';
import { NewAccountComponent } from './field-agent/new-account/new-account.component';
import { AccountRequestDetailsComponent } from './brunchManager/account-request-details/account-request-details.component';
import { AccountRequestComponent } from './brunchManager/account-request/account-request.component';
import { FieldAgentListComponent } from './brunchManager/field-agent-list/field-agent-list.component';
import { LoanApplyComponent } from './field-agent/loan-apply/loan-apply.component';
import { LoanComponent } from './admin/loan/loan.component';
import { LoanRequestComponent } from './brunchManager/loan-request/loan-request.component';
import { LoanRequestDetailsComponent } from './admin/loan-request-details/loan-request-details.component';
import { VendorComponent } from './field-agent/vendor/vendor.component';
import { VendorRequestComponent } from './brunchManager/vendor-request/vendor-request.component';
import { VendorRequestDetailsComponent } from './brunchManager/vendor-request-details/vendor-request-details.component';
import { LoanRequestDetailsUpdateComponent } from './field-agent/loan-request-details-update/loan-request-details-update.component';
import { ExpressLoanApplyComponent } from './field-agent/express-loan-apply/express-loan-apply.component';
import { ExpressLoanDetailsComponent } from './admin/express-loan-details/express-loan-details.component';
import { ExpressLoanRequestComponent } from './brunchManager/express-loan-request/express-loan-request.component';
import { ExpressLoanComponent } from './admin/express-loan/express-loan.component';
import { CloseAccountApplyComponent } from './field-agent/close-account-apply/close-account-apply.component';
import { CloseAccountDetailsUpdateComponent } from './field-agent/close-account-details-update/close-account-details-update.component';
import { CloseAccountRequestComponent } from './brunchManager/close-account-request/close-account-request.component';
import { CloseAccountDetailsService } from './admin/close-account-details/close-account-details.service';
import { CloseAccountDetailsComponent } from './admin/close-account-details/close-account-details.component';
import { CloseAccountComponent } from './admin/close-account/close-account.component';
import { ExpressLoanDetailsUpdateComponent } from './field-agent/express-loan-details-update/express-loan-details-update.component';
import { CashierComponent } from './admin/cashier/cashier.component';
import { CashierListComponent } from './brunchManager/cashier-list/cashier-list.component';
import { CashCounterPaymentComponent } from './cashier/cash-counter-payment/cash-counter-payment.component';
import { CashCounterPaymentListComponent } from './admin/cash-counter-payment-list/cash-counter-payment-list.component';
import { CashCounterPaymentRequestComponent } from './brunchManager/cash-counter-payment-request/cash-counter-payment-request.component';
import { SalaryComponent } from './admin/salary/salary.component';
import { AdminMembershipComponent } from './admin/admin-membership/admin-membership.component';
import { AdminAccountApplicationComponent } from './admin/admin-account-application/admin-account-application.component';
import { FileUploadComponent } from './admin/file-upload/file-upload.component';

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "register",
    component: RegisterComponent
  },
  {
    path: "home",
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "profile",
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "users",
    component: UsersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "salary",
    component: SalaryComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "branch-list",
    component: BrunchComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "branch-details",
    component: BrunchDetailsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "field-agent",
    component: FieldAgentComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "membership-application",
    component: AdminMembershipComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "account-application",
    component: AdminAccountApplicationComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "cashier",
    component: CashierComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "loan-request-list",
    component: LoanComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "express-loan-request-list",
    component: ExpressLoanComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "close-account-request-list",
    component: CloseAccountComponent,
    canActivate: [AuthGuard]
  },

  {
    path: "field-agent-list",
    component: FieldAgentListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "file-upload",
    component: FileUploadComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "cashier-list",
    component: CashierListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "new-membership-opening",
    component: NewMembershipComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "new-account-opening",
    component: NewAccountComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "vendor-list",
    component: VendorComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "vendor-request-list",
    component: VendorRequestComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "vendor-request-details/:id",
    component: VendorRequestDetailsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "membership-request",
    component: MembershipRequestComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "membership-request-details/:id",
    component: MembershipRequestDetailsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "account-request",
    component: AccountRequestComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "account-request-details/:id",
    component: AccountRequestDetailsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "loan-apply-request",
    component: LoanRequestComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "express-loan-apply-request",
    component: ExpressLoanRequestComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "account-close",
    component: CloseAccountApplyComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "close-account-details/:id",
    component: CloseAccountDetailsComponent,
    canActivate: [AuthGuard]
  }, 
  {
    path: "account-close-request-details-update/:id",
    component: CloseAccountDetailsUpdateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "express-loan-details-update/:id",
    component: ExpressLoanDetailsUpdateComponent,
    canActivate: [AuthGuard]
  }, 

  {
    path: "loan-apply",
    component: LoanApplyComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "express-loan-apply",
    component: ExpressLoanApplyComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "express-loan-details/:id",
    component: ExpressLoanDetailsComponent,
    canActivate: [AuthGuard]
  }, 
  {
    path: "loan-request-details/:id",
    component: LoanRequestDetailsComponent,
    canActivate: [AuthGuard]
  }, 
  {
    path: "loan-request-details-update/:id",
    component: LoanRequestDetailsUpdateComponent,
    canActivate: [AuthGuard]
  },  
  {
    path: "close-loan-apply-request",
    component: CloseAccountRequestComponent,
    canActivate: [AuthGuard]
  },


  //cash counter payment
  {
    path: "cash-counter-payment",
    component: CashCounterPaymentComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "cash-counter-payment-list",
    component: CashCounterPaymentListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "cash-counter-payment-list-branch",
    component: CashCounterPaymentRequestComponent,
    canActivate: [AuthGuard]
  },
  { path: "**", redirectTo: "home" }
];

const config: ExtraOptions = {
  useHash: true
};

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
