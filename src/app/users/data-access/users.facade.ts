import { select, Store } from '@ngrx/store';
import * as UserActions from './users.actions';
import { UserState } from './users.reducer';
import * as UsersSelectors from './users.selectors';
import { Observable } from 'rxjs';
import { User } from '@interfaces/users-interface';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UsersFacade {
  constructor(private store: Store<UserState>) {}

  getAllUsers(): Observable<User[]> {
    return this.store.pipe(select(UsersSelectors.selectAllUsers));
  }

  init() {
    this.store.dispatch(UserActions.setUsers());
  }

  deleteUserById(id: number) {
    this.store.dispatch(UserActions.deleteUserById({ id: id }));
  }

  createUser(user: User) {
    this.store.dispatch(UserActions.addUser({ user: user }));
  }

  editUser(user: User) {
    this.store.dispatch(UserActions.editUser({ editUser: user }));
  }

  isUserExists(user: User) {
    return this.store.select(UsersSelectors.isUserExistsSelector(user));
  }

  updateFilter(filter: string) {
    this.store.dispatch(UserActions.updateFilter({ filter: filter }));
  }
  getFilter() {
    return this.store.pipe(select(UsersSelectors.selectFilter));
  }
}
