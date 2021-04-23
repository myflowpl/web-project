import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.dialog.html',
  styleUrls: ['./sign-in.dialog.scss']
})
export class SignInDialog implements OnInit {

  form = this.fb.group({
    email: ['piotr@myflow.pl', [Validators.required, Validators.email]],
    password: ['!@#$', [Validators.required, Validators.minLength(4)]],
  });

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<SignInDialog>,
    private authService: AuthService,
  ) {
    if(!environment.production) {
      this.form.patchValue({
        email: 'piotr@myflow.pl',
        password: '!@#$'
      })
    }
  }

  ngOnInit(): void {
  }

  onSignIn() {
    this.authService.signIn(this.form.value).subscribe(profile => {
      this.dialogRef.close(profile);
    }, err => {
      console.error(err);
    })
  }

  onClose() {
    this.dialogRef.close(null);
  }
}
