import { inject } from "@angular/core";
import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { combineLatestWith, Observable, Subject, switchMap, takeUntil } from "rxjs";
import { FindPetsByStatusRequestParams, Pet, PetApi } from "../../api-client";

export interface Options {
  label: string;
  value: string;
}

export interface PetsState {
  status: Pet.StatusEnum,
  pets: Pet[];
  favorite: Pet[];
  selectedFavoriteId: number | null;
}

export const initialPetsState: PetsState = {
  status: Pet.StatusEnum.Available,
  pets: [],
  favorite: [],
  selectedFavoriteId: null,
}

export class PetsStore extends ComponentStore<PetsState> {
  petApi = inject(PetApi);

  status$ = this.select(state => state.status);
  pets$ = this.select(state => state.pets);
  favorite$ = this.select(state => state.favorite);
  selectedFavorite$ = this.select(state => state.selectedFavoriteId);

  statusOptions: Options[] = Object.entries(Pet.StatusEnum).map(
    ([label, value]) => ({
      label,
      value,
    })
  )

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
