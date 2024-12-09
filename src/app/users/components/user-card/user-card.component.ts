import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';

import { User } from '@interfaces/users-interface';
import { MatDialog } from '@angular/material/dialog';
import { EditUserDialogComponent } from '@components/edit-user-dialog/edit-user-dialog.component';

@Component({
  selector: 'app-user-card',
  standalone: true,
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})
export class UserCardComponent implements OnInit {
  //interaction with user-list.component.ts
  @Input() user!: User;
  @Output() deleteUserWrap: EventEmitter<any> = new EventEmitter();
  //angular material
  @Output()
  patchUserWrap: EventEmitter<any> = new EventEmitter();
  @Output()
  createUserWrap: EventEmitter<any> = new EventEmitter();
  readonly dialog: MatDialog = inject(MatDialog);

  constructor() {}
  ngOnInit() {}

  OnDeleteUser(): void {
    this.deleteUserWrap.emit();
  }

  // angular material
  /**
   * переменная parentCall нужна для того чтобы при открытии модального окна из user-list.component (create user)
   * была отключена возможность переключать режим редактировать\создать
   * */
  openDialog(isEditLocal: boolean, parentCall: boolean): void {
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      data: { user: this.user, isEdit: isEditLocal, parentCall: parentCall },
    });

    dialogRef.afterClosed().subscribe((result): void => {
      if (!result) {
        return;
      }

      if (dialogRef.componentInstance.isEdit) {
        this.patchUserWrap.emit(result);
      } else {
        this.createUserWrap.emit(result);
      }
    });
  }
}
