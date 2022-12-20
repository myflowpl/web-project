import { inject } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { combineLatestWith, distinctUntilChanged, EMPTY, map, Observable, Subject, switchMap, takeUntil } from "rxjs";
import { Pet, PetApi } from "../../api-client";

export interface Options {
  label: string;
  value: string;
}

export interface PetsState {
  status: Pet.StatusEnum,
  pets: Pet[];
  activePet: Pet | null;
  favorite: Pet[];
  selectedFavoriteId: number | null;
}

export const initialPetsState: PetsState = {
  status: Pet.StatusEnum.Pending,
  pets: [],
  activePet: null,
  favorite: [],
  selectedFavoriteId: null,
}

export class PetsStore extends ComponentStore<PetsState> {
  petApi = inject(PetApi);
  router = inject(Router);
  route = inject(ActivatedRoute);

  status$ = this.select(state => state.status);
  pets$ = this.select(state => state.pets);
  activePet$ = this.select(state => state.activePet);
  favorite$ = this.select(state => state.favorite);
  selectedFavorite$ = this.select(state => state.selectedFavoriteId);
  petId$ = this.route.queryParams.pipe(
    map(params => parseInt(params['petId']) || null),
    distinctUntilChanged(),
  )

  statusOptions: Options[] = Object.entries(Pet.StatusEnum).map(
    ([label, value]) => ({
      label,
      value,
    })
  )

  readonly loadActivePet = this.effect(() => {

    return this.petId$.pipe(
      switchMap(id => {
        if(id) {
          return this.petApi.getPetById({petId: id}).pipe(
            tapResponse(
              pet => this.patchState({activePet: pet}),
              error => console.log('ER', error)
            )
          )
        } else {
          this.patchState({activePet: null})
          return EMPTY;
        }
      }),
    );
  });

  readonly load = this.effect((in$: Observable<void>) => {
    return in$.pipe(
      combineLatestWith(this.status$),
      switchMap(([stat, status]) => this.petApi.findPetsByStatus({status: [status]}).pipe(
        tapResponse(
          pets => this.patchState({pets}),
          error => console.log('ERROR')
        )
      ))
    )
  });

  constructor() {
    super(initialPetsState);
  }

  selectPet(pet: Pet | undefined) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {petId: pet?.id || null},
      queryParamsHandling: 'merge'
    });
  }

  // addPet() {

  // }

  // load$$ = new Subject<Pet.StatusEnum>();
  // loadSub = this.load$$.pipe(
  //   switchMap(status => this.petApi.findPetsByStatus({status}))
  //   takeUntil(this.destroy$)
  // ).subscribe()
  // load2(status: any) {
  //   this.load$$.next(status);
  // }
}
