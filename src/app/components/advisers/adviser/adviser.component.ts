import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../api.service';
import { Adviser } from '../../../models/adviser';


@Component({
  selector: 'app-adviser',
  templateUrl: './adviser.component.html',
  styleUrls: ['./adviser.component.css']
})
export class AdviserComponent implements OnInit {

  advisers: Adviser[] = [];
  isLoadingResults = true;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getAdvisers()
    .subscribe(res => {
      this.advisers = res;
      console.log(this.advisers);
      this.isLoadingResults = false;
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }

}
