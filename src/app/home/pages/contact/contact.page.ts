import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss']
})
export class ContactPage implements OnInit {


  authService = inject(AuthService);

  profile$ = this.authService.loadProfile();


  color = 'purple';

  ngOnInit(): void {
  }

}
