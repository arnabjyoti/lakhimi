import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, FormBuilder } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { CloseAccountDetailsUpdateService } from './close-account-details-update.service';

@Component({
  selector: 'app-close-account-details-update',
  templateUrl: './close-account-details-update.component.html',
  styleUrls: ['./close-account-details-update.component.css'],
  standalone: true,
  imports: [RouterModule, MatTableModule, MatPaginatorModule, MatButtonModule, MatInputModule, FormsModule, MatFormFieldModule, CommonModule],
})
export class CloseAccountDetailsUpdateComponent implements OnInit{


  public inputForm: any = {
    closing_type: "",
    claim_for: "",
    type_of_ac: "",
    specify: "",
    new_ac_no: "",
    open_date: "",
    end_date: "",
    claiming_ac_holder_name: "",
    claiming_ac_no: "",
    claiming_c_id: "",
    claiming_opening_date: "",
    claiming_closing_date: "",
    claiming_agent_name: "",
    claiming_code: "",
    claiming_branch_name: "",
    nominee_name: "",
    address: "",
    cause: "",
    bank_name: "",
    br_name: "",
    name_ac: "",
    ac_no: "",
    ifsc: "",
    apply_date: "",
  }




  public endpoint: any;
  public myDate: any = new Date();
  public rqstId: any;
  public user: any;
  public userId: any;
  public brunchId: any;
  public brunchDetails: any;

  public isLodaing = true;

  constructor(
    private spinner: NgxSpinnerService,
    private CloseAccountDetailsUpdateService: CloseAccountDetailsUpdateService,
    private toastr: ToastrService,
    private _formBuilder: FormBuilder,
    
    private route: ActivatedRoute,
    private datePipe: DatePipe,
  ) {
    this.endpoint = environment.BASE_URL;
    this.myDate = this.datePipe.transform(this.myDate, "YYYY-MM-dd");
    this.route.paramMap.subscribe(params => {
      this.rqstId = params.get("id");
      console.log("rqstId", this.rqstId);

    });
    this.init();
  }
  init = () => {
    let token = JSON.parse(JSON.stringify(localStorage.getItem('token')));
    token = JSON.parse(token);

    this.user = token['usr'];
    this.userId = this.user.id;

    this.inputForm.userId = this.userId;

    this.brunchDetails = token['brunch'];
    this.brunchId = this.brunchDetails.br_id;

    this.inputForm.brunchId = this.brunchId;
    this.inputForm.branch_name = this.brunchDetails.br_name;

    console.log("zzzzzzzzzzzzzzzzzzzz", this.brunchId);

    console.log("Token=", token);
    if (!token.usr.accessKeyword) {
      console.log("gggggggggggggggggggggg");

      return;
    }
  }

  ngOnInit(): void {
    this.getCloseAcDataById();
  }

  spiner() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 5000);
  }


  getCloseAcDataById(){
      this.isLodaing = true;
      this.spiner();
      this.CloseAccountDetailsUpdateService.closeAcDataById(this.rqstId, (res: any) => {
        console.log("ResDetails==", res);
        this.isLodaing = false;
  
        this.inputForm.id = res.id;
        this.inputForm.closing_type = res.closing_type;
        this.inputForm.claim_for = res.claim_for;
        this.inputForm.type_of_ac = res.type_of_ac;
        this.inputForm.specify = res.specify;
        this.inputForm.new_ac_no = res.new_ac_no;
        this.inputForm.open_date = res.open_date;
        this.inputForm.end_date = res.end_date;
        this.inputForm.claiming_ac_holder_name = res.claiming_ac_holder_name;
        this.inputForm.claiming_ac_no = res.claiming_ac_no;
        this.inputForm.claiming_c_id = res.claiming_c_id;
        this.inputForm.claiming_opening_date = res.claiming_opening_date;
        this.inputForm.claiming_closing_date = res.claiming_closing_date;
        this.inputForm.claiming_agent_name = res.claiming_agent_name;
        this.inputForm.claiming_code = res.claiming_code;
        this.inputForm.claiming_branch_name = res.claiming_branch_name;
        this.inputForm.nominee_name = res.nominee_name;
        this.inputForm.address = res.address;
        this.inputForm.cause = res.cause;
        this.inputForm.bank_name = res.bank_name;
        this.inputForm.br_name = res.br_name;
        this.inputForm.name_ac = res.name_ac;
        this.inputForm.ac_no = res.ac_no;
        this.inputForm.ifsc = res.ifsc;
        this.inputForm.apply_date = res.apply_date;

  }
)}

}
