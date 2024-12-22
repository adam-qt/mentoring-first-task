import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { of, switchMap } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import * as UserActions from './users.actions';
import { HttpClientService } from '@services/httpClientService';

export const UsersEffects = createEffect(
  () => {
    const actions$ = inject(Actions);
    const httpClientService = inject(HttpClientService);

    return actions$.pipe(
      ofType(UserActions.setUsers),
      switchMap(() => {
        return httpClientService.getUsers().pipe(
          map((users) => {
            return UserActions.loadUsersSuccess({ users: users });
          }),
          catchError((error) =>
            of(UserActions.loadUsersFailure({ error: error.message })),
          ),
        );
      }),
    );
  },
  { functional: true },
);
