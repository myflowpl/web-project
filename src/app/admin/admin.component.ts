import { Component, OnInit } from '@angular/core';
import { AdminService } from './admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  displayedColumns: string[] = ['id', 'photo', 'name', 'email'];

  users$ = this.adminService.getUsers()

  constructor(
    private adminService: AdminService,
  ) { }

  ngOnInit(): void {
  }

}
