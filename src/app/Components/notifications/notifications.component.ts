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
  notifications: INotificationsDTO[] = [];
  ngOnInit(): void {

    const userId = 'user1'; // Replace this with the actual logged-in user ID
    const nextToken = 'next-token'; // Replace this with the actual next token if needed
    const FollowerId = 'follower1'; // Replace this with the actual follower ID if needed
    const reactionId = 'reaction1'; // Replace this with the actual reaction ID if needed
    const messageId = 'message1'; // Replace this with the actual message ID if needed


    this.notificationService.GetAllNotifications(userId, nextToken).subscribe({
      next: (res: PaginationResponseWrapper<INotificationsDTO[]>) => {
        console.log('All Notifications:', res.data);
        this.notifications = res.data;
      },
      error: (err) => {
        console.error('Error fetching notifications:', err);
      }
    });

    this.notificationService.GetFollowNotification(userId, nextToken).subscribe({
      next: (res: PaginationResponseWrapper<INotificationsDTO[]>) => {
        console.log('Follow Notifications:', res.data);
        this.notifications = this.notifications.concat(res.data);
      },
      error: (err) => {
        console.error('Error fetching follow notifications:', err);
      }
    });

    this.notificationService.GetCommentsNotification(userId, nextToken).subscribe({
      next: (res: PaginationResponseWrapper<INotificationsDTO[]>) => {
        console.log('Comments Notifications:', res.data);
        this.notifications = this.notifications.concat(res.data);
      },
      error: (err) => {
        console.error('Error fetching comments notifications:', err);
      }
    });

    this.notificationService.GetReactionsNotification(userId, nextToken).subscribe({
      next: (res: PaginationResponseWrapper<INotificationsDTO[]>) => {
        console.log('Reactions Notifications:', res.data);
        this.notifications = this.notifications.concat(res.data);
      },
      error: (err) => {
        console.error('Error fetching reactions notifications:', err);
      }
    });

    this.notificationService.GetMessagesNotification(userId, nextToken).subscribe({
      next: (res: PaginationResponseWrapper<INotificationsDTO[]>) => {
        console.log('Messages Notifications:', res.data);
        this.notifications = this.notifications.concat(res.data);
      },
      error: (err) => {
        console.error('Error fetching messages notifications:', err);
      }
    });

    // ---------------- Unread Notifications ----------------

    this.notificationService.GetAllUnreadNotifications(userId, nextToken).subscribe({
      next: (res: PaginationResponseWrapper<INotificationsDTO[]>) => {
        console.log('All Unread Notifications:', res.data);
        this.notifications = this.notifications.concat(res.data);
      },
      error: (err) => {
        console.error('Error fetching all unread notifications:', err);
      }
    });

    this.notificationService.GetUnreadReactionsNotifications(userId, nextToken).subscribe({
      next: (res: PaginationResponseWrapper<INotificationsDTO[]>) => {
        console.log('Unread Reactions Notifications:', res.data);
        this.notifications = this.notifications.concat(res.data);
      },
      error: (err) => {
        console.error('Error fetching unread reactions notifications:', err);
      }
    });

    this.notificationService.GetUnreadMessageNotifications(userId, nextToken).subscribe({
      next: (res: PaginationResponseWrapper<INotificationsDTO[]>) => {
        console.log('Unread Messages Notifications:', res.data);
        this.notifications = this.notifications.concat(res.data);
      },
      error: (err) => {
        console.error('Error fetching unread messages notifications:', err);
      }
    });

    this.notificationService.GetUnreadCommentNotifications(userId, nextToken).subscribe({
      next: (res: PaginationResponseWrapper<INotificationsDTO[]>) => {
        console.log('Unread Comments Notifications:', res.data);
        this.notifications = this.notifications.concat(res.data);
      },
      error: (err) => {
        console.error('Error fetching unread comments notifications:', err);
      }
    });

    this.notificationService.GetUnreadFollowedNotifications(userId, nextToken).subscribe({
      next: (res: PaginationResponseWrapper<INotificationsDTO[]>) => {
        console.log('Unread Followed Notifications:', res.data);
        this.notifications = this.notifications.concat(res.data);
      },
      error: (err) => {
        console.error('Error fetching unread followed notifications:', err);
      }
    });

    // ---------------- Mark As Read ----------------

    this.notificationService.MarkAllNotificationsAsRead(userId).subscribe({
      next: (res) => {
        console.log('All notifications marked as read:', res);
      },
      error: (err) => {
        console.error('Error marking all notifications as read:', err);
      }
    });

    this.notificationService.MarkNotificationsFollowAsRead(userId, FollowerId).subscribe({
      next: (res) => {
        console.log('Follow notifications marked as read:', res);
      },
      error: (err) => {
        console.error('Error marking follow notifications as read:', err);
      }
    });

    this.notificationService.MarkNotificationsReactionCommentAsRead(userId, reactionId).subscribe({
      next: (res) => {
        console.log('Reaction on Comment notifications marked as read:', res);
      },
      error: (err) => {
        console.error('Error marking reaction on comment notifications as read:', err);
      }
    });

    this.notificationService.MarkNotificationsReactionPostAsRead(userId, reactionId).subscribe({
      next: (res) => {
        console.log('Reaction on Post notifications marked as read:', res);
      },
      error: (err) => {
        console.error('Error marking reaction on post notifications as read:', err);
      }
    });

    this.notificationService.MarkNotificationsMessageAsRead(userId, messageId).subscribe({
      next: (res) => {
        console.log('Message notifications marked as read:', res);
      },
      error: (err) => {
        console.error('Error marking message notifications as read:', err);
      }
    });

    this.notificationService.GetNotificationTypes(userId).subscribe({
      next: (res) => {
        console.log('Notification Types:', res.data);
      },
        error: (err) => {
          console.error('Error fetching notification types:', err);
        }
    });
  }

}
