import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GET_USERS_ENDPOINT } from '@constants/endpoints';
import { User } from '@interfaces/types';
import { map } from 'rxjs/operators';
@Injectable({ providedIn: 'root' })
export class HttpClientService {
  public readonly httpClient: HttpClient = inject(HttpClient);

  getUsers(): Observable<User[]> {
    return this.httpClient
      .get(GET_USERS_ENDPOINT)
      .pipe(map((res: Object): User[] => res as User[]));
  }
}
