import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../api.service';
import { Adviser } from '../../../models/adviser';


@Component({
  selector: 'app-adviser-edit',
  templateUrl: './adviser-edit.component.html',
  styleUrls: ['./adviser-edit.component.css']
})
export class AdviserEditComponent implements OnInit {

  adviser: Adviser = {id: 0, name: '', specialty: ''}; 
  adviserForm: FormGroup;
  isLoadingResults = false;

  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getAdviser(this.route.snapshot.params['id']);
    this.adviserForm = this.formBuilder.group({
      name : ['',[ Validators.required, Validators.minLength(1) , Validators.maxLength(50) ]],
      specialty: ['',[ Validators.required, Validators.minLength(1) , Validators.maxLength(50) ]]
    });
  }

  getAdviser(id) {
    this.api.getAdviser(id)
      .subscribe(data => {
        this.adviser = data;
      });
  }

  onFormSubmit(form:NgForm) {
    if( this.adviserForm.status === "VALID" ){
      this.isLoadingResults = true;
      
      this.api.updateAdviser(this.adviser.id, this.adviser)
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
