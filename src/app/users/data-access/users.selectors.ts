import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './users.reducer';
import { User } from '@interfaces/users-interface';

export const selectUserState = createFeatureSelector<UserState>('users');

export const selectAllUsers = createSelector(
  selectUserState,
  (state: UserState): User[] => {
    if (state.filter !== null) {
      let fWord: string = state.filter.toLowerCase();
      return state.users.filter(
        (user: User): boolean =>
          user.name.toLowerCase().includes(fWord) ||
          user.email.toLowerCase().includes(fWord) ||
          user.username.toLowerCase().includes(fWord),
      );
    } else {
      return state.users;
    }
  },
);

export const isUserExistsSelector = (user: User) =>
  createSelector(
    selectAllUsers,
    (users: User[]): boolean =>
      users.find(
        (existingUser: User): boolean => existingUser.email === user.email,
      ) !== undefined,
  );
