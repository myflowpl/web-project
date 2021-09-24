import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../reducers';
import { loadAdmins } from './+admin/admin.actions';
import { selectAdminState, selectUsers } from './+admin/admin.selectors';
import { AdminService } from './admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  displayedColumns: string[] = ['id', 'photo', 'name', 'email'];

  users$ = this.store.select(selectUsers)

  constructor(
    private adminService: AdminService,
    private store: Store<State>
  ) { }

  ngOnInit(): void {
    this.store.dispatch(loadAdmins())
  }

}
