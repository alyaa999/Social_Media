import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationModalComponent } from '../notification-modal/notification-modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, NotificationModalComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  isNotificationOpen = false;

  constructor(private router: Router) {}

  toggleNotifications() {
    this.isNotificationOpen = !this.isNotificationOpen;
  }

  closeNotifications() {
    this.isNotificationOpen = false;
  }

  navigateToFeed() {
    this.router.navigate(['/feed']);
  }

  navigateToProfile() {
    this.router.navigate(['/profile']);
  }

  navigateToChat() {
    this.router.navigate(['/chat']);
  }

  logout() {
    localStorage.removeItem('userId');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('accessToken');
    this.router.navigate(['/login']);
  }
}
