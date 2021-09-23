import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss']
})
export class SignUpPage implements OnInit {

  form = this.fb.group({
    name: ['Jarek', [Validators.required], []],
    email: ['jarek@myflow.pl', [Validators.required, Validators.email], [this.checkIfValidEmail()]],
    password: ['1234', [Validators.required, Validators.minLength(4)], []],
  })

  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  checkIfValidEmail() {

    return (input: FormControl) => {
      return this.authService.isValidEmail(input.value).pipe(
        map(valid => valid ? null : ({taken: true}))
      );
    }
  }

  onSignUp() {

    this.authService.signUp(this.form.value).subscribe(profile => {
      this.router.navigate(['/'])
    });
  }
}
