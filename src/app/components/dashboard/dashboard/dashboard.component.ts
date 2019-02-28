import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }
  loading = false;
  homeClass = false;
  dashboardClass = false;
  inboxClass = false;

  ngOnInit() {
  }

  callContent(contentId) {
    this.homeClass = this.dashboardClass = this.inboxClass = false;
    switch (contentId) {
      case 1:
        this.homeClass = true;
      break;
      case 2:
        this.dashboardClass = true;
      break;
      case 3:
        this.inboxClass = true;
      break; 
    }
  }

}
