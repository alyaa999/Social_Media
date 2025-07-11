import { Injectable } from '@angular/core';
import { NewMessageDTO } from '../Interfaces/Chat/NewMessageDTO';
import { MessageDTO } from '../Interfaces/Chat/MessageDTO';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../enviroment/enviroment';
import { Observable } from 'rxjs';
import { MarkReadRequestDTO } from '../Interfaces/Chat/MarkReadRequestDTO';
import { NewConversationDTO } from '../Interfaces/Chat/NewConversationDTO';
import { ConversationDTO } from '../Interfaces/Chat/ConversationDTO';
import { EditConversationDTO } from '../Interfaces/Chat/EditConversationDTO';
import { MessagesPageRequestDTO } from '../Interfaces/Chat/MessagesPageRequestDTO';
import { ConversationMessagesDTO } from '../Interfaces/Chat/ConversationMessagesDTO';
import { ConversationsPageRequestDTO } from '../Interfaces/Chat/ConversationsPageRequestDTO';
import { UserConversationsDTO } from '../Interfaces/Chat/UserConversationsDTO';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private _http: HttpClient) { }

  private baseUrl = `${environment.apiBaseUrl}chat`;

  getMessagesPage(request: MessagesPageRequestDTO): Observable<ConversationMessagesDTO> {
    return this._http.post<ConversationMessagesDTO>(
      `${this.baseUrl}/messages`, request
    );
  }

  getUserConversations(request: ConversationsPageRequestDTO): Observable<UserConversationsDTO> {
    return this._http.post<UserConversationsDTO>(
      `${this.baseUrl}/conversations`, request
    );
  }

  sendMessage(message: NewMessageDTO): Observable<MessageDTO> {
    const formData = new FormData();

    // Add text fields
    formData.append('Content', message.content ? message.content : '');
    formData.append('ConversationId', message.conversationId);
    if (message.senderId) {
      formData.append('SenderId', message.senderId);
    }

    // Add media file if exists
    if (message.media) {
      formData.append('Media', message.media);
      if (message.mediaType) {
        formData.append('MediaType', message.mediaType.toString());
      }
    }

    // Debug: log formData contents
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    return this._http.post<MessageDTO>(
      `${this.baseUrl}/message`,
      formData
      // No need for Content-Type header - browser will set it automatically with boundary
    );
  }
  
  editMessage(message: MessageDTO): Observable<MessageDTO> {
    return this._http.patch<MessageDTO>(`${this.baseUrl}/message`, message);
  }

  deleteMessage(messageId: string): Observable<void> {
    const url = `${this.baseUrl}/message/${messageId}`;
    return this._http.delete<void>(url);
  }

  markRead(request: MarkReadRequestDTO): Observable<void> {
    const url = `${this.baseUrl}/mark-read`;
    return this._http.post<void>(url, request);
  }
  getConversationById(id: string): Observable<ConversationDTO> {
    return this._http.get<ConversationDTO>(`${this.baseUrl}/conversation/${id}`);
  }
  createConversation(data: NewConversationDTO): Observable<ConversationDTO> {
    const formData = new FormData();
    formData.append('isGroup', String(data.isGroup));
    data.participants.forEach(p => formData.append('participants', p));
    if (data.userId) formData.append('userId', data.userId);
    if (data.groupName) formData.append('groupName', data.groupName);
    if (data.groupImage) formData.append('groupImage', data.groupImage);
    // Log actual contents
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
    return this._http.post<ConversationDTO>(
      `${this.baseUrl}/conversation`,
      formData
    );
  }
  editConversation(data: EditConversationDTO): Observable<ConversationDTO> {
    const formData = new FormData();
    formData.append('id', data.id);
    formData.append('isGroup', String(data.isGroup));
    data.participants.forEach(p => formData.append('participants', p));
    if (data.groupName) formData.append('groupName', data.groupName);

    // Log actual contents
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    return this._http.patch<ConversationDTO>(`${this.baseUrl}/conversation`, formData);
  }


  deleteConversation(id: string): Observable<void> {
    return this._http.delete<void>(`${this.baseUrl}/conversation/${id}`);
  }
}
