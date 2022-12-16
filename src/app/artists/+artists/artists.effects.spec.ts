import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { ArtistsEffects } from './artists.effects';

describe('ArtistsEffects', () => {
  let actions$: Observable<any>;
  let effects: ArtistsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ArtistsEffects, provideMockActions(() => actions$)],
    });

    effects = TestBed.inject(ArtistsEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
