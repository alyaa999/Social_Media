import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateCommentReactionRequest } from '../Interfaces/Reaction/Comments/CreateCommentReactionRequest';
import { ResponseWrapper } from '../Interfaces/response-wrapper/response-wrapper';
import { DeleteCommentReactionRequest } from '../Interfaces/Reaction/Comments/DeleteCommentReactionRequest';
import { environment } from '../../enviroment/enviroment';
import { DeletePostReactionRequest } from '../Interfaces/Reaction/Posts/DeletePostReactionRequest';
import { CreatePostReactionRequest } from '../Interfaces/Reaction/Posts/CreatePostReactionRequest';
import { GetPagedCommentRequest } from '../Interfaces/Comment/get-paged-comment-request';
import { SimpleUserProfile } from '../Interfaces/post/simple-user-profile';

@Injectable({
  providedIn: 'root'
})
export class ReactionService {
  private baseUrl = environment.apiBaseUrl;


  constructor(private http: HttpClient) {}

  addReaction(request: CreateCommentReactionRequest, userId: string): Observable<ResponseWrapper<boolean>> {
    return this.http.post<ResponseWrapper<boolean>>(this.baseUrl, request);
  }

  deleteReaction(request: DeleteCommentReactionRequest, userId: string): Observable<ResponseWrapper<boolean>> {
    return this.http.delete<ResponseWrapper<boolean>>(this.baseUrl, {
      body: request 
    });
  }
  addReactionComment(request: CreatePostReactionRequest, userId: string): Observable<ResponseWrapper<boolean>> {
    const headers = new HttpHeaders().set('userId', userId);
    return this.http.post<ResponseWrapper<boolean>>(this.baseUrl, request, { headers });
  }

  deleteReactionComment(request: DeletePostReactionRequest, userId: string): Observable<ResponseWrapper<boolean>> {
    const headers = new HttpHeaders().set('userId', userId);
    return this.http.delete<ResponseWrapper<boolean>>(this.baseUrl, {
      headers,
      body: request
    });
  }

  // ---------------- Fetch Posts Reactions ----------------
  getUsersReacted(request: GetPagedCommentRequest): Observable<ResponseWrapper<SimpleUserProfile[]>> {
    return this.http.post<ResponseWrapper<SimpleUserProfile[]>>(`${this.baseUrl}reacts/post/users`, request);
  }

}