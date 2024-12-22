import { select, Store } from '@ngrx/store';
import * as UserActions from './users.actions';
import { UserState } from './users.reducer';
import * as UsersSelectors from './users.selectors';
import { Observable } from 'rxjs';
import { User } from '@interfaces/types';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UsersFacade {
  constructor(private store: Store<UserState>) {}

  getAllUsers(): Observable<User[]> {
    return this.store.pipe(select(UsersSelectors.selectAllUsers));
  }

  init(): void {
    this.store.dispatch(UserActions.setUsers());
  }

  deleteUserById(id: number): void {
    this.store.dispatch(UserActions.deleteUserById({ id: id }));
  }

  createUser(user: User): void {
    this.store.dispatch(UserActions.addUser({ user: user }));
  }

  editUser(user: User): void {
    this.store.dispatch(UserActions.editUser({ editUser: user }));
  }

  isUserExists(user: User): Observable<boolean> {
    return this.store.select(UsersSelectors.isUserExistsSelector(user));
  }

  updateFilter(filter: string): void {
    this.store.dispatch(UserActions.updateFilter({ filter: filter }));
  }
}
