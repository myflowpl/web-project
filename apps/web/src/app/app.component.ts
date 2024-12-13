import { Component, inject } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { HasRoleDirectie, injectLoginDialog, ProfileStore } from '@web/auth';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterLink,
    HasRoleDirectie,
    // RouterModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  profileStore = inject(ProfileStore);
  loginDialog = injectLoginDialog();
}
