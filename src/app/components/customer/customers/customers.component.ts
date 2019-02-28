import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../api.service';
import { Customer } from '../../../models/customer';


@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  customers: Customer[] = [];
  isLoadingResults = true;

  constructor(private api: ApiService) { }

  ngOnInit() 
  {
    this.api.getCustomers()
    .subscribe(res => {
      this.customers = res;
      console.log(this.customers);
      this.isLoadingResults = false;
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }

}
