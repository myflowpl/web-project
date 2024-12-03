import { Component, effect, inject, input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProfileStore } from '@web/auth';

@Component({
  selector: 'app-login-form',
  imports: [ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent {
  message = input<string>();

  loginSuccess = output<ProfileStore>();

  profileStore = inject(ProfileStore);

  form = inject(FormBuilder).group({
    email: ['piotr@myflow.pl', [Validators.email], []],
    password: ['!@#$', [Validators.minLength(3)], []],
  });

  constructor() {
    effect(() => {
      console.log(this.message());
    });
  }

  handleLogin() {
    this.profileStore.login({
      id: 1,
      name: 'Piotr',
      email: this.form.value.email || 'test@myflow.pl',
    });

    this.loginSuccess.emit(this.profileStore);
  }
}
