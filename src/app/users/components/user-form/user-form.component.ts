import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

  @Input()
  set user(user: User | undefined) {
    if(user) {
      this.form.patchValue(user as any);
    }
  }

  error = '';

  form = this.fb.group({
    id: [],
    name: ['', [Validators.required], []],
    email: ['', [Validators.required, Validators.email], []],
    password: ['', [Validators.required, Validators.minLength(4)], []],
    role: ['', [Validators.required], []]
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

    const user = this.form.value;

    this.error = '';

    if(user.id) {

      this.usersService.update(user as any).subscribe({
        next: (user) => {
          console.log('SUCCESS', user);
          this.success.emit(user);
        },
        error: (error) => {
          console.log('ERROR', error)
          this.error = error.error;
        }
      })

    } else {
      this.usersService.create(user as any).subscribe({
        next: (res) => {
          console.log('SUCCESS', res);
          this.success.emit(res.user);
        },
        error: (error) => {
          console.log('ERROR', error)
          this.error = error.error;
        }
      })
    }
  }

  validateEmail() {}

}
