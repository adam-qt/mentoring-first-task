import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AsyncPipe, NgFor } from '@angular/common';
import { User } from '../../interfaces/users-interface';
import { UsersService } from '../../services/users.service';
import { Observable, of, take, Subscription } from 'rxjs';
import { UserCardComponent } from '../user-card/user-card.component';
import { UsersFacade } from '../../data-access/users.facade';

@Component({
  selector: 'app-users',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  standalone: true,
  imports: [NgFor, AsyncPipe, UserCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersListComponent implements OnInit {
  public readonly users$: Observable<User[]>;
  private readonly usersService: UsersService = inject(UsersService);

  //CONSTRUCTOR
  constructor(private usersFacade: UsersFacade) {
    this.users$ = this.usersFacade.getAllUsers();
  }

  ngOnInit() {
    this.usersFacade.init();
  }

  @ViewChild(UserCardComponent) child!: UserCardComponent;
  createUserButton(): void {
    this.child.openDialog(false, true);
  }

  createUser(formData: any): void {
    this.usersFacade
      .isUserExists(this.usersService.parseFormDataToUser(formData))
      .pipe(take(1))

      .subscribe((isExist) => {
        if (isExist) {
          alert('User is already exists!');
        } else {
          this.usersFacade.createUser(
            this.usersService.parseFormDataToUser(formData),
          );
        }
      });
  }

  patchUser(formData: any) {
    this.usersFacade.editUser(this.usersService.parseFormDataToUser(formData));
  }

  deleteUser(id: number) {
    this.usersFacade.deleteUserById(id);
  }
}
