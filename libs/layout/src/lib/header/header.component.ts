import { Component, inject } from '@angular/core';
import { ProfileStore } from '@asseco/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  profileStore = inject(ProfileStore);
  
}
