import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AsyncPipe, NgFor } from '@angular/common';
import { User } from '@interfaces/types';

import { Observable, take } from 'rxjs';
import { UserCardComponent } from '@components/user-card/user-card.component';
import { UsersFacade } from '@data-access/users.facade';
import { UsersFilterComponent } from '@components/users-filter/users-filter.component';

@Component({
  selector: 'app-users',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  standalone: true,
  imports: [NgFor, AsyncPipe, UserCardComponent, UsersFilterComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersListComponent implements OnInit {
  public readonly users$: Observable<User[]>;

  private readonly usersFacade: UsersFacade = inject(UsersFacade);
  constructor() {
    this.users$ = this.usersFacade.getAllUsers();
  }

  ngOnInit(): void {
    this.usersFacade.init();
  }

  @ViewChild(UserCardComponent) child!: UserCardComponent;
  createUserButton(): void {
    this.child.openDialog(false, true);
  }

  createUser(user: User): void {
    this.usersFacade
      .isUserExists(user)
      .pipe(take(1))
      .subscribe((isExist) => {
        if (isExist) {
          alert('User is already exists!');
        } else {
          this.usersFacade.createUser(user);
        }
      });
  }

  patchUser(user: User) {
    this.usersFacade.editUser(user);
  }

  deleteUser(id: number) {
    this.usersFacade.deleteUserById(id);
  }
}
