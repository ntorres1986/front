import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../api.service';
import { Consume } from '../../../models/consume';
import { Card } from '../../../models/card';

@Component({
  selector: 'app-consume-add',
  templateUrl: './consume-add.component.html',
  styleUrls: ['./consume-add.component.css']
})
export class ConsumeAddComponent implements OnInit {

  consume: Consume = { id : 0, date : null, description : null, amount: null , card :{id : 0, ccv : '', number : '', card_type : '', customer : null }};
  consumeForm: FormGroup;
  messageErrors = true;
  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.consume.card.number = this.route.snapshot.params['card_number'];
    this.consume.card.id = this.route.snapshot.params['card_id'];

    this.consumeForm = this.formBuilder.group({
      date : ['',[ Validators.required,  ]],
      amount: ['',[ Validators.required, Validators.minLength(1), Validators.maxLength(12),  Validators.pattern("^[0-9]*$") ]],
      description : ['', [ Validators.required, Validators.maxLength(100) , ]]
    });
  }

  onFormSubmit(form:NgForm) {
    if( this.consumeForm.status === "VALID" ){      
      this.api.addConsume(this.consume)
        .subscribe(res => {
          console.log( "res" , res )
            let id = res['id'];
            this.router.navigate(['/consume-details', id, this.consume.card.id,  this.consume.card.number]);
          }, (err) => {
            console.log(err);
          });
    }
    else{
      this.messageErrors = false;
    }
  }

}
