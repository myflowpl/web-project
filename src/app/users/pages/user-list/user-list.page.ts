import { Component, OnInit } from '@angular/core';
import { Observable, share } from 'rxjs';
import { User } from '../../../api/api.model';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.page.html',
  styleUrls: ['./user-list.page.scss'],
  // providers: [UsersService],
})
export class UserListPage implements OnInit {

  title = 'Users';

  today = new Date();

  users$: Observable<User[]> | undefined;

  constructor(
    private usersService: UsersService,
  ) { }

  ngOnInit(): void {
    this.users$ = this.usersService.getUsers().pipe(
      share(),
    )
  }

}
