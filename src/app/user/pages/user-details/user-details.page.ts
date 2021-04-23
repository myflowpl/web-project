import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-user-details',
  template: `
    <div>
      user-details works!
      <pre>{{params$ | async | json}}</pre>
</div>
  `,
  styles: [
  ]
})
export class UserDetailsPage implements OnInit {

  params$ = this.route.params

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
  }

}
