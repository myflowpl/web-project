import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.dialog.html',
  styleUrls: ['./sign-in.dialog.scss']
})
export class SignInDialog implements OnInit {

  form = this.fb.group({
    email: ['piotr@myflow.pl', [Validators.required]],
    password: ['1234', [Validators.required, Validators.minLength(4)]]
  });

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<SignInDialog>,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
  }

  onCancel() {
    this.dialogRef.close()
  }

  onSubmit() {
    this.authService.signIn(this.form.value).subscribe(
      () => this.dialogRef.close(),
      err => console.log('LOGIN ERROR', err)
    )
  }
}
