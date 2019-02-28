import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../api.service';
import { Card } from '../../../models/card';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.component.html',
  styleUrls: ['./card-detail.component.css']
})
export class CardDetailComponent implements OnInit {

  card: Card = { id: 0, ccv: '', number: '', card_type: null , customer: { id: 0, name: '', address: '', city: '', telephone: ''} };

  constructor( private route: ActivatedRoute, private api: ApiService, private router: Router ) { }

  ngOnInit() {
    this.card.customer.id = this.route.snapshot.params['id'];
    this.getCard(this.route.snapshot.params['id']);
  }

  getCard(id) {
    this.api.getCard(id)
      .subscribe(data => {
        this.card = data;
        console.log(this.card);
      });
  }
  deleteCard(id) {
    this.api.deleteCard(id)
      .subscribe(res => {
          this.router.navigate(['/cards',this.card.customer.id]);
        }, (err) => {
          console.log(err);
          
        }
      );
  }

}
