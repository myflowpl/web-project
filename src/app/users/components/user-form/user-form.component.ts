import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Role, User } from '../../../api/api.model';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  @Output()
  success = new EventEmitter<User>()

  @Output()
  cancel = new EventEmitter<void>()

  error = '';

  form = this.fb.group({
    name: ['piotr', [Validators.required], []],
    email: ['piotr@myflow.pl', [Validators.required, Validators.email], []],
    password: ['!@#$', [Validators.required, Validators.minLength(4)], []],
    role: [Role.USER, [Validators.required], []]
  });

  roles = Object.values(Role).map((role) => ({
    label: role.toUpperCase(),
    value: role,
  }))

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
  ) { }

  ngOnInit(): void {
    // console.log('ENUM', Role)
  }

  onSubmit() {
    console.log('ON SUBMIT', this.form.value)
    this.error = '';
    this.usersService.create(this.form.value as any).subscribe({
      next: res => {
        console.log('SUCCESS', res);
        this.success.emit(res.user);
      },
      error: error => {
        console.log('ERROR', error)
        this.error = error.error;
      }
    })
  }

  validateEmail() {}

}
