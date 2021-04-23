import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

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
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  onSignUp() {
    if(this.signUpForm.valid) {
      console.log(this.signUpForm.value, this.signUpForm.controls.name.errors);
    }
  }
}
