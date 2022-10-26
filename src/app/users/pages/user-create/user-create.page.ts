import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../api/api.model';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.page.html',
  styleUrls: ['./user-create.page.scss']
})
export class UserCreatePage implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
  }

  handleSuccess(user: User) {
    this.router.navigate(['..', user.id], {relativeTo: this.route})
  }

  handleCancel() {
    this.router.navigate(['..'], {relativeTo: this.route})
  }
}
