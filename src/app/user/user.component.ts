import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  providers: []
})
export class UserComponent implements OnInit {

  users$ = this.userService.getUsers();

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit(): void {
  }

}