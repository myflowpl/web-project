import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-watchdog',
  template: `{{ profile$ | async}}`,
  styles: [
  ]
})
export class WatchdogComponent {

  @Input()
  redirectTo = '/';

  profile$ = this.authService.profile$.pipe(
    map(profile => {
      if(!profile) {
        this.router.navigateByUrl(this.redirectTo);
      }
      return '';
    })
  )

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }
}
