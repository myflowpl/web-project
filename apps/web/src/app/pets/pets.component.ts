import {
  Component,
  computed,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { injectQueryParam, injectUpdateTitle } from '../utils';
import { PetsStore, Status } from './pets.store';
import { injectLoginDialog } from '../auth/login/login.dialog';
import { ProfileStore } from '../auth/profile.store';

@Component({
  selector: 'app-pets',
  imports: [RouterLink],
  templateUrl: './pets.component.html',
  styleUrl: './pets.component.scss',
  providers: [PetsStore, ProfileStore],
})
export class PetsComponent {
  store = inject(PetsStore);

  status = injectQueryParam<Status>('status', 'available');

  updateTitle = injectUpdateTitle();

  loginDialog = injectLoginDialog();

  constructor() {
    this.store.loadPets(this.status);

    this.updateTitle(this.store.title);

    // this.loginDialog.open();
  }
}
