import { Component, DestroyRef, inject, Injectable, OnDestroy } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AsyncPipe, JsonPipe, NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Pet, PetApi } from '@web/api-client';
import { BehaviorSubject, combineLatest, map, startWith, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { PetStatus } from './pet.model';
import { injectLoader, injectQueryParam$ } from './utils';
import { PetStore } from './pet.cstore';

@Component({
  selector: 'lib-pet',
  imports: [AsyncPipe, RouterLink, NgIf],
  templateUrl: './pet.page.html',
  styleUrl: './pet.page.scss',
  providers: [
    PetStore,
  ],
})
export class PetPage {

  status$ = injectQueryParam$<PetStatus>('status', 'available');

  store = inject(PetStore);
  
  constructor() {
    
  }

}