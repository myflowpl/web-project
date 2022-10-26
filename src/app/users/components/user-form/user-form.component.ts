import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { map, take } from 'rxjs';
import { Role, User } from '../../../api/api.model';
import { LoaderComponent } from '../../../shared/loader/loader.component';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
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

  @ViewChild('loaderCompRef')
  loader!: LoaderComponent;

  error = '';

  form = this.fb.group({
    id: [],
    name: ['', [Validators.required], []],
    email: ['', {
      validators: [Validators.required, Validators.email],
      asyncValidators: [this.checkIfValidEmail()],
      updateOn: 'change'
    }],
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

  checkIfValidEmail() {

    return (input: FormControl) => {

      return this.usersService.getUsers().pipe(
        take(1),
        map(users => users.find(user => user.email === input.value)),
        map((user) => {

          if(!user) {
            return null;
          }

          if(user && this.form.value.id && user.id === this.form.value.id) {
            return null;
          }

          return {
            taken: true,
          }
        }),
      )

    }
  }

  ngOnInit(): void {
    // console.log('ENUM', Role)
  }

  onSubmit() {
    console.log('ON SUBMIT', this.form.value)

    const user = this.form.value;

    this.error = '';

    if(user.id) {

      this.usersService.update(user as any).pipe(
        this.loader.tap(),
      ).subscribe({
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
      this.usersService.create(user as any).pipe(
        this.loader.tap(),
      ).subscribe({
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
