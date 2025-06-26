import { Component, inject, Input, input, output } from '@angular/core';
import { ReactiveFormsModule, UntypedFormBuilder } from '@angular/forms';
import { User } from '@web/api-client';

@Component({
  selector: 'app-login-form',
  imports: [ReactiveFormsModule],
  templateUrl: './login-form.html',
  styleUrl: './login-form.scss'
})
export class LoginFormComponent {

  message = input();

  loginSuccess = output<User>();

  // store = inject(ProfileStore);

  form = inject(UntypedFormBuilder).group({
    email: ['user@example.com'],
    password: ['password'],
  })

  constructor(
  ) {
    
  }

  handleSubmit() {
    if(this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    
    this.loginSuccess.emit(this.form.value)

    // this.store.login(this.form.value).subscribe(
    //   (res) => this.loginSuccess.emit(res.user)
    // );

  }
}
