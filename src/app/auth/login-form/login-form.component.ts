import { Component, effect, EventEmitter, inject, Input, input, OnChanges, Output, output, SimpleChanges } from '@angular/core';
import { ReactiveFormsModule, UntypedFormBuilder } from '@angular/forms';
import { ProfileStore } from '../profile.store';
import { User } from '../../api/api.model';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login-form',
  imports: [ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {

  // msg$$ = new BehaviorSubject('');

  // @Input()
  // set msg(value: string) {
  //   this.msg$$.next(value);
  // }
  // ngOnChanges(changes: SimpleChanges): void {
  //     console.log('changes', changes);
  // }

  // @Output()
  // success = new EventEmitter();

  message = input.required();

  loginSuccess = output<User>();

  store = inject(ProfileStore);

  form = inject(UntypedFormBuilder).group({
    email: ['jakub@myflow.pl'],
    password: ['!@#$'],
  })

  constructor(
    // private http: HttpClient
  ) {
    // new signal
    effect(() => {
      console.log(this.message());
    })
    // old rxjs
    // this.msg$$.subscribe(
    //   (v) => console.log(v)
    // )
  }

  handleSubmit() {
    if(this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.store.login(this.form.value).subscribe(
      (res) => this.loginSuccess.emit(res.user)
    );

  }
}
