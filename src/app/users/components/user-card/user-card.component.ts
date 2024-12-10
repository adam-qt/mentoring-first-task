import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { User } from '@interfaces/users-interface';
import { MatDialog } from '@angular/material/dialog';
import { EditUserDialogComponent } from '@components/edit-user-dialog/edit-user-dialog.component';

@Component({
  selector: 'app-user-card',
  standalone: true,
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})
export class UserCardComponent {
  @Input()
  public user!: User;

  @Output()
  private readonly deleteUserWrap: EventEmitter<null> = new EventEmitter();

  @Output()
  private readonly patchUserWrap: EventEmitter<FormData> = new EventEmitter();

  @Output()
  private readonly createUserWrap: EventEmitter<FormData> = new EventEmitter();

  private readonly dialog: MatDialog = inject(MatDialog);

  constructor() {}

  OnDeleteUser(): void {
    this.deleteUserWrap.emit();
  }

  openDialog(isEditLocal: boolean, parentCall: boolean): void {
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      data: { user: this.user, isEdit: isEditLocal, parentCall: parentCall },
    });

    dialogRef.afterClosed().subscribe((formData: FormData): void => {
      if (!formData) {
        return;
      }

      if (dialogRef.componentInstance.isEdit) {
        this.patchUserWrap.emit(formData);
      } else {
        this.createUserWrap.emit(formData);
      }
    });
  }
}
