import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../Services/notification.service'; // adjust path if needed
import { INotificationsDTO } from '../../Interfaces/notification/notification'; // adjust path if needed
import { PaginationResponseWrapper } from '../../Interfaces/response-wrapper/PaginationResponseWrapper';

@Component({
  selector: 'app-notifications',
  template: '' // No need for HTML
})
export class NotificationsComponent implements OnInit {
  constructor(private notificationService: NotificationService) { }

  ngOnInit(): void {
    const userId = 'user1'; // Replace this with the actual logged-in user ID
    const nextToken = 'next-token'; // Replace this with the actual next token if needed
    
    this.notificationService.GetAllNotifications(userId, nextToken).subscribe({
      next: (res: PaginationResponseWrapper<INotificationsDTO[]>) => {
        console.log('All Notifications:', res.data);
      },
      error: (err) => {
        console.error('Error fetching notifications:', err);
      }
    });
  }
}
