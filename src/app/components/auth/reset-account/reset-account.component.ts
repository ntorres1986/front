import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../api.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';


@Component({
  selector: 'app-reset-account',
  templateUrl: './reset-account.component.html',
  styleUrls: ['./reset-account.component.css']
})
export class ResetAccountComponent implements OnInit {

  constructor(private router: Router, private api: ApiService, private formBuilder: FormBuilder) { }
  
  resetForm: FormGroup;
  email = '';
  loading = false;

  ngOnInit() {
    this.resetForm = this.formBuilder.group({
      email: ['',[ Validators.required, Validators.email]]
    });
  }

  onFormSubmit(form:NgForm) { 
    
    if( this.resetForm.status === "VALID" ){
      this.loading = true; 
      this.api.resetAccount(this.email)
        .subscribe(response => {
            console.log("response", response)
            this.loading = false;
        }, (err) => {
            console.log(err);
            this.loading = false;
        });
    }
    else{
      console.log("Invalido...")
    }
  }

}
