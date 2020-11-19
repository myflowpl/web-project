import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.dialog.html',
  styleUrls: ['./auth.dialog.scss']
})
export class AuthDialog implements OnInit {

  loginForm = this.fb.group({
    email: ['piotr@myflow.pl', [Validators.required, Validators.email]],
    password: ['12345', [Validators.required]],
  })

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private dialogRef: MatDialogRef<AuthDialog>
  ) { }

  ngOnInit(): void {

  }

  onCancel() {
    this.dialogRef.close(null);
  }

  onLogin() {
    const credentials = this.loginForm.getRawValue();

    this.userService.login(credentials).subscribe(user => {

      this.dialogRef.close(user);
    }, err => {

    })

  }
}
