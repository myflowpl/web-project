import { Component, inject } from '@angular/core';
import { AuthStore } from 'src/app/auth/auth.store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  store = inject(AuthStore);

}
