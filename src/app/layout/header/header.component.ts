import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ProfileStore } from '../../auth/profile.store';
import { HasRoleDirective } from '../../auth/has-role.directive';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    RouterLinkActive,
    HasRoleDirective,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  protected readonly profileStore = inject(ProfileStore);
  
  constructor() {
    
  }
}
