import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../api.service';
import { Consume } from '../../../models/consume';
import { Card } from '../../../models/card';


@Component({
  selector: 'app-consume-detail',
  templateUrl: './consume-detail.component.html',
  styleUrls: ['./consume-detail.component.css']
})
export class ConsumeDetailComponent implements OnInit {
  
  consume: Consume = { id : 0, date : null, description : null, amount: null , card :{id : 0, ccv : '', number : '', card_type : '', customer : null }};
  
  constructor( private route: ActivatedRoute, private api: ApiService, private router: Router ) { }

  ngOnInit() {
    console.log( this.route.snapshot.params )
    this.consume.id = this.route.snapshot.params['id'];
    this.consume.card.id = this.route.snapshot.params['card_id'];
    this.consume.card.number = this.route.snapshot.params['card_number'];
    this.getConsume(this.consume.id);
  }

  getConsume(id) {
    this.api.getConsume(id)
      .subscribe(data => {
        this.consume = data;
        console.log(this.consume);
      });
  }
  deleteConsume(id) {
    this.api.deleteConsume(id)
      .subscribe(res => {
          this.router.navigate(['/consumes',this.consume.card.id, this.consume.card.number]);
        }, (err) => {
          console.log(err);
          
        }
      );
  }

}
