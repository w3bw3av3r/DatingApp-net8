import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

import { LoginType } from '../layout/nav/nav.component';

export type User = {
  username: string;
  token: string;
};

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  readonly #http = inject(HttpClient);
  #baseUrl = 'https://localhost:5001/api/';
  currentUser = signal<User | null>(null);

  login(model: LoginType) {
    return this.#http.post<User>(`${this.#baseUrl}account/login`, model).pipe(
      map((user) => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUser.set(user);
        }
      })
    );
  }

  register(model: LoginType) {
    return this.#http
      .post<User>(`${this.#baseUrl}account/register`, model)
      .pipe(
        map((user) => {
          if (user) {
            localStorage.setItem('user', JSON.stringify(user));
            this.currentUser.set(user);
          }
          return user;
        })
      );
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUser.set(null);
  }
}
