import { createReducer, on } from '@ngrx/store';
import { User } from '../interfaces/users-interface';
import * as UserActions from './users.actions';

export interface UserState {
  users: User[];
  error: string | null;
}

export const initialState: UserState = {
  users: [],
  error: null,
};

export const userReducer = createReducer<UserState>(
  initialState,
  on(UserActions.loadUsersSuccess, (state, { users }) => ({
    ...state,
    users: users,
  })),
  on(UserActions.addUser, (state, { user }) => ({
    ...state,
    users: [...state.users, user],
  })),
  on(UserActions.deleteUserById, (state, { id }) => ({
    ...state,
    users: state.users.filter((user) => user.id !== id),
  })),
  on(UserActions.editUser, (state, { editUser }) => ({
    ...state,
    users: state.users.map((user) =>
      user.id === editUser.id ? editUser : user,
    ),
  })),
);
