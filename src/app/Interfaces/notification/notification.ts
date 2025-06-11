import { NotificationEntity } from './notification-enum-type';

export interface INotificationsDTO {
    SourceUserImageUrl: string;
    SourceUsername: string;
    EntityId: string;
    EntityName: NotificationEntity;
    NotificatoinPreview: string;
    IsRead: boolean;
    CreatedTime: Date;
}