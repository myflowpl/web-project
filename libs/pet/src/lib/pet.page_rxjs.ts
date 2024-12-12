import { Component, DestroyRef, inject, Injectable, OnDestroy } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AsyncPipe, JsonPipe, NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Pet, PetApi } from '@web/api-client';
import { BehaviorSubject, combineLatest, map, startWith, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { PetStatus } from './pet.model';
import { injectLoader, injectQueryParam$ } from './utils';

@Injectable()
class TestApi {}

@Component({
  selector: 'lib-pet',
  imports: [AsyncPipe, RouterLink, NgIf],
  templateUrl: './pet.page_rxjs.html',
  providers: [
    TestApi,
  ],
})
export class PetPage {
  testApi = inject(TestApi);

  destroyRef = inject(DestroyRef);

  
  petApi = inject(PetApi);
  
  loader = injectLoader();
  
  reload$ = new BehaviorSubject<any>(true);
  
  status$ = injectQueryParam$<PetStatus>('status', 'available');
  
  // route = inject(ActivatedRoute);
  // status$ = this.route.queryParams.pipe(
  //   map(params => (params['status'] || 'available') as PetStatus),
  // );

  pets$ = combineLatest([this.status$, this.reload$]).pipe(
    switchMap(
      ([status]) => this.petApi.findPetsByStatus({
        status: [status],
      }).pipe(
        this.loader.tap()
      )
    ),
    map(response => response),
    takeUntilDestroyed(this.destroyRef),
  );

  pets: Pet[] = [];

  constructor() {
    this.pets$.subscribe(pets => this.pets = pets)
  }


  // ngOnDestroy(): void {
  //     // this.sub.unsubscribe();
  //     this.destroy$.next(true);
  // }

}

class User {
  name: string = 'Piotr';

  getName() {
    return this.name;
  }

  constructor(name: string) {
    // async operation
    this.name = 'Piotr po zmianie: '+name
  }
}


const user = new User('costam');
const user2 = new User('costam');

class Admin extends User {

  adminName = '';

  constructor() {
    super('jakostam')
  }

}

const admin = new Admin();
const admin2 = new Admin();