import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, UntypedFormBuilder } from '@angular/forms';
import { ProfileStore } from '../profile.store';

@Component({
  selector: 'app-login-form',
  imports: [ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {

  store = inject(ProfileStore);

  form = inject(UntypedFormBuilder).group({
    email: ['piotr@myflow.pl'],
    password: ['!@#$'],
  })

  handleSubmit() {
    if(this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.store.login(this.form.value).subscribe(

    );

  }
}
