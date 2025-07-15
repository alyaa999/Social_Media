import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CreateCommentReactionRequest } from '../Interfaces/Reaction/Comments/CreateCommentReactionRequest';
import { ResponseWrapper } from '../Interfaces/response-wrapper/response-wrapper';
import { DeleteCommentReactionRequest } from '../Interfaces/Reaction/Comments/DeleteCommentReactionRequest';
import { environment } from '../../environment/environment';
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

  addReaction(request: CreatePostReactionRequest): Observable<{ statusCode: number }> {
    return this.http.post<void>(`${this.baseUrl}reacts/post`, request, {
      observe: 'response',
      withCredentials: true
    }).pipe(map((response: HttpResponse<void>) => ({ statusCode: response.status })));
  }

  deleteReaction(request: CreatePostReactionRequest): Observable<{ statusCode: number }> {
    return this.http.delete<void>(`${this.baseUrl}reacts/post`, {
      body: request,
      observe: 'response',
      withCredentials: true
    }).pipe(map((response: HttpResponse<void>) => ({ statusCode: response.status })));
  }

  addReactionComment(request: CreatePostReactionRequest): Observable<ResponseWrapper<boolean>> {
    return this.http.post<ResponseWrapper<boolean>>(`${this.baseUrl}reacts/post/comment`, request, {
      withCredentials: true
    });
  }

  deleteReactionComment(request: DeletePostReactionRequest): Observable<ResponseWrapper<boolean>> {
    return this.http.delete<ResponseWrapper<boolean>>(`${this.baseUrl}reacts/post/comment`, {
      body: request,
      withCredentials: true
    });
  }

  // ---------------- Fetch Posts Reactions ----------------
  getUsersReacted(request: GetPagedCommentRequest): Observable<ResponseWrapper<SimpleUserProfile[]>> {
    return this.http.post<ResponseWrapper<SimpleUserProfile[]>>(`${this.baseUrl}reacts/post/users`, request, {
      withCredentials: true
    });
  }

}
