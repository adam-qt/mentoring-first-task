import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable({providedIn: "root"})
export class UsersApiService{
  readonly apiClient: HttpClient =  inject(HttpClient);
  private readonly usersEndpoint: string = "https://jsonplaceholder.typicode.com/users"

  getUsers(){
    return this.apiClient.get(this.usersEndpoint)
  }
}
