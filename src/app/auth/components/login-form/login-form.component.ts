import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { User } from '../../../api/api.model';
import { LoadingHandler } from '../../../common/loading-handler';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  providers: [LoadingHandler],
})
export class LoginFormComponent implements OnInit {
  fb = inject(UntypedFormBuilder);
  authService = inject(AuthService);

  form = this.fb.group({
    email: ['piotr2@myflow.pl', [Validators.required, Validators.email], []],
    password: ['!@#$', [Validators.required, Validators.minLength(4)], []],
  });

  saving = inject(LoadingHandler);

  @Output()
  loginSuccess = new EventEmitter<User>();

  @Output()
  loginCancel = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}

  onSubmit() {
    console.log(this.form.value);
    this.authService
      .login(this.form.value)
      .pipe(this.saving.tap())
      .subscribe({
        next: (user) => {
          console.log(user);
          this.loginSuccess.next(user);
        },
      });
  }
}
