import { Component, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, map, Observable, startWith, Subject, Subscription, switchMap, takeUntil, tap } from 'rxjs';
import { User } from '../../../api/api.model';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.page.html',
  styleUrls: ['./user-details.page.scss']
})
export class UserDetailsPage implements OnInit, OnDestroy, AfterViewInit {

  isEdit = false;

  id$: Observable<number> | undefined;

  user$: Observable<User | undefined> | undefined;

  // sub: Subscription | undefined;
  subs = new Subscription();

  destroy$ = new Subject();

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService,
    private router: Router,
  ) { }

  ngOnInit(): void {

    console.log('DETAILS INIT');

    const params$ = this.route.params

    const id$ = params$.pipe(
      map(params => parseInt(params['id'], 10))
    )

    const user$ = id$.pipe(

      switchMap(
        id => this.usersService.getUserById(id).pipe(
          startWith(undefined),
          // tap({
          //   subscribe: () => console.log(),
          //   finalize: () => console.log(),
          // }),
        )
      ),

      // takeUntil(this.destroy$)
    )

    this.id$ = id$;
    this.user$ = user$;

    // const sub = id$.subscribe(id => console.log('ID', id));
    // this.subs.add(sub);
    // const sub2 = id$.subscribe(id => console.log('ID', id));
    // this.subs.add(sub2);

    // user$.subscribe(user => this.user = user);

  }

  handleUserClose(event: any) {
    console.log('HANDLE handleUserClose()', event)
    this.router.navigate(['..'], {relativeTo: this.route});
  }

  handleDelete(user: User) {

  }

  handleEdit(user: User) {
    this.isEdit = true;
  }

  ngAfterViewInit(): void {
    console.log('DETAILS VIEW INIT')

  }

  ngOnDestroy(): void {
    console.log('DETAILS DESTROY')
    // this.sub?.unsubscribe();
    this.subs.unsubscribe();
    this.destroy$.next(true);
    this.destroy$.complete();
  }

}
