import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../api.service';
import { Card } from '../../../models/card'; 

@Component({
  selector: 'app-card-add',
  templateUrl: './card-add.component.html',
  styleUrls: ['./card-add.component.css']
})
export class CardAddComponent implements OnInit {

  
  card: Card = {id: 0, ccv: '', number: '', card_type: '', customer: { id: 0, name: '', address: '', city: '', telephone: ''} }; 
  messageErrors = true;
  cardForm: FormGroup;
  isLoadingResults = false;

  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.card.customer.id = this.route.snapshot.params['customer_id'];
  
    this.cardForm = this.formBuilder.group({
      number : ['',[ Validators.required, Validators.minLength(16) , Validators.maxLength(16) ]],
      ccv: ['',[ Validators.required, Validators.minLength(3) , Validators.maxLength(4) ]],
      card_type : ['', [ Validators.required, Validators.minLength(1) , Validators.maxLength(50) ]]
    });
  }

  onFormSubmit(form:NgForm) {
    
    if( this.cardForm.status === "VALID" ){
      this.isLoadingResults = true;
      
      this.api.addCard(this.card)
        .subscribe(res => {
          console.log( "res" , res )
            let id = res['id'];
            this.router.navigate(['/card-details', id]);
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
