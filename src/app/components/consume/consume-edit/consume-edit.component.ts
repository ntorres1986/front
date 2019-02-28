
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../api.service';
import { Consume } from '../../../models/consume'; 
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';


@Component({
  selector: 'app-consume-edit',
  templateUrl: './consume-edit.component.html',
  styleUrls: ['./consume-edit.component.css']
})
export class ConsumeEditComponent implements OnInit {


  public value: Date = new Date();

  consume: Consume = { id : 0, date : new Date('10-Nov-2018') , description : null, amount: null , card :{id : 0, ccv : '', number : '', card_type : '', customer : null }};
  consumeForm: FormGroup;
  messageErrors = true;
  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.consume.id = this.route.snapshot.params['id'];
    this.consume.card.number = this.route.snapshot.params['card_number'];
    this.consume.card.id = this.route.snapshot.params['card_id'];
    
    this.getConsume(this.consume.id);

    this.consumeForm = this.formBuilder.group({
      date : ['',[ Validators.required,  ]],
      amount: ['',[ Validators.required, Validators.minLength(1), Validators.maxLength(12),  Validators.pattern("^[0-9]*$") ]],
      description : ['', [ Validators.required, Validators.maxLength(100) ]]
    });
  }

  getConsume(id) {
    this.api.getConsume(id)
      .subscribe(data => {
        this.consume = data;
      });
  }
  onFormSubmit(form:NgForm) {
    if( this.consumeForm.status === "VALID" ){
      this.api.updateConsume(this.consume.id, form)
        .subscribe(res => {
          console.log("res", res)
            let id = res['id'];
            this.router.navigate(['/consume-details', id, this.consume.card.id, this.consume.card.number]);
          }, (err) => {
            console.log(err);
          }
        );
      }else{
        this.messageErrors = false;
      }
  }

}
