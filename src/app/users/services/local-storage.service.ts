import { Injectable } from '@angular/core';
import { User } from '../interfaces/users-interface';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  public set(key: string, value: User[]): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public get(key: string): User[] {
    const value: string | null = localStorage.getItem(key);
    return value ? JSON.parse(value) : [];
  }

  public remove(key: string) {
    localStorage.removeItem(key);
  }
  public has(key: string): boolean {
    return localStorage.getItem(key) !== null;
  }
  public clear() {
    localStorage.clear();
  }
}
