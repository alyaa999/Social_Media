import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroment/enviroment';
import { ResponseWrapper } from '../Interfaces/response-wrapper/response-wrapper';
import { CommentResponse } from '../Interfaces/Comment/comment-response';
import { CreateCommentRequest } from '../Interfaces/Comment/create-comment-request';
import { EditCommentRequest } from '../Interfaces/Comment/edit-comment-request';
import { GetPagedCommentRequest } from '../Interfaces/Comment/get-paged-comment-request';
import { PaginationResponseWrapper } from '../Interfaces/response-wrapper/PaginationResponseWrapper';
import { AggregatedComment } from '../Interfaces/Comment/aggregated-comment';
import { ProfileService } from './profile.service';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private baseUrl = `${environment.apiBaseUrl}comment/`;

  constructor(
    private _http: HttpClient,
    private profileService: ProfileService
  ) {}

CreateComment(data: CreateCommentRequest) {
  const formData = new FormData();
  console.log("Creating comment with data:", data);

  formData.append("PostId", data.PostId);
  formData.append("Content", data.Content);
  formData.append("HasMedia", String(data.HasMedia));
  formData.append("MediaType", String(data.MediaType));

  if (data.HasMedia && data.Media) {
    formData.append("Media", data.Media);
  }

  const userId = localStorage.getItem('userId');
  if (!userId) {
    throw new Error('User not logged in');
  }

  // First create the comment, then get the user profile and combine them
  return this._http.post<ResponseWrapper<CommentResponse>>(
    this.baseUrl, 
    formData
  ).pipe(
    switchMap(response => {
      // After comment is created, get the user profile
      return this.profileService.GetProfileByUserIdMin(userId).pipe(
        map(profileResponse => {
          // Combine the comment response with the user profile
          return {
            ...response,
            data: {
              ...response.data,
              author: profileResponse.data
            }
          };
        })
      );
    })
  );
}


EditComment(data: EditCommentRequest){
  const formData = new FormData();

  
  formData.append("CommentId", data.CommentId);
  formData.append("Content", data.Content);
  formData.append("HasMedia", String(data.HasMedia));
  formData.append("MediaType", String(data.MediaType));

  if(data.HasMedia && data.Media && data.MediaUrl){
    formData.append("Media", data.Media);
    formData.append("MediaUrl", data.MediaUrl);
  }

  return this._http.put<ResponseWrapper<CommentResponse>>(this.baseUrl, formData, {});
}

DeleteComment(id: string){
  return this._http.delete<ResponseWrapper<boolean>>(`${this.baseUrl}${id}`, {});
}

GetCommentList(request: GetPagedCommentRequest){
  return this._http.post<PaginationResponseWrapper<AggregatedComment[]>>(`${this.baseUrl}list`, request, {});
}

}
