import { Injectable } from '@angular/core';
import { NewMessageDTO } from '../Interfaces/Chat/NewMessageDTO';
import { MessageDTO } from '../Interfaces/Chat/MessageDTO';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  constructor( private _http: HttpClient) { }

  private baseUrlCommand = `${environment.apiBaseUrl}api/ChatCommand`;
  private baseUrlQuery= `${environment.apiBaseUrl}api/ChatQuery`;
 
  getMessagesPage(request: MessagesPageRequestDTO): Observable<ConversationMessagesDTO> {
    return this._http.post<ConversationMessagesDTO>(
      `${this.baseUrlQuery}/messages`, request
    );
  }
  
  getUserConversations(request: ConversationsPageRequestDTO): Observable<UserConversationsDTO> {
    return this._http.post<UserConversationsDTO>(
      `${this.baseUrlQuery}/conversations`, request
    );
  }

  sendMessage(p0: string, message: NewMessageDTO): Observable<MessageDTO> {
  
    return this._http.post<MessageDTO>(`${this.baseUrlCommand}/message`, message);
  }

  editMessage(message: MessageDTO): Observable<MessageDTO> {
    return this._http.patch<MessageDTO>(`${this.baseUrlCommand}/message`, message);
  }

  deleteMessage(messageId: string): Observable<void> {
    const url = `${this.baseUrlCommand}/message/${messageId}`;
    return this._http.delete<void>(url);
  }
  
  markRead(request: MarkReadRequestDTO): Observable<void> {
    const url = `${this.baseUrlCommand}/mark-read`;
    return this._http.post<void>(url, request);
  }

  createConversation(data: NewConversationDTO): Observable<ConversationDTO> {
    const formData = new FormData();
    formData.append('isGroup', String(data.isGroup));
    data.participants.forEach(p => formData.append('participants', p));
    if (data.groupName) formData.append('groupName', data.groupName);
    if (data.groupImage) formData.append('groupImage', data.groupImage);
  
    return this._http.post<ConversationDTO>(`${this.baseUrlCommand}/conversation`, formData);
  }
  
  editConversation(data: EditConversationDTO): Observable<ConversationDTO> {
    const formData = new FormData();
    formData.append('id', data.id);
    formData.append('isGroup', String(data.isGroup));
    data.participants.forEach(p => formData.append('participants', p));
    if (data.groupName) formData.append('groupName', data.groupName);
    if (data.groupImage) formData.append('groupImage', data.groupImage);
  
    return this._http.patch<ConversationDTO>(`${this.baseUrlCommand}/conversation`, formData);
  }
    

  deleteConversation(id: string): Observable<void> {
    return this._http.delete<void>(`${this.baseUrlCommand}/conversation/${id}`);
  }
  
 
  
  
}
