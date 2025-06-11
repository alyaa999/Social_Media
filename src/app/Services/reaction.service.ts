// reaction-comment.service.ts

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateCommentReactionRequest } from '../Interfaces/Reaction/Comments/CreateCommentReactionRequest';
import { ResponseWrapper } from '../Interfaces/response-wrapper/response-wrapper';
import { DeleteCommentReactionRequest } from '../Interfaces/Reaction/Comments/DeleteCommentReactionRequest';
import { environment } from '../../enviroment/enviroment';
import { DeletePostReactionRequest } from '../Interfaces/Reaction/Posts/DeletePostReactionRequest';
import { CreatePostReactionRequest } from '../Interfaces/Reaction/Posts/CreatePostReactionRequest';

@Injectable({
  providedIn: 'root'
})
export class ReactionCommentService {
  private baseUrlComment= `${environment.apiBaseUrl}api/public/reacts/comment`;
  private baseUrlPost= `${environment.apiBaseUrl}api/public/reacts/post`;


  constructor(private http: HttpClient) {}

  addReaction(request: CreateCommentReactionRequest, userId: string): Observable<ResponseWrapper<boolean>> {
    return this.http.post<ResponseWrapper<boolean>>(this.baseUrlComment, request);
  }

  deleteReaction(request: DeleteCommentReactionRequest, userId: string): Observable<ResponseWrapper<boolean>> {
    return this.http.delete<ResponseWrapper<boolean>>(this.baseUrlComment, {
      body: request 
    });
  }
  addReactionComment(request: CreatePostReactionRequest, userId: string): Observable<ResponseWrapper<boolean>> {
    const headers = new HttpHeaders().set('userId', userId);
    return this.http.post<ResponseWrapper<boolean>>(this.baseUrlPost, request, { headers });
  }

  deleteReactionComment(request: DeletePostReactionRequest, userId: string): Observable<ResponseWrapper<boolean>> {
    const headers = new HttpHeaders().set('userId', userId);
    return this.http.delete<ResponseWrapper<boolean>>(this.baseUrlPost, {
      headers,
      body: request
    });
  }
  

}
