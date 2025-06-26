import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { injectLoginDialog } from './auth/login-dialog/login-dialog';
import { ProfileStore } from './auth/profile.store';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'web';

  loginDialog = injectLoginDialog();

  profileStore = inject(ProfileStore);
  
  handleLogin() {
    this.loginDialog.open('Hej musisz się zalogować by zobaczyć tą stronę')
      .subscribe((res) => console.log('CLOSE', res))
  }
}
