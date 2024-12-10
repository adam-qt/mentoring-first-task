import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogClose,
  MatDialogRef,
} from '@angular/material/dialog';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgIf } from '@angular/common';
import { User } from '@interfaces/users-interface';

type transferredData = {
  user: User;
  isEdit: boolean;
  parentCall: boolean;
};

@Component({
  selector: 'app-edit-user-dialog',
  standalone: true,
  imports: [FormsModule, NgIf, ReactiveFormsModule, MatDialogClose],
  templateUrl: './edit-user-dialog.component.html',
  styleUrl: './edit-user-dialog.component.scss',
})
export class EditUserDialogComponent {
  public readonly form: FormGroup;
  public isEdit: boolean;
  public parentCall: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: transferredData,
    public dialogRef: MatDialogRef<EditUserDialogComponent>,
  ) {
    this.parentCall = data.parentCall;
    this.isEdit = this.data.isEdit;

    this.form = new FormGroup({
      name: new FormControl(this.isEdit ? this.data.user.name : '', [
        Validators.required,
        Validators.minLength(3),
      ]),
      username: new FormControl(this.isEdit ? this.data.user.username : '', [
        Validators.required,
        Validators.minLength(3),
      ]),
      companyName: new FormControl(
        this.isEdit ? this.data.user.company.name : '',
        [Validators.required, Validators.minLength(3)],
      ),
      email: new FormControl(this.isEdit ? this.data.user.email : '', [
        Validators.required,
        Validators.email,
      ]),
    });
  }

  editToggle(): void {
    this.isEdit = !this.isEdit;
    if (!this.isEdit) {
      this.form.reset();
    } else {
      this.form.patchValue({
        name: this.data.user.name || '',
        username: this.data.user.username || '',
        companyName: this.data.user.company.name || '',
        email: this.data.user.email || '',
      });
    }
  }

  get userWithUpdatedFields(): User {
    return {
      ...this.form.value,
      id: this.dialogRef.componentInstance.isEdit
        ? this.data.user.id
        : new Date().getTime(),
    };
  }
}
