import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../Services/notification.service';
import { INotificationsDTO } from '../../Interfaces/notification/notification';
import { PaginationResponseWrapper } from '../../Interfaces/response-wrapper/PaginationResponseWrapper';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  activeTab: 'all' | 'reactions' | 'comments' | 'follows' | 'messages' = 'all';
  showUnreadOnly: boolean = false;
  notifications: INotificationsDTO[] = [];
  loading: boolean = false;
  nextPage: string | undefined;
  userId: string = 'your-user-id'; // Replace with actual user ID from your auth service

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.loadNotifications();
  }

  loadNotifications() {
    this.loading = true;
    let request: Observable<PaginationResponseWrapper<INotificationsDTO[]>>;

    if (this.showUnreadOnly) {
      request = this.getUnreadNotifications();
    } else {
      request = this.getAllNotifications();
    }

    request.subscribe({
      next: (response) => {
        this.notifications = response.data;
        this.nextPage = response.next;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading notifications:', error);
        this.loading = false;
      }
    });
  }

  private getAllNotifications(): Observable<PaginationResponseWrapper<INotificationsDTO[]>> {
    switch (this.activeTab) {
      case 'all':
        return this.notificationService.GetAllNotifications(this.userId, this.nextPage);
      case 'reactions':
        return this.notificationService.GetReactionsNotification(this.userId, this.nextPage);
      case 'comments':
        return this.notificationService.GetCommentsNotification(this.userId, this.nextPage);
      case 'follows':
        return this.notificationService.GetFollowNotification(this.userId, this.nextPage);
      case 'messages':
        return this.notificationService.GetMessagesNotification(this.userId, this.nextPage);
      default:
        return this.notificationService.GetAllNotifications(this.userId, this.nextPage);
    }
  }

  private getUnreadNotifications(): Observable<PaginationResponseWrapper<INotificationsDTO[]>> {
    switch (this.activeTab) {
      case 'all':
        return this.notificationService.GetAllUnreadNotifications(this.userId, this.nextPage);
      case 'reactions':
        return this.notificationService.GetUnreadReactionsNotifications(this.userId, this.nextPage);
      case 'comments':
        return this.notificationService.GetUnreadCommentNotifications(this.userId, this.nextPage);
      case 'follows':
        return this.notificationService.GetUnreadFollowedNotifications(this.userId, this.nextPage);
      case 'messages':
        return this.notificationService.GetUnreadMessageNotifications(this.userId, this.nextPage);
      default:
        return this.notificationService.GetAllUnreadNotifications(this.userId, this.nextPage);
    }
  }

  changeTab(tab: 'all' | 'reactions' | 'comments' | 'follows' | 'messages') {
    this.activeTab = tab;
    this.nextPage = undefined;
    this.loadNotifications();
  }

  toggleUnreadOnly() {
    this.showUnreadOnly = !this.showUnreadOnly;
    this.nextPage = undefined;
    this.loadNotifications();
  }

  loadMore() {
    if (this.nextPage) {
      this.loadNotifications();
    }
  }

  markAllAsRead() {
    this.notificationService.MarkAllNotificationsAsRead(this.userId).subscribe({
      next: () => {
        this.loadNotifications();
      },
      error: (error) => {
        console.error('Error marking notifications as read:', error);
      }
    });
  }
} 