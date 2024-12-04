import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AsyncPipe, NgFor } from '@angular/common';
import { UsersApiService } from '../../services/users-api.service';
import { User } from '../../interfaces/users-interface';
import { UsersService } from '../../services/users.service';
import { Observable } from 'rxjs';
import { UserCardComponent } from '../user-card/user-card.component';

import { emit } from '@angular-devkit/build-angular/src/tools/esbuild/angular/compilation/parallel-worker';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-users',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  standalone: true,
  imports: [NgFor, AsyncPipe, UserCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersListComponent implements OnInit {
  private readonly usersService: UsersService = inject(UsersService);
  public readonly users$: Observable<User[]> = this.usersService.users$;
  private readonly localStorageService: LocalStorageService =
    inject(LocalStorageService);
  private readonly usersApiService: UsersApiService = inject(UsersApiService);

  constructor() {}

  ngOnInit() {
    const localUsers: User[] = this.localStorageService.get('users');
    if (localUsers && localUsers.length > 0) {
      this.usersService.loadFromLocalStorage();
    } else {
      this.usersApiService.getUsers().subscribe((response: any) => {
        this.usersService.setUsers(response);
      });
    }
  }

  @ViewChild(UserCardComponent) child!: UserCardComponent;
  createUserButton(): void {
    this.child.openDialog(false, true);
  }

  createUser(formData: any) {
    if (!this.usersService.isUserExists(formData)) {
      this.usersService.addUser(
        this.usersService.parseFormDataToUser(formData),
      );
    } else {
      alert('User is already exists!');
    }
  }

  patchUser(formData: any) {
    this.usersService.patchUser(
      this.usersService.parseFormDataToUser(formData),
    );
  }

  deleteUser(id: number) {
    this.usersService.deleteUserById(id);
  }
}
