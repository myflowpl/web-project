import { Component, EventEmitter, Output, inject } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { AuthStore } from '../auth.store';
import { User } from 'src/app/api/api.model';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {

  @Output()
  loginSuccess = new EventEmitter<User>();

  store = inject(AuthStore);

  fb = inject(UntypedFormBuilder);

  form = this.fb.group({
    email: ['piotr3@myflow.pl', [Validators.required, Validators.email], []],
    password: ['!@#$', [Validators.required, Validators.minLength(4)]],
  });

  onSubmit() {

    this.store.login(this.form.value).subscribe(() => {
      this.loginSuccess.emit(this.store.user);
    })
  }
}
