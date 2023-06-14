import { Component, inject } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthStore } from '../auth.store';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage {

  router = inject(Router);
  store = inject(AuthStore);

  fb = inject(UntypedFormBuilder);

  form = this.fb.group({
    email: ['piotr2@myflow.pl', [Validators.required, Validators.email], []],
    password: ['!@#$', [Validators.required, Validators.minLength(4)]],
  });

  onSubmit() {
    console.log('submit', this.form.value);

    this.store.login(this.form.value).subscribe(() => {
      this.router.navigateByUrl('/');
    })
  }
}
