import { Component, OnInit } from '@angular/core';
import { Role } from '../../api/api.model';
import { AppService } from '../../app.service';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [AppService],
})
export class HeaderComponent implements OnInit {
  requiredRole: Role | string = '';

  user$ = this.authService.user$;

  toggleRole() {
    this.requiredRole = this.requiredRole ? '' : Role.ADMIN;
  }

  constructor(
    private appService: AppService,
    protected authService: AuthService
  ) {
    // console.log('header id', this.appService.id)
  }

  ngOnInit(): void {}
}
