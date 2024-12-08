import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './users.reducer';
import { User } from '../interfaces/users-interface';

export const selectUserState = createFeatureSelector<UserState>('users');

export const selectAllUsers = createSelector(
  selectUserState,
  (state) => state.users,
);

export const isUserExistsSelector = (user: User) =>
  createSelector(
    selectAllUsers,
    (users) =>
      users.find((existingUser) => existingUser.email === user.email) !==
      undefined,
  );
