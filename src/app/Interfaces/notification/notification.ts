import { NotificationEntity } from './notification-enum-type';

export interface INotificationsDTO {
    sourceUserImageUrl: string;
    sourceUsername: string;
    entityId: string;
    entityName: NotificationEntity;
    notificatoinPreview: string;
    isRead: boolean;
    createdTime: string;
}