import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../api.service';
import { Consume } from '../../../models/consume';

@Component({
  selector: 'app-consumes',
  templateUrl: './consumes.component.html',
  styleUrls: ['./consumes.component.css']
})
export class ConsumesComponent implements OnInit {

  cardNumber = null;
  cardId = null;
  consumes: Consume[] = [];
  isLoadingResults = true;

  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService) { }

  ngOnInit() {
    this.cardNumber = this.route.snapshot.params['card_number'];
    this.cardId = this.route.snapshot.params['card_id'];
    this.api.getConsumes(this.cardId)
    .subscribe(res => {
      this.consumes = res;
      console.log(this.consumes);
      this.isLoadingResults = false;
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }

}
