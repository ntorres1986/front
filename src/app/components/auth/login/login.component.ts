import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../api.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { User } from '../../../models/user'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private api: ApiService, private formBuilder: FormBuilder) { }

  private user: User = { username: null, 
                         password: null,
                         email: null ,
                         firstName: null,
                         lastName: null}; 
  private remeber = null;
  loginForm: FormGroup;
  errorForm = false;
  loading = false;

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['',[ Validators.required ]],
      password : ['',[ Validators.required ]],
      remember : ['',[]]
    });
  }

  onFormSubmit(form:NgForm) { 
    if( this.loginForm.status === "VALID" ){
      this.loading = true;
      console.log(this.user)
      this.api.onLogin(this.user)
        .subscribe(response => {
            this.loading = false;
            
            if( response.status ){
              this.loading = false;
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
