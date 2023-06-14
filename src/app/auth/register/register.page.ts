import { Component, inject } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { AuthStore } from '../auth.store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss']
})
export class RegisterPage {

  router = inject(Router);
  store = inject(AuthStore);

  fb = inject(UntypedFormBuilder);

  form = this.fb.group({
    name: ['Piotr 2', [Validators.required, Validators.minLength(3)]],
    email: ['piotr2@myflow.pl', [Validators.required, Validators.email], []],
    password: ['!@#$', [Validators.required, Validators.minLength(4)]],
  });

  onSubmit() {
    console.log('submit', this.form.value);

    this.store.register(this.form.value).subscribe(() => {
      this.router.navigateByUrl('/auth');
    })
  }

}
