import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Role } from '../../../api/api.model';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  form = this.fb.group({
    name: ['piotr', [Validators.required], []],
    email: ['piotr@myflow.pl', [Validators.required, Validators.email], []],
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
  }

}
