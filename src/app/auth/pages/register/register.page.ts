import { Component, inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription, tap } from 'rxjs';
import { LoadingHandler } from '../../../common/loading-handler';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  providers: [LoadingHandler],
})
export class RegisterPage implements OnInit {
  sub = new Subscription();
  router = inject(Router);
  fb = inject(UntypedFormBuilder);
  authService = inject(AuthService);

  form = this.fb.group({
    name: ['Piotr', [Validators.required], []],
    email: ['piotr@myflow.pl', [Validators.required, Validators.email], []],
    password: ['!@#$', [Validators.required, Validators.minLength(4)], []],
  });

  saving = inject(LoadingHandler);

  ngOnInit(): void {}

  onSubmit() {
    console.log(this.form.value);
    this.sub = this.authService
      .register(this.form.value)
      .pipe(this.saving.tap())
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigateByUrl('/login');
        },
      });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
