import { Component, OnInit } from '@angular/core';
import { User } from '../../../api/api.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.page.html',
  styleUrls: ['./user-list.page.scss']
})
export class UserListPage implements OnInit {

  title = 'Users';

  today = new Date();

  users: User[] = [
    {id: 1, name: 'Piotr', email: 'piotr@myflow.pl'},
    {id: 2, name: 'Pawel', email: 'pawel@myflow.pl'},
    {id: 3, name: 'Justyna', email: 'justyna@myflow.pl'},
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
