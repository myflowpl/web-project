import { Component, inject, OnInit } from '@angular/core';
import { LoginDialog } from '../../../auth/dialogs/login-dialog/login-dialog.component';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {
  authService = inject(AuthService);

  loginDialog = inject(LoginDialog);

  profile$ = this.authService.loadProfile();

  color = 'purple';

  ngOnInit(): void {}

  login() {
    this.loginDialog
      .open({
        message: 'This action requires you to be logged in',
      })
      .subscribe({
        next: (loginResponse) =>
          console.log('LOGIN DIALOG RESPONSE', loginResponse),
        error: (err) => console.log('LOGIN DIALOG ERROR', err),
      });
  }
}
