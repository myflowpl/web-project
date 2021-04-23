import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss']
})
export class SignUpPage implements OnInit {

  public signUpForm = this.fb.group({
    name: ['Piotr', Validators.required],
    email: ['piotr@myflow.pl', [Validators.required, Validators.email], []],
    password: ['!@#$', [Validators.required, Validators.minLength(4)]],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
  ) { }

  ngOnInit() /*: void*/ {
  }

  onSignUp() {
    this.authService.signUp(this.signUpForm.value).subscribe(
      (profile) => {
        console.log(profile);
      },
      err => {
        console.error(err.error);
      }
    )
  }
}
