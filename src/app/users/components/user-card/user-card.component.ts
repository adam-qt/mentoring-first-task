import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';

import { User } from '../../interfaces/users-interface';
import { MatDialog } from '@angular/material/dialog';
import { EditUserDialogComponent } from '../edit-user-dialog/edit-user-dialog.component';

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
  @Output() patchUserWrap: EventEmitter<any> = new EventEmitter();
  readonly dialog: MatDialog = inject(MatDialog);
  @Output()
  createUserWrap: EventEmitter<any> = new EventEmitter();

  constructor() {}
  ngOnInit() {}

  OnDeleteUser(): void {
    this.deleteUserWrap.emit();
  }

  // angular material

  openDialog(isEditLocal: boolean, parentCall: boolean): void {
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      data: { user: this.user, isEdit: isEditLocal, parentCall: parentCall },
    });

    dialogRef.afterClosed().subscribe((result): void => {
      if (!result) {
        return;
      }
      console.log(dialogRef.componentInstance.isEdit);
      if (dialogRef.componentInstance.isEdit) {
        this.patchUserWrap.emit(result);
      } else {
        this.createUserWrap.emit(result);
      }
    });
  }
}
