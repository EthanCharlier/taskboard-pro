import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ],
  template: `
    <nav style="padding:.5rem; border-bottom:1px solid #ddd;">
      <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">Accueil</a> |
      <a routerLink="/about" routerLinkActive="active">À propos</a>
    </nav>
    <main style="padding:1rem;">
      <router-outlet></router-outlet>
    </main>`,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'taskboard-pro';
}
