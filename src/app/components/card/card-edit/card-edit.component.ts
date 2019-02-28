import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../api.service';
import { Card } from '../../../models/card'; 
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';


@Component({
  selector: 'app-card-edit',
  templateUrl: './card-edit.component.html',
  styleUrls: ['./card-edit.component.css']
})
export class CardEditComponent implements OnInit {

  card: Card = {id: 0, ccv: '', number: '', card_type: '', customer: { id: 0, name: '', address: '', city: '', telephone: ''} }; 
  
  cardForm: FormGroup;
  messageErrors = true;
  isLoadingResults = false;
  

  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.cardForm = this.formBuilder.group({
      number : ['',[ Validators.required, Validators.minLength(16) , Validators.maxLength(16) ]],
      ccv: ['',[ Validators.required, Validators.minLength(3) , Validators.maxLength(4) ]],
      card_type : ['', [ Validators.required, Validators.minLength(1) , Validators.maxLength(50) ]]
    });
    this.getCard(this.route.snapshot.params['id']);
  }

  getCard(id) {
    this.api.getCard(id)
      .subscribe(data => {
        this.card = data;
        console.log(this.card);
      });
  }
  onFormSubmit(form:NgForm) {
    console.log("form status", this.cardForm.status);
    if( this.cardForm.status === "VALID" ){
      this.isLoadingResults = true;
      this.api.updateCard(this.card.id, form)
        .subscribe(res => {
            let id = res['id'];
            this.isLoadingResults = false;
            this.router.navigate(['/card-details', id]);
          }, (err) => {
            console.log(err);
            this.isLoadingResults = false;
          }
        );
      }
      else{
        this.messageErrors = false;
      }
    }
}
