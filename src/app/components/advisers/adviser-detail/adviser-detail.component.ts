import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../api.service';
import { Adviser } from '../../../models/adviser';


@Component({
  selector: 'app-adviser-detail',
  templateUrl: './adviser-detail.component.html',
  styleUrls: ['./adviser-detail.component.css']
})
export class AdviserDetailComponent implements OnInit {

  adviser: Adviser = {id: 0, name: '', specialty : ''};

  constructor( private route: ActivatedRoute, private api: ApiService, private router: Router ) { }

  ngOnInit() {
    this.getAdviser(this.route.snapshot.params['id']);
  }

  getAdviser(id) {
    this.api.getAdviser(id)
      .subscribe(data => {
        this.adviser = data;
      });
  }
  deleteAdviser(id) {
    this.api.deleteAdviser(id)
      .subscribe(res => {
          this.router.navigate(['/advisers']);
        }, (err) => {
          console.log(err);
        }
      );
  }
}
