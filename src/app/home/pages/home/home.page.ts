import { Component, OnInit } from '@angular/core';
import { Role } from '../../../api/api.models';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  Role = Role;

  constructor() { }

  ngOnInit(): void {
  }

}
