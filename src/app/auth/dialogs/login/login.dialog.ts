import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActiveSubject } from '../../../shared/active.subject';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.dialog.html',
  styleUrls: ['./login.dialog.scss']
})
export class LoginDialog implements OnInit {

  loading$ = new ActiveSubject();

  form = this.fb.group({
    email: ['piotr5@myflow.pl', [Validators.required, Validators.email], []],
    password: ['!@#$', [Validators.required, Validators.minLength(4)], []],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private dialogRef: MatDialogRef<LoginDialog>
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.form.value)

    this.authService.login(this.form.value as any).pipe(
      this.loading$.tap(),
    ).subscribe({
      next: (profile) => this.dialogRef.close(profile),
      error: (error) => console.log('ERROR', error)
    })
  }

}
