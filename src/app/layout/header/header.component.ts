import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthStore } from '../../auth/auth.store';
import { HighliteDirective } from '../../directives/highlite.directive';
import { HasRoleDirective } from '../../directives/has-role.directive';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, HighliteDirective, HasRoleDirective],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  auth = inject(AuthStore);

}
