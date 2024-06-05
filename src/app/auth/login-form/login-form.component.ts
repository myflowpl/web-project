import { Component, inject, output } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginDto, User } from '../../api/api.model';
import { AuthStore } from '../auth.store';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {

  loginSuccess = output<User>();

  fb = inject(NonNullableFormBuilder);
  store = inject(AuthStore);

  form = this.fb.group({
    email: ['piotr2@myflow.pl', [Validators.required, Validators.email], []],
    password: ['!@#$', [Validators.minLength(3), Validators.required]],
  });

  onSubmit() {

    this.store.login(this.form.value as LoginDto).subscribe((res) => {
      this.loginSuccess.emit(res.user)
    });
  }
}
