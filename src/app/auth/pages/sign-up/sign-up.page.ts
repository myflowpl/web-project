import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss']
})
export class SignUpPage implements OnInit {

  form = this.fb.group({
    name: ['Jarek', [Validators.required], []],
    email: ['jarek@myflow.pl', [Validators.required, Validators.email], []],
    password: ['1234', [Validators.required, Validators.minLength(3)], []],
  })

  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  onSignUp() {
    this.authService.signUp(this.form.value).subscribe(profile => {

    });
  }
}
