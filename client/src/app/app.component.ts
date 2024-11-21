import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';

import { AccountService } from './core/services/account.service';
import { NavComponent } from './core/layout/nav/nav.component';
import { HomeComponent } from './pages/home/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavComponent, HomeComponent],
  styleUrl: './app.component.scss',
  template: `
    <app-nav />
    <ng-container>
      <app-home />
      <router-outlet />
    </ng-container>
  `,
})
export class AppComponent implements OnInit {
  http = inject(HttpClient);
  #accountService = inject(AccountService);

  title = 'Dating App';
  users: any;

  ngOnInit(): void {
    this.setCurrentUser();
  }

  setCurrentUser() {
    const userString = localStorage.getItem('user');
    if (!userString) return;
    const user = JSON.parse(userString);
    this.#accountService.currentUser.set(user);
  }

  getUsers() {
    this.http.get('https://localhost:5001/api/users').subscribe({
      next: (data) => (this.users = data),
      error: (err) => console.error(err),
      complete: () => console.info('Request completed'),
    });
  }
}
