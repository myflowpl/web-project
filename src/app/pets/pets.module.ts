import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PetsRoutingModule } from './pets-routing.module';
import { PetsComponent } from './pets.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromPets from './+state/pets.reducer';
import { PetsEffects } from './+state/pets.effects';
import { PetsFacade } from './+state/pets.facade';


@NgModule({
  declarations: [
    PetsComponent
  ],
  imports: [
    CommonModule,
    PetsRoutingModule,
    StoreModule.forFeature(fromPets.PETS_FEATURE_KEY, fromPets.petsReducer),
    EffectsModule.forFeature([PetsEffects])
  ],
  providers: [PetsFacade]
})
export class PetsModule { }
