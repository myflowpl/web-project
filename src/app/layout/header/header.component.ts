import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user$ = this.authService.profile$.pipe(
    map(profile => profile?.user)
  );

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
  }

  signOut() {
    this.authService.signOut().subscribe();
  }
}
