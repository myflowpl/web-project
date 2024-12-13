import { Component, computed, effect, EventEmitter, inject, Input, input, Output, output } from '@angular/core';
import { ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import { ProfileStore } from './profile.store';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'lib-login-form',
  imports: [ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent {

  // oldMessage$$ = new BehaviorSubject('');
  // @Input()
  // set oldMessage(value: string) {
  //   // console .log
  //   this.oldMessage$$.next(value);
  // };

  // @Output()
  // loginError = new EventEmitter<Error>();

  message = input<string>();
  roles = input<string[]>();

  title = computed(() => `Required action for ${this.roles()?.join(', ')} details: ${this.message()}`)

  loginSuccess = output<ProfileStore>();

  profileStore = inject(ProfileStore);

  form = inject(UntypedFormBuilder).group({
    email: ['piotr@myflow.pl', [Validators.email, Validators.required], []],
    password: ['!@#$', [Validators.minLength(3), Validators.required]],
  });

  constructor() {
    effect(() => {
      console.log(this.message());
    })
  }

  handleLogin() {
    if(this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.profileStore.login(this.form.value).subscribe(profile => {
      this.loginSuccess.emit(profile);
    });
  }
}
