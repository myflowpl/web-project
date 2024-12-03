import { Component, computed, inject, viewChild } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { ProfileStore, HasRoleDirective } from '@web/auth';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, HasRoleDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  profileStore = inject(ProfileStore);

  title = 'web';
}
