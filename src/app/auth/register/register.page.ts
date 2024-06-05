import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthStore } from '../auth.store';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.page.html',
  styleUrl: './register.page.scss'
})
export class RegisterPage {

  fb = inject(NonNullableFormBuilder);
  store = inject(AuthStore);

  form = this.fb.group({
    email: ['piotr@myflow.pl', [Validators.required, Validators.email], []],
    password: ['!@#$', [Validators.minLength(3), Validators.required]],
  });

  onSubmit() {
    console.log(this.form.value);
  }

}
