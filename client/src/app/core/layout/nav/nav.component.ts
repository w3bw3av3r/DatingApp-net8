import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AccountService } from '../../services/account.service';

export type LoginType = { username: string | null; password: string | null };

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule, BsDropdownModule],
  changeDetection: ChangeDetectionStrategy.Default,
  styleUrl: './nav.component.scss',
  template: `
    <nav class="navbar navbar-expand-md navbar-dark bg-dark mb-4">
      <div class="container">
        <a class="navbar-brand">Dating App</a>
        @if(accountService.currentUser()){
        <ul class="navbar-nav me-auto mb-2 mb-md-0">
          <li class="nav-item">
            <a class="nav-link">Matches</a>
          </li>
          <li class="nav-item">
            <a class="nav-link">Lists</a>
          </li>
          <li class="nav-item">
            <a class="nav-link">Messages</a>
          </li>
        </ul>
        <div class="dropdown" dropdown>
          <a
            class="dropdown-toggle text-light text-decoration-none"
            dropdownToggle
          >
            Welcome user
          </a>
          <div class="dropdown-menu dropdown-menu-dark" *dropdownMenu>
            <a class="dropdown-item">Edit profile</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" (click)="logout()">Logout</a>
          </div>
        </div>
        } @else {
        <form #loginForm="ngForm" (ngSubmit)="login()" class="d-flex">
          <input
            [(ngModel)]="model.username"
            name="username"
            class="form-control me-2"
            placeholder="Username"
          />
          <input
            [(ngModel)]="model.password"
            name="password"
            class="form-control me-2"
            placeholder="Password"
            type="password"
          />
          <button class="btn btn-outline-success" type="submit">Login</button>
        </form>
        }
      </div>
    </nav>
  `,
})
export class NavComponent {
  readonly accountService = inject(AccountService);
  model: LoginType = {
    username: 'joe',
    password: 'joe',
  };

  login() {
    console.log(this.model);
    this.accountService.login(this.model).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => console.log(err),
      complete: () => console.log('Request complete'),
    });
  }

  logout() {
    this.accountService.logout();
  }
}
