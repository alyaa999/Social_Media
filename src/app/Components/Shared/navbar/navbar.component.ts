import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationModalComponent } from '../notification-modal/notification-modal.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, NotificationModalComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  isNotificationOpen = false;

  toggleNotifications() {
    this.isNotificationOpen = !this.isNotificationOpen;
  }

  closeNotifications() {
    this.isNotificationOpen = false;
  }
}
