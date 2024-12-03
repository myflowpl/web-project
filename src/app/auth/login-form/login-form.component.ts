import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  imports: [ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {

  form = inject(FormBuilder).group({
    email: ['piotr@myflow.pl', [Validators.email], []],
    password: ['!@#$', [Validators.minLength(3)], []]
  });
}
