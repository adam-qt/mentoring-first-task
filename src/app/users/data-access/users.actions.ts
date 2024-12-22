import { createAction, props } from '@ngrx/store';
import { User } from '@interfaces/types';

export const setUsers = createAction('[Users] Set users');
export const editUser = createAction(
  '[Users] Edit user',
  props<{ editUser: User }>(),
);
export const deleteUserById = createAction(
  '[Users] Delete user',
  props<{ id: number }>(),
);
export const addUser = createAction(
  '[Users] Add user',
  props<{ user: User }>(),
);

export const loadUsersSuccess = createAction(
  '[Users] Load users',
  props<{ users: User[] }>(),
);
export const loadUsersFailure = createAction(
  '[Users] Load users failure',
  props<{ error: string }>(),
);

export const updateFilter = createAction(
  '[Users] Update filter',
  props<{ filter: string }>(),
);
