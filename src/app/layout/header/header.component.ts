import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [
    AppService
  ],
})
export class HeaderComponent implements OnInit {

  user$ = this.authService.user$;

  constructor(
    private appService: AppService,
    protected authService: AuthService,
  ) {
    // console.log('header id', this.appService.id)
   }

  ngOnInit(): void {
  }

}
