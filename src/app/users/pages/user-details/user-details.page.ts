import { Component, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Subscription, switchMap } from 'rxjs';
import { User } from '../../../api/api.model';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.page.html',
  styleUrls: ['./user-details.page.scss']
})
export class UserDetailsPage implements OnInit, OnDestroy, AfterViewInit {

  id: number | undefined;

  user: User | undefined;

  sub: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService,
  ) { }

  ngOnInit(): void {

    console.log('DETAILS INIT');

    const params$ = this.route.params

    const id$ = params$.pipe(
      map(params => parseInt(params['id'], 10))
    )

    const user$ = id$.pipe(
      switchMap(id => this.usersService.getUserById(id))
    )

    id$.subscribe(id => this.id = id);

    this.sub = user$.subscribe(user => this.user = user);

  }

  ngAfterViewInit(): void {
    console.log('DETAILS VIEW INIT')

  }

  ngOnDestroy(): void {
    console.log('DETAILS DESTROY')
    this.sub?.unsubscribe();
  }

}
