import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import * as UserActions from './users.actions';
import { UsersApiService } from '../services/users-api.service';
import { UsersService } from '../services/users.service';

import { User } from '../interfaces/users-interface';

export const UsersEffects = createEffect(
  () => {
    const actions$ = inject(Actions);
    const userApiService = inject(UsersApiService);
    const usersService = inject(UsersService);

    return actions$.pipe(
      ofType(UserActions.setUsers),
      switchMap(() => {
        return userApiService.getUsers().pipe(
          map((users) => {
            const items: User[] =
              usersService.parseApiResponseToUserList(users);
            return UserActions.loadUsersSuccess({ users: items });
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
