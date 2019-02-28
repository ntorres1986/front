import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../api.service';
import { Adviser } from '../../../models/adviser';

@Component({
  selector: 'app-adviser-add',
  templateUrl: './adviser-add.component.html',
  styleUrls: ['./adviser-add.component.css']
})
export class AdviserAddComponent implements OnInit {

  adviser: Adviser = {id: 0, name: '', specialty: ''}; 
  adviserForm: FormGroup;
  isLoadingResults = false;

  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    
    this.adviserForm = this.formBuilder.group({
      name : ['',[ Validators.required, Validators.minLength(1) , Validators.maxLength(50) ]],
      specialty: ['',[ Validators.required, Validators.minLength(1) , Validators.maxLength(50) ]]
    });
  }

  onFormSubmit(form:NgForm) {
    if( this.adviserForm.status === "VALID" ){
      this.isLoadingResults = true;
      
      this.api.addAdviser(this.adviser)
        .subscribe(res => {
            let id = res['id'];
            this.router.navigate(['/adviser-details', id]);
          }, (err) => {
            console.log(err);
            this.isLoadingResults = false;
          });
    }
  }

}
