import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  styleUrl: './app.component.scss',
  template: `<h1>{{ title }}</h1>
    <ul>
      @for (user of users; track user.id) {
      <li>{{ user.id }} - {{ user.userName }}</li>
      }
    </ul>
    <router-outlet /> `,
})
export class AppComponent implements OnInit {
  http = inject(HttpClient);

  title = 'Dating App';
  users: any;

  ngOnInit(): void {
    this.http.get('https://localhost:5001/api/users').subscribe({
      next: (data) => (this.users = data),
      error: (err) => console.log(err),
      complete: () => console.log('Request completed'),
    });
  }
}
