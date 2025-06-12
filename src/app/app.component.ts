import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './Components/Shared/navbar/navbar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterOutlet, NavbarComponent],
  template: `
    <div class="w-full min-h-screen py-4 px-4">
      <div class="border border-black rounded-2xl mx-2 my-4 overflow-hidden">
        <app-navbar></app-navbar>
      </div>
      <router-outlet></router-outlet>
    </div>
  `,
  styles: []
})
export class AppComponent {
  title = 'Social_Media';
}
