import { Component, Output, EventEmitter, Input, HostListener, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../../Services/notification.service';
import { INotificationsDTO } from '../../../Interfaces/notification/notification';
import { PaginationResponseWrapper } from '../../../Interfaces/response-wrapper/PaginationResponseWrapper';
import { Observable } from 'rxjs';
import { NotificationEntity } from '../../../Interfaces/notification/notification-enum-type';

@Component({
  selector: 'app-notification-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification-modal.component.html',
  styleUrls: ['./notification-modal.component.scss']
})
export class NotificationModalComponent implements OnInit, OnChanges {
  @Input() isOpen = false;
  @Input() userId: string = 'user1';
  
  @Output() closed = new EventEmitter<void>();

  activeTab: 'all' | 'reactions' | 'comments' | 'follows' = 'all';
  showUnreadOnly: boolean = false;
  notifications: INotificationsDTO[] = [];
  loading: boolean = false;
  nextPage: string | undefined;

  constructor(private notificationService: NotificationService) {}

  get unreadCount(): number {
    return this.notifications.filter(n => !n.isRead).length;
  }

  get hasUnreadNotifications(): boolean {
    return this.unreadCount > 0;
  }

  ngOnInit() {
    console.log('NotificationModal initialized');
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isOpen'] && changes['isOpen'].currentValue === true) {
      console.log('Modal opened, loading notifications...');
      this.loadNotifications();
    
    }
  }

  @HostListener('document:keydown.escape', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {
    this.closeModal();
  }

  closeModal() {
    this.closed.emit();
  }

  loadNotifications() {
    if (!this.userId) {
      console.error('No userId provided');
      return;
    }
    
    console.log('Loading notifications for user:', this.userId);
    this.loading = true;
    let request: Observable<PaginationResponseWrapper<INotificationsDTO[]>>;

    if (this.showUnreadOnly) {
      request = this.getUnreadNotifications();
    } else {
      request = this.getAllNotifications();
    }

    request.subscribe({
      next: (response) => {
        console.log('Raw response:', response);
        console.log('Response data:', response.data);
        console.log('Number of notifications:', response.data.length);
        this.notifications = response.data;
        this.nextPage = response.next;
        this.loading = false;
        console.log('Updated notifications array:', this.notifications);
        if (this.notifications.length > 0) {
          console.log('First notification properties:', Object.keys(this.notifications[0]));
        }
      },
      error: (error) => {
        console.error('Error loading notifications:', error);
        this.loading = false;
      }
    });
  }

  private getAllNotifications(): Observable<PaginationResponseWrapper<INotificationsDTO[]>> {
    console.log('Getting all notifications for tab:', this.activeTab);
    switch (this.activeTab) {
      case 'all':
        return this.notificationService.GetAllNotifications();
      case 'reactions':
        return this.notificationService.GetReactionsNotification();
      case 'comments':
        return this.notificationService.GetCommentsNotification();
      case 'follows':
        return this.notificationService.GetFollowNotification();
      default:
        return this.notificationService.GetAllNotifications();
    }
  }

  private getUnreadNotifications(): Observable<PaginationResponseWrapper<INotificationsDTO[]>> {
    console.log('Getting unread notifications for tab:', this.activeTab);
    switch (this.activeTab) {
      case 'all':
        return this.notificationService.GetAllUnreadNotifications();
      case 'reactions':
        return this.notificationService.GetUnreadReactionsNotifications();
      case 'comments':
        return this.notificationService.GetUnreadCommentNotifications();
      case 'follows':
        return this.notificationService.GetUnreadFollowedNotifications();
      default:
        return this.notificationService.GetAllUnreadNotifications();
    }
  }

  changeTab(tab: 'all' | 'reactions' | 'comments' | 'follows') {
    console.log('Changing tab to:', tab);
    this.activeTab = tab;
    this.nextPage = undefined;
    this.loadNotifications();
  }

  toggleUnreadOnly() {
    console.log('Toggling unread only:', !this.showUnreadOnly);
    this.showUnreadOnly = !this.showUnreadOnly;
    this.nextPage = undefined;
    this.loadNotifications();
  }

  loadMore() {
    if (this.nextPage) {
      console.log('Loading more notifications...');
      this.loadNotifications();
    }
  }

  markAllAsRead() {
    console.log('Marking all notifications as read');
    this.notificationService.MarkAllNotificationsAsRead().subscribe({
      next: () => {
        console.log('All notifications marked as read');
        this.loadNotifications();
      },
      error: (error) => {
        console.error('Error marking notifications as read:', error);
      }
    });
  }

  markNotificationAsRead(notification: INotificationsDTO) {
    console.log('Marking notification as read:', notification);
    switch (notification.entityName) {
      case NotificationEntity.Follow:
        this.notificationService.MarkNotificationsFollowAsRead(this.userId).subscribe();
        break;
      case NotificationEntity.Comment:
        this.notificationService.MarkNotificationsCommentAsRead(this.userId).subscribe();
        break;
      case NotificationEntity.React:
        if (
          notification.notificatoinPreview &&
          notification.notificatoinPreview.toLowerCase().includes('comment')
        ) {
          this.notificationService.MarkNotificationsReactionCommentAsRead(this.userId).subscribe();
        } else {
          this.notificationService.MarkNotificationsReactionPostAsRead(this.userId, notification.entityId).subscribe();
        }
        break;
      default:
        console.warn('Unknown notification type:', notification.entityName);
    }
  }

  onImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    // This is a simple gray circle as a data URL
    imgElement.src = 'https://t3.ftcdn.net/jpg/06/99/46/60/360_F_699466075_DaPTBNlNQTOwwjkOiFEoOvzDV0ByXR9E.jpg';
  }
}
