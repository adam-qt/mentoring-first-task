import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './users.reducer';
import { User } from '@interfaces/users-interface';

export const selectUserState = createFeatureSelector<UserState>('users');

export const selectAllUsers = createSelector(selectUserState, (state) => {
  if (state.filter !== null) {
    let fWord: string = state.filter.toLowerCase();
    return state.users.filter(
      (user) =>
        user.name.toLowerCase().includes(fWord) ||
        user.email.toLowerCase().includes(fWord) ||
        user.username.toLowerCase().includes(fWord),
    );
  } else {
    return state.users;
  }
});

export const isUserExistsSelector = (user: User) =>
  createSelector(
    selectAllUsers,
    (users) =>
      users.find((existingUser) => existingUser.email === user.email) !==
      undefined,
  );

export const selectFilter = createSelector(
  selectUserState,
  (state) => state.filter,
);
