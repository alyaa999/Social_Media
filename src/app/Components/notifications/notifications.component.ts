import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../Services/notification.service'; // adjust path if needed
import { INotificationsDTO } from '../../Interfaces/notification/notification'; // adjust path if needed

@Component({
  selector: 'app-notifications',
  template: '' // No need for HTML
})
export class NotificationsComponent implements OnInit {
  constructor(private notificationService: NotificationService) { }

  ngOnInit(): void {
    const userId = 'user1'; // Replace this with the actual logged-in user ID

    this.notificationService.GetAllNotifications(userId).subscribe({
      next: (res: INotificationsDTO) => {
        console.log('All Notifications:', res);
      },
      error: (err) => {
        console.error('Error fetching notifications:', err);
      }
    });
  }
}
