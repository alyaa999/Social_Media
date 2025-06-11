import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroment/enviroment';
import { INotificationsDTO } from '../Interfaces/notification/notification';
import { Observable } from 'rxjs';
import { PaginationResponseWrapper } from '../Interfaces/response-wrapper/PaginationResponseWrapper';
import { ResponseWrapper } from '../Interfaces/response-wrapper/response-wrapper';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private headers = new HttpHeaders()
    .set("Authorization", environment.token)
    .set("Accept", "application/json");

  private baseUrl = `${environment.apiBaseUrl}api/public/Notification/`;

  constructor(private _http: HttpClient) { }

  private createHeader(userId: string, next?: string) {
    let headers = this.headers.set("userId", userId);
    if (next) headers = headers.set("next", next);
    return headers;
  }

  // ---------------- Fetch Notifications ----------------
  GetAllNotifications(userId: string, next?: string): Observable<PaginationResponseWrapper<INotificationsDTO[]>> {
    return this._http.get<PaginationResponseWrapper<INotificationsDTO[]>>(`${this.baseUrl}AllNotifications`, {
      headers: this.createHeader(userId, next)
    });
  }

  GetFollowNotification(userId: string, next?: string): Observable<PaginationResponseWrapper<INotificationsDTO[]>> {
    return this._http.get<PaginationResponseWrapper<INotificationsDTO[]>>(`${this.baseUrl}FollowNotification`, {
      headers: this.createHeader(userId, next)
    });
  }

  GetCommentsNotification(userId: string, next?: string): Observable<PaginationResponseWrapper<INotificationsDTO[]>> {
    return this._http.get<PaginationResponseWrapper<INotificationsDTO[]>>(`${this.baseUrl}CommentsNotification`, {
      headers: this.createHeader(userId, next)
    });
  }

  GetReactionsNotification(userId: string, next?: string): Observable<PaginationResponseWrapper<INotificationsDTO[]>> {
    return this._http.get<PaginationResponseWrapper<INotificationsDTO[]>>(`${this.baseUrl}ReactionsNotification`, {
      headers: this.createHeader(userId, next)
    });
  }

  GetMessagesNotification(userId: string, next?: string): Observable<PaginationResponseWrapper<INotificationsDTO[]>> {
    return this._http.get<PaginationResponseWrapper<INotificationsDTO[]>>(`${this.baseUrl}MessageNotification`, {
      headers: this.createHeader(userId, next)
    });
  }

  // ---------------- Unread Notifications ----------------
  GetAllUnreadNotifications(userId: string, next?: string): Observable<PaginationResponseWrapper<INotificationsDTO[]>> {
    return this._http.get<PaginationResponseWrapper<INotificationsDTO[]>>(`${this.baseUrl}AllUnreadNotifications`, {
      headers: this.createHeader(userId, next)
    });
  }

  GetUnreadReactionsNotifications(userId: string, next?: string): Observable<PaginationResponseWrapper<INotificationsDTO[]>> {
    return this._http.get<PaginationResponseWrapper<INotificationsDTO[]>>(`${this.baseUrl}UnreadReactionsNotifications`, {
      headers: this.createHeader(userId, next)
    });
  }

  GetUnreadCommentNotifications(userId: string, next?: string): Observable<PaginationResponseWrapper<INotificationsDTO[]>> {
    return this._http.get<PaginationResponseWrapper<INotificationsDTO[]>>(`${this.baseUrl}UnreadCommentNotifications`, {
      headers: this.createHeader(userId, next)
    });
  }

  GetUnreadFollowedNotifications(userId: string, next?: string): Observable<PaginationResponseWrapper<INotificationsDTO[]>> {
    return this._http.get<PaginationResponseWrapper<INotificationsDTO[]>>(`${this.baseUrl}UnreadFollowedNotifications`, {
      headers: this.createHeader(userId, next)
    });
  }

  GetUnreadMessageNotifications(userId: string, next?: string): Observable<PaginationResponseWrapper<INotificationsDTO[]>> {
    return this._http.get<PaginationResponseWrapper<INotificationsDTO[]>>(`${this.baseUrl}UnreadMessageNotifications`, {
      headers: this.createHeader(userId, next)
    });
  }

  // ---------------- Mark As Read ----------------
  MarkNotificationsFollowAsRead(userId: string, followerId: string): Observable<ResponseWrapper<boolean>> {
    const params = new HttpParams().set("followerId", followerId);
    return this._http.post<ResponseWrapper<boolean>>(`${this.baseUrl}mark-notifications-follow-as-read`, null, {
      headers: this.createHeader(userId),
      params
    });
  }

  MarkAllNotificationsAsRead(userId: string): Observable<ResponseWrapper<boolean>> {
    return this._http.post<ResponseWrapper<boolean>>(`${this.baseUrl}mark-all-notifications-as-read`, null, {
      headers: this.createHeader(userId)
    });
  }

  MarkNotificationsReactionCommentAsRead(userId: string, reactionId: string): Observable<ResponseWrapper<boolean>> {
    const params = new HttpParams().set("reactionId", reactionId);
    return this._http.post<ResponseWrapper<boolean>>(`${this.baseUrl}mark-notifications-reaction-comment-as-read`, null, {
      headers: this.createHeader(userId),
      params
    });
  }

  MarkNotificationsReactionPostAsRead(userId: string, reactionId: string): Observable<ResponseWrapper<boolean>> {
    const params = new HttpParams().set("reactionId", reactionId);
    return this._http.post<ResponseWrapper<boolean>>(`${this.baseUrl}mark-notifications-reaction-post-as-read`, null, {
      headers: this.createHeader(userId),
      params
    });
  }

  MarkNotificationsMessageAsRead(userId: string, messageId: string): Observable<ResponseWrapper<boolean>> {
    const params = new HttpParams().set("messageId", messageId);
    return this._http.post<ResponseWrapper<boolean>>(`${this.baseUrl}mark-notifications-message-as-read`, null, {
      headers: this.createHeader(userId),
      params
    });
  }

  // ---------------- Get Types ----------------
  GetNotificationTypes(userId: string): Observable<ResponseWrapper<INotificationsDTO[]>> {
    return this._http.get<ResponseWrapper<INotificationsDTO[]>>(`${this.baseUrl}get-notifications-types`, {
      headers: this.createHeader(userId)
    });
  }
}
