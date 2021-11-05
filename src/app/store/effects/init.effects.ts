import { Injectable } from '@angular/core';
import {
  Actions,
  createEffect,
  ofType,
  ROOT_EFFECTS_INIT,
} from '@ngrx/effects';
import { map } from 'rxjs/operators';
import * as CountryActions from '../actions/country.actions';
import * as UserSettingsActions from '../actions/user-settings.actions';

@Injectable()
export class InitEffects {
  // public methods
  constructor(private actions$: Actions) {}

  loadAllCountries$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ROOT_EFFECTS_INIT),
      map(() => CountryActions.load())
    );
  });

  loadTheme$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ROOT_EFFECTS_INIT),
      map(() => UserSettingsActions.loadUserSettings())
    );
  });
}
