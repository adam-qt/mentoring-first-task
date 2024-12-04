import { Routes } from '@angular/router';
import { UsersListComponent } from './users/components/users-list/users-list.component';

export const appRoutes: Routes = [
  {
    path: 'users',
    component: UsersListComponent,
  },
];
