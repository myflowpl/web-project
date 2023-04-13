import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, UntypedFormBuilder, Validators } from '@angular/forms';
import { AuthStore } from '../auth.store';
import { UserCreateDto } from '@asseco/api-client';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.css'],
  providers: [AuthStore],
})
export class RegisterPage {

  private fb = inject(NonNullableFormBuilder);

  store = inject(AuthStore);

  error$ = this.store.error$;

  form = this.fb.group({
    name: ['Piotr', [Validators.required], []],
    email: ['piotr@myflow.pl', [Validators.required, Validators.email], []],
    password: ['!@#$', [Validators.required, Validators.minLength(4)], []],
  });

  submit() {
    console.log(this.form.value);
    this.store.register(this.form.value as UserCreateDto);
  }
}
