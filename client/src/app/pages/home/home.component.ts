import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RegisterComponent } from '../../core/components/register/register.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RegisterComponent],
  template: `
    <div class="container mt-5">
      <div class="text-center">
        @if (!registerMode) {
        <h1>Find your match</h1>
        <p class="lead">
          Come on in to view your matches... all you need to do is sign up!
        </p>
        <div class="text-center">
          <button
            (click)="registerToggle()"
            class="btn btn-primary btn-md me-2"
          >
            Register
          </button>
          <button class="btn btn-info btn-md me-2">Learn more</button>
        </div>
        } @else {
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-md-4">
              <app-register (cancelRegister)="cancelRegisterMode($event)" />
            </div>
          </div>
        </div>
        }
      </div>
    </div>
  `,
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  registerMode = false;

  registerToggle() {
    this.registerMode = !this.registerMode;
  }

  cancelRegisterMode(event: boolean) {
    console.info(event);
    this.registerMode = !event;
  }
}
