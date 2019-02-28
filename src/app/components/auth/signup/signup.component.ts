import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../api.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { User } from '../../../models/user'; 

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private router: Router, private api: ApiService, private formBuilder: FormBuilder) { }

  private user: User = { username: null, 
                         password: null, 
                         email: null,
                         firstName: null,
                         lastName: null
                        }; 
  private remeber = null;
  signupForm: FormGroup;
  errorForm = false;
  loading = false;
  terms = null;
  passwordConfirm = null;

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      firstName: ['',[ Validators.required ]],
      lastName: ['',[ Validators.required ]],
      username: ['',[ Validators.required ]],
      email: ['',[ Validators.required ]],
      password: ['',[ Validators.required ]],
      passwordConfirm : ['',[ Validators.required ]],
      terms : ['',[ Validators.required ]]
    });
  }

  onFormSubmit(form:NgForm) {
    console.log("Frm ", this.signupForm.status )
    if( this.signupForm.status === "VALID" ){
      this.loading = true;
      console.log(this.user)
      this.api.signUp(this.user)
        .subscribe(response => {
            this.loading = false;
            console.log(response)
            if( response.status ){
              localStorage.setItem("userId", `${response.id}`);
              localStorage.setItem('userToken', `${response.token}`); 
              this.router.navigate(['/dashboard']);
            }

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
