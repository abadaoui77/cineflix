
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <!-- router-outlet = "ici s'affiche la page correspondant à l'URL actuelle" -->
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  title = 'CineFlix';
}
