import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroment/enviroment';
import { INotificationsDTO } from '../Interfaces/notification';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private headers = new HttpHeaders()
    .set("Authorization", environment.token)
    .set("Accept", "application/json");

  private baseUrl = `${environment.apiBaseUrl}api/internal/Notification/`;

  constructor(private _http: HttpClient) {}

  private createHeader(userId: string) {
    return this.headers.set("userId", userId);
  }

  // ---------------- Fetch Notifications ----------------
  GetAllNotifications(userId: string): Observable<INotificationsDTO> {
    return this._http.get<INotificationsDTO>(`${this.baseUrl}AllNotifications`, {
      headers: this.createHeader(userId)
    });
  }

  GetFollowNotification(userId: string) {
    return this._http.get<INotificationsDTO>(`${this.baseUrl}FollowNotification`, { headers: this.createHeader(userId) });
  }

  GetCommentsNotification(userId: string) {
    return this._http.get<INotificationsDTO>(`${this.baseUrl}CommentsNotification`, { headers: this.createHeader(userId) });
  }

  GetReactionsNotification(userId: string) {
    return this._http.get<INotificationsDTO>(`${this.baseUrl}ReactionsNotification`, { headers: this.createHeader(userId) });
  }

  GetMessagesNotification(userId: string) {
    return this._http.get<INotificationsDTO>(`${this.baseUrl}MessageNotification`, { headers: this.createHeader(userId) });
  }

  // ---------------- Unread Notifications ----------------
  GetAllUnreadNotifications(userId: string) {
    return this._http.get<INotificationsDTO>(`${this.baseUrl}AllUnreadNotifications`, { headers: this.createHeader(userId) });
  }

  GetUnreadReactionsNotifications(userId: string) {
    return this._http.get<INotificationsDTO>(`${this.baseUrl}UnreadReactionsNotifications`, { headers: this.createHeader(userId) });
  }

  GetUnreadCommentNotifications(userId: string) {
    return this._http.get<INotificationsDTO>(`${this.baseUrl}UnreadCommentNotifications`, { headers: this.createHeader(userId) });
  }

  GetUnreadFollowedNotifications(userId: string) {
    return this._http.get<INotificationsDTO>(`${this.baseUrl}UnreadFollowedNotifications`, { headers: this.createHeader(userId) });
  }

  GetUnreadMessageNotifications(userId: string) {
    return this._http.get<INotificationsDTO>(`${this.baseUrl}UnreadMessageNotifications`, { headers: this.createHeader(userId) });
  }

  // ---------------- Mark As Read ----------------
  MarkNotificationsFollowAsRead(userId: string, followerId: string) {
    const params = new HttpParams().set("followerId", followerId);
    return this._http.post(`${this.baseUrl}mark-notifications-follow-as-read`, null, {
      headers: this.createHeader(userId),
      params
    });
  }

  MarkAllNotificationsAsRead(userId: string) {
    return this._http.post(`${this.baseUrl}mark-all-notifications-as-read`, null, {
      headers: this.createHeader(userId)
    });
  }

  MarkNotificationsReactionCommentAsRead(userId: string, reactionId: string) {
    const params = new HttpParams().set("reactionId", reactionId);
    return this._http.post(`${this.baseUrl}mark-notifications-reaction-comment-as-read`, null, {
      headers: this.createHeader(userId),
      params
    });
  }

  MarkNotificationsReactionPostAsRead(userId: string, reactionId: string) {
    const params = new HttpParams().set("reactionId", reactionId);
    return this._http.post(`${this.baseUrl}mark-notifications-reaction-post-as-read`, null, {
      headers: this.createHeader(userId),
      params
    });
  }

  MarkNotificationsMessageAsRead(userId: string, messageId: string) {
    const params = new HttpParams().set("messageId", messageId);
    return this._http.post(`${this.baseUrl}mark-notifications-message-as-read`, null, {
      headers: this.createHeader(userId),
      params
    });
  }

  // ---------------- Get Types ----------------
  GetNotificationTypes(userId: string) {
    return this._http.get(`${this.baseUrl}get-notifications-types`, {
      headers: this.createHeader(userId)
    });
  }
}
