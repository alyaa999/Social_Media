import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { INotificationsDTO } from '../Interfaces/notification/notification';
import { Observable } from 'rxjs';
import { PaginationResponseWrapper } from '../Interfaces/response-wrapper/PaginationResponseWrapper';
import { ResponseWrapper } from '../Interfaces/response-wrapper/response-wrapper';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private headers = new HttpHeaders()
    .set("Accept", "application/json");

  private baseUrl = `${environment.apiBaseUrl}Notification/`;

  constructor(private _http: HttpClient) { }

  // Helper to create HttpParams with next
  private createParams(next?: string): HttpParams {
    let params = new HttpParams();
    if (next) {
      params = params.set('next', next);
    }
    return params;
  }

  // ---------------- Fetch Notifications ----------------
  GetAllNotifications(next?: string): Observable<PaginationResponseWrapper<INotificationsDTO[]>> {
    console.log("Fetching all notifications");
    return this._http.get<PaginationResponseWrapper<INotificationsDTO[]>>(`${this.baseUrl}AllNotifications`, {
      headers: this.headers,
      params: this.createParams(next)
    });
  }

  GetFollowNotification(next?: string): Observable<PaginationResponseWrapper<INotificationsDTO[]>> {
    console.log("Fetching follow notifications");
    return this._http.get<PaginationResponseWrapper<INotificationsDTO[]>>(`${this.baseUrl}FollowNotification`, {
      headers: this.headers,
      params: this.createParams(next)
    });
  }

  GetCommentsNotification(next?: string): Observable<PaginationResponseWrapper<INotificationsDTO[]>> {
    console.log("Fetching comment notifications");
    return this._http.get<PaginationResponseWrapper<INotificationsDTO[]>>(`${this.baseUrl}CommentsNotification`, {
      headers: this.headers,
      params: this.createParams(next)
    });
  }

  GetReactionsNotification(next?: string): Observable<PaginationResponseWrapper<INotificationsDTO[]>> {
    console.log("Fetching reactions notifications");
    return this._http.get<PaginationResponseWrapper<INotificationsDTO[]>>(`${this.baseUrl}ReactionsNotification`, {
      headers: this.headers,
      params: this.createParams(next)
    });
  }

  GetMessagesNotification(next?: string): Observable<PaginationResponseWrapper<INotificationsDTO[]>> {
    console.log("Fetching message notifications");
    return this._http.get<PaginationResponseWrapper<INotificationsDTO[]>>(`${this.baseUrl}MessageNotification`, {
      headers: this.headers,
      params: this.createParams(next)
    });
  }

  // ---------------- Unread Notifications ----------------
  GetAllUnreadNotifications(next?: string): Observable<PaginationResponseWrapper<INotificationsDTO[]>> {
    console.log("Fetching all unread notifications");
    return this._http.get<PaginationResponseWrapper<INotificationsDTO[]>>(`${this.baseUrl}AllUnreadNotifications`, {
      headers: this.headers,
      params: this.createParams(next)
    });
  }

  GetUnreadReactionsNotifications(next?: string): Observable<PaginationResponseWrapper<INotificationsDTO[]>> {
    console.log("Fetching unread reactions notifications");
    return this._http.get<PaginationResponseWrapper<INotificationsDTO[]>>(`${this.baseUrl}UnreadReactionsNotifications`, {
      headers: this.headers,
      params: this.createParams(next)
    });
  }

  GetUnreadCommentNotifications(next?: string): Observable<PaginationResponseWrapper<INotificationsDTO[]>> {
    console.log("Fetching unread comment notifications");
    return this._http.get<PaginationResponseWrapper<INotificationsDTO[]>>(`${this.baseUrl}UnreadCommentNotifications`, {
      headers: this.headers,
      params: this.createParams(next)
    });
  }

  GetUnreadFollowedNotifications(next?: string): Observable<PaginationResponseWrapper<INotificationsDTO[]>> {
    console.log("Fetching unread followed notifications");
    return this._http.get<PaginationResponseWrapper<INotificationsDTO[]>>(`${this.baseUrl}UnreadFollowedNotifications`, {
      headers: this.headers,
      params: this.createParams(next)
    });
  }

  GetUnreadMessageNotifications(next?: string): Observable<PaginationResponseWrapper<INotificationsDTO[]>> {
    console.log("Fetching unread message notifications");
    return this._http.get<PaginationResponseWrapper<INotificationsDTO[]>>(`${this.baseUrl}UnreadMessageNotifications`, {
      headers: this.headers,
      params: this.createParams(next)
    });
  }

  // ---------------- Mark As Read ----------------
  MarkNotificationsFollowAsRead(followerId: string, next?: string): Observable<ResponseWrapper<boolean>> {
    const params = this.createParams(next).set("followerId", followerId);
    console.log("Marking follow notifications as read for followerId:", followerId);
    return this._http.post<ResponseWrapper<boolean>>(`${this.baseUrl}mark-notifications-follow-as-read`, null, {
      headers: this.headers,
      params
    });
  }
  MarkNotificationsCommentAsRead(commentId: string, next?: string): Observable<ResponseWrapper<boolean>> {
    const params = this.createParams(next).set("commentId", commentId);
    console.log("Marking comment notifications as read for commentId:", commentId);
    return this._http.post<ResponseWrapper<boolean>>(`${this.baseUrl}mark-notifications-comment-as-read`, null, {
      headers: this.headers,
      params
    });
  }
  MarkAllNotificationsAsRead(next?: string): Observable<ResponseWrapper<boolean>> {
    console.log("Marking all notifications as read");
    return this._http.post<ResponseWrapper<boolean>>(`${this.baseUrl}mark-all-notifications-as-read`, null, {
      headers: this.headers,
      params: this.createParams(next)
    });
  }

  MarkNotificationsReactionCommentAsRead(reactionId: string, next?: string): Observable<ResponseWrapper<boolean>> {
    const params = this.createParams(next).set("reactionId", reactionId);
    console.log("Marking reaction notifications as read for reactionId:", reactionId);
    return this._http.post<ResponseWrapper<boolean>>(`${this.baseUrl}mark-notifications-comment-as-read`, null, {
      headers: this.headers,
      params
    });
  }

  MarkNotificationsReactionPostAsRead(userId: string, reactionId: string, next?: string): Observable<ResponseWrapper<boolean>> {
    const params = this.createParams(next).set("reactionId", reactionId);
    console.log("Marking reaction post notifications as read for userId:", userId, "and reactionId:", reactionId);
    return this._http.post<ResponseWrapper<boolean>>(`${this.baseUrl}mark-notifications-reaction-post-as-read`, null, {
      headers: this.headers,
      params
    });
  }

  MarkNotificationsMessageAsRead(userId: string, messageId: string, next?: string): Observable<ResponseWrapper<boolean>> {
    const params = this.createParams(next).set("messageId", messageId);
    console.log("Marking message notifications as read for userId:", userId, "and messageId:", messageId);
    return this._http.post<ResponseWrapper<boolean>>(`${this.baseUrl}mark-notifications-message-as-read`, null, {
      headers: this.headers,
      params
    });
  }

  // ---------------- Get Types ----------------
  GetNotificationTypes(userId: string, next?: string): Observable<ResponseWrapper<INotificationsDTO[]>> {
    const params = this.createParams(next ?? userId);
    return this._http.get<ResponseWrapper<INotificationsDTO[]>>(`${this.baseUrl}get-notifications-types`, {
      headers: this.headers,
      params
    });
  }
}
