import { Injectable } from '@angular/core';
import { environment } from '../../enviroment/enviroment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ResponseWrapper } from '../Interfaces/response-wrapper/response-wrapper';
import { PostResponseDTO } from '../Interfaces/post/post-response-dto';
import { PostInputDto } from '../Interfaces/post/post-input-dto';
import { PostAggregationResponse } from '../Interfaces/post/post-aggrigation-response';
import { Observable } from 'rxjs';
import { PaginationResponseWrapper } from '../Interfaces/response-wrapper/PaginationResponseWrapper';
import { GetPagedCommentRequest } from '../Interfaces/Comment/get-paged-comment-request';
import { SimpleUserProfile } from '../Interfaces/post/simple-user-profile';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private baseUrl = environment.apiBaseUrl;

  
  constructor(private _http: HttpClient) { }

  AddPost(postDto: PostInputDto, userId: string): Observable<ResponseWrapper<PostResponseDTO>> {
    const formData = this.buildFormData(postDto); // Convert to FormData

    return this._http.post<ResponseWrapper<PostResponseDTO>>(`${this.baseUrl}AddPost/${userId}`, formData, {
    });
  }

  UpdatePost(postDto: PostInputDto, userId: string): Observable<ResponseWrapper<PostResponseDTO>> {
    const formData = this.buildFormData(postDto); // Convert to FormData

    return this._http.put<ResponseWrapper<PostResponseDTO>>(`${this.baseUrl}UpdatePost/${userId}`, formData, {
    });
  }

  DeletePost(postId: string, userId: string): Observable<ResponseWrapper<PostResponseDTO>> {
    return this._http.delete<ResponseWrapper<PostResponseDTO>>(`${this.baseUrl}DeletePost/${postId}/${userId}`, {
    });
  }

  // ---------------- Fetch Posts Aggregation ----------------

  private AggregationBaseUrl = `${environment.apiBaseUrl}`;

  GetProfilePosts(userId : string, next?: string): Observable<PaginationResponseWrapper<PostAggregationResponse[]>> {
    let params: string = '';
    if (next !== undefined) {
      params += `&next=${next}`;
    }
    return this._http.get< PaginationResponseWrapper<PostAggregationResponse[]>>(`${this.AggregationBaseUrl}post/user/${userId}`, {
    });
  }

  GetReactedPosts(userId: string, next?: string): Observable<ResponseWrapper<PostAggregationResponse[]>> {
    let params: string = '';
    if (next !== undefined) {
      params += `&next=${next}`;
    }
    return this._http.get<ResponseWrapper<PostAggregationResponse[]>>(`${this.AggregationBaseUrl}reacted/${userId}?${params}`, {
    });
  }

  GetSinglePost(postId: string, userId: string): Observable<ResponseWrapper<PostAggregationResponse>> {
    return this._http.get<ResponseWrapper<PostAggregationResponse>>(`${this.AggregationBaseUrl}/${postId}/${userId}`, {
    });
  }

  // ---------------- Fetch Posts Aggrigation ----------------
  private buildFormData(postDto: PostInputDto): FormData {
    const formData = new FormData();
    for (const key of Object.keys(postDto) as (keyof PostInputDto)[]) {
      const value = postDto[key];
      if (value !== undefined && value !== null) {
        formData.append(key as string, value as any);
      }
    }
    return formData;
  }
}