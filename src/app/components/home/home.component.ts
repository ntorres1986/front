import { Component, OnInit , ViewChild, ViewContainerRef , ComponentFactoryResolver,ComponentRef,ComponentFactory} from '@angular/core';

import { DashboardComponent } from '../../components/dashboard/dashboard/dashboard.component'


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 
  loading = false;
  homeClass = false;
  dashboardClass = false;
  inboxClass = false;

  @ViewChild('container', { read: ViewContainerRef }) entry: ViewContainerRef;
  constructor(private resolver: ComponentFactoryResolver) { }


  createComponent(message) {
    this.entry.clear();
    const factory = this.resolver.resolveComponentFactory(DashboardComponent);
    const componentRef = this.entry.createComponent(factory);
    componentRef.instance.message = message;
}

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
