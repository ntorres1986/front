import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../api.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-credentials',
  templateUrl: './change-credentials.component.html',
  styleUrls: ['./change-credentials.component.css']
})
export class ChangeCredentialsComponent implements OnInit {

  constructor(private router: Router,private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder) { }

  changeCredentialsForm: FormGroup;
  private password;
  private confirmPassword;
  private username;
  private token;
  loading = false;

  ngOnInit() {
      this.loading = true; 
      this.token = this.route.snapshot.params['token'];
      this.api.validateCredentials(this.route.snapshot.params['token'])
        .subscribe(response => {
            console.log("response", response)
            this.loading = false;
        }, (err) => {
            console.log(err);
            this.loading = false;
      });

      this.changeCredentialsForm = this.formBuilder.group({
        username: ['',[ Validators.required]],
        password: ['',[ Validators.required]],
        token: ['',[]],
        confirmPassword: ['',[ Validators.required]]
      });
  }

  onFormSubmit(form:NgForm) { 
    if( this.changeCredentialsForm.status === "VALID" ){
      this.loading = true; 
      
      this.api.changeCredentials(form)
        .subscribe(response => {
            this.loading = false;
            //if( response.status ){
              this.router.navigate(['']);
            //}
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
