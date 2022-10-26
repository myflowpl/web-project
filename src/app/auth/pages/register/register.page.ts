import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators, FormBuilder, FormControl } from '@angular/forms';
import { UsersService } from '../../../users/services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss']
})
export class RegisterPage implements OnInit {

  error = '';

  form = this.fb.group({
    name: ['', [Validators.required], []],
    email: ['', {
      validators: [Validators.required, Validators.email],
      updateOn: 'change'
    }],
    password: ['', [Validators.required, Validators.minLength(4)], []],
  });

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
  ) { }

  ngOnInit(): void {
    // console.log('ENUM', Role)
  }

  onSubmit() {
    console.log('ON SUBMIT', this.form.value)

    const user = this.form.value;

    this.error = '';

      this.usersService.register(user as any).pipe(
      ).subscribe({
        next: (user) => {
          console.log('SUCCESS', user);
        },
        error: (error) => {
          console.log('ERROR', error)
          this.error = error.error;
        }
      })

  }

}
