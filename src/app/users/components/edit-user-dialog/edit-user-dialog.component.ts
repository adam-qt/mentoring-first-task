import { Component, inject, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgIf } from '@angular/common';
import { dialogVM } from '@interfaces/types';

@Component({
  selector: 'app-edit-user-dialog',
  standalone: true,
  imports: [FormsModule, NgIf, ReactiveFormsModule],
  templateUrl: './edit-user-dialog.component.html',
  styleUrl: './edit-user-dialog.component.scss',
})
export class EditUserDialogComponent {
  public readonly form: FormGroup;
  public isEdit: boolean;
  public parentCall: boolean;
  private formBuilder: FormBuilder = inject(FormBuilder);

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: dialogVM,
    public dialogRef: MatDialogRef<EditUserDialogComponent>,
  ) {
    this.parentCall = data.parentCall;
    this.isEdit = this.data.isEdit;
    this.form = this.formBuilder.group({
      name: [
        this.isEdit ? this.data.user.name : '',
        [Validators.required, Validators.minLength(3)],
      ],
      username: [
        this.isEdit ? this.data.user.username : '',
        [Validators.required, Validators.minLength(3)],
      ],
      email: [
        this.isEdit ? this.data.user.email : '',
        [Validators.required, Validators.email],
      ],
      company: this.formBuilder.group({
        name: [
          this.isEdit ? this.data.user.company.name : '',
          [Validators.required, Validators.minLength(3)],
        ],
      }),
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
        company: {
          name: this.data.user.company.name || '',
        },
        email: this.data.user.email || '',
      });
    }
  }

  closeDialog() {
    if (this.form.valid) {
      const user = {
        ...this.form.value,
        id: this.dialogRef.componentInstance.isEdit
          ? this.data.user.id
          : new Date().getTime(),
      };
      this.dialogRef.close(user);
    } else {
      prompt('form is invalid');
    }
  }
}
