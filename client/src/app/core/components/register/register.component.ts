import {
  ChangeDetectionStrategy,
  Component,
  inject,
  output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AccountService } from '../../services/account.service';
import { LoginType } from '../../layout/nav/nav.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  template: `
    <form #regsiterForm="ngForm" (ngSubmit)="register()" autocomplete="off">
      <h2 class="text-center text-primary">Sign Up</h2>
      <hr />
      <div class="mb-3 form-floating">
        <input
          name="username"
          [(ngModel)]="model.username"
          type="text"
          class="form-control"
          placeholder="Username"
        />
        <label>Username</label>
      </div>
      <div class="mb-3 form-floating">
        <input
          name="password"
          [(ngModel)]="model.password"
          type="password"
          class="form-control"
          placeholder="Password"
        />
        <label>Password</label>
      </div>
      <div class="form-group text-end">
        <button class="btn btn-success me-2" type="submit">Register</button>
        <button class="btn btn-light me-2" (click)="cancel()" type="button">
          Cancel
        </button>
      </div>
    </form>
  `,
  styleUrl: './register.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  readonly #accountService = inject(AccountService);
  cancelRegister = output<boolean>();
  model: LoginType = {
    username: null,
    password: null,
  };

  register() {
    console.log(this.model);
    this.#accountService.register(this.model).subscribe({
      next: (resp) => console.log(resp),
    });
  }

  cancel() {
    console.log('cancelled');
    this.cancelRegister.emit(true);
  }
}
