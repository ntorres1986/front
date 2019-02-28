import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../api.service';
import { Card } from '../../../models/card';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {

  customerId = null;
  cards: Card[] = [];
  isLoadingResults = true;

  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService) { }

  ngOnInit() {
    this.customerId = this.route.snapshot.params['customer_id'];
    this.api.getCards(this.customerId)
    .subscribe(res => {
      this.cards = res;
      console.log(this.cards);
      this.isLoadingResults = false;
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }

}
