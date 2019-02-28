import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.css']
})
export class CustomerAddComponent implements OnInit {

  customerForm: FormGroup;
  name:string='';
  address:string='';
  city:string='';
  telephone:String='';
  isLoadingResults = false;
  messageErrors = true;

  constructor(private router: Router, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.customerForm = this.formBuilder.group({
      name: ['',[ Validators.required, Validators.minLength(2) , Validators.maxLength(50) ]],
      address : ['',[ Validators.required, Validators.minLength(1) , Validators.maxLength(100) ]],
      city : ['', [ Validators.required, Validators.minLength(1) , Validators.maxLength(30) ]],
      telephone : ['', [ Validators.required, Validators.minLength(1) , Validators.maxLength(20), Validators.pattern("^[0-9]*$")]]
    });
  }
  onFormSubmit(form:NgForm) {

    if( this.customerForm.status === "VALID" ){
      this.isLoadingResults = true;
      this.api.addCustomer(form)
        .subscribe(res => {
          console.log( "res" , res )
            let id = res['id'];
            this.isLoadingResults = false;
            this.router.navigate(['/customer-details', id]);
          }, (err) => {
            console.log(err);
            this.isLoadingResults = false;
          });
    }
    else{
      this.messageErrors = false;
    }
  }
}