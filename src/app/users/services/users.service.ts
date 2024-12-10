import { inject, Injectable } from '@angular/core';
// import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '@interfaces/users-interface';
// import { LocalStorageService } from './local-storage.service';

type formData = {
  id: number;
  name: string;
  username: string;
  email: string;
  companyName: string;
};

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  parseFormDataToUser(formData: formData): User {
    return {
      id: formData.id ? formData.id : new Date().getTime(),
      name: formData.name,
      username: formData.username,
      email: formData.email,
      company: {
        name: formData.companyName,
      },
    };
  }
  parseApiResponseToUserList(objects: any): User[] {
    return objects.map((obj: User) => ({
      id: obj.id,
      name: obj.name,
      username: obj.username,
      email: obj.email,
      company: {
        name: obj.company.name,
        catchPhrase: obj.company.catchPhrase,
        bs: obj.company.bs,
      },
      phone: obj.phone,
      website: obj.website,
    }));
  }

  // private readonly localStorageService: LocalStorageService =
  //   inject(LocalStorageService);
  //
  // private readonly usersSubject$: BehaviorSubject<User[]> = new BehaviorSubject<
  //   User[]
  // >([]);
  // public readonly users$: Observable<User[]> =
  //   this.usersSubject$.asObservable();

  /**CRUD */
  // setUsers(users: User[]): void {
  //   this.usersSubject$.next(users);
  //   this.syncWithLocalStorage(users);
  // }
  //
  // deleteUserById(id: number): void {
  //   const users: User[] = this.usersSubject$.value.filter(
  //     (user: User): boolean => id !== user.id,
  //   );
  //   this.setUsers(users);
  // }
  //
  // addUser(user: User): void {
  //   const users: User[] = [...this.usersSubject$.value, user];
  //   this.setUsers(users);
  // }
  //
  // patchUser(userForPatch: User): void {
  //   const users: User[] = this.usersSubject$.value.map((user: User) =>
  //     user.id === userForPatch.id ? userForPatch : user,
  //   );
  //   this.setUsers(users);
  // }

  // isUserExists(formData: any, users: BehaviorSubject<User[]>): boolean {
  //   return (
  //     users.value.find(
  //       (user: User): boolean => user.email === formData.email,
  //     ) !== undefined
  //   );
  // }

  /** local storage */
  //   syncWithLocalStorage(users: User[]): void {
  //     this.localStorageService.set('users', users);
  //   }
  //
  //   loadFromLocalStorage(): void {
  //     const users: User[] = this.localStorageService.get('users') || [];
  //     this.usersSubject$.next(users);
  //     console.log('loadFromLocalStorage');
  //   }
}
