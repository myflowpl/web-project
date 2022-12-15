import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.page.html',
  styleUrls: ['./artist-list.page.scss']
})
export class ArtistListPage implements OnInit {

  authService = inject(AuthService);

  profile$ = this.authService.loadProfile();

  ngOnInit(): void {
  }

}
