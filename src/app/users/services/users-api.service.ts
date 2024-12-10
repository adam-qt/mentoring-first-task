import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GET_USERS_ENDPOINT } from '@constants/endpoints';

@Injectable({ providedIn: 'root' })
export class UsersApiService {
  public readonly apiClient: HttpClient = inject(HttpClient);

  getUsers(): Observable<Object> {
    return this.apiClient.get(GET_USERS_ENDPOINT);
  }
}
