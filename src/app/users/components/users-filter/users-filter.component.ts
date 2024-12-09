import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { UsersFacade } from '@data-access/users.facade';

@Component({
  selector: 'app-users-filter',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './users-filter.component.html',
  styleUrl: './users-filter.component.scss',
})
export class UsersFilterComponent {
  form: FormGroup;
  data: string = '';
  usersFacade = inject(UsersFacade);

  constructor() {
    this.form = new FormGroup({
      filter: new FormControl('', [Validators.required]),
    });

    this.form
      .get('filter')
      ?.valueChanges.subscribe((value) => this.usersFacade.updateFilter(value));
  }

  search() {
    this.data = this.form.get('filter')?.value;
  }
}
