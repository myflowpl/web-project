import { signalStore, withComputed, withHooks, withState } from '@ngrx/signals';
import { Pet } from '../api-client';
import { computed } from '@angular/core';

export type Status = 'sold' | 'available' | 'pending'

type PetsState = {
  pets: Pet[];
  isLoading: boolean;
  status: Status;
  error: any | null;
  filters: {dir: string, sort: string}
};

const initialState: PetsState = {
  pets: [],
  isLoading: false,
  status: 'available',
  error: null,
  filters: {dir: 'asc', sort: 'name'}
};

export const PetsStore = signalStore(
    // { providedIn: 'root' },
    withState(initialState),
    withComputed((store) => ({
        title: computed(() => {
            const status = store.status();
            const count = store.pets().length;
        
            return `Znaleziono ${count} ${status} zwierzakow`;
          }),
    })),
    withHooks({
        onInit(store) {
            console.log('INIT PET STORE');
        },
        onDestroy(store) {
            console.log('DESTROY PET STORE');
        },
    })
);


type PetsStore = InstanceType<typeof PetsStore>;

// function createTitle(store: PetsStore) {

//     return computed(() => {
//         const status = store.status();
//         const count = store.pets().length;
    
//         return `Znaleziono ${count} ${status} zwierzakow`
//       });
// }
