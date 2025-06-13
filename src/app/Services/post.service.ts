import { Injectable } from '@angular/core';
import { environment } from '../../enviroment/enviroment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ResponseWrapper } from '../Interfaces/response-wrapper/response-wrapper';
import { PostResponseDTO } from '../Interfaces/post/post-response-dto';
import { PostInputDto } from '../Interfaces/post/post-input-dto';
import { PostAggregationResponse } from '../Interfaces/post/post-aggrigation-response';
import { Observable } from 'rxjs';
import { PaginationResponseWrapper } from '../Interfaces/response-wrapper/PaginationResponseWrapper';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private headers = new HttpHeaders()
    .set("Authorization", environment.token)
    .set("Accept", "application/json");

  private baseUrl = `${environment.apiBaseUrl}/api/public/PublicPost/`;
  private createHeader(userId: string) {
    return this.headers.set("userId", userId);
  }
  constructor(private _http: HttpClient) { }

  AddPost(postDto: PostInputDto, userId: string): Observable<ResponseWrapper<PostResponseDTO>> {
    const formData = this.buildFormData(postDto); // Convert to FormData

    return this._http.post<ResponseWrapper<PostResponseDTO>>(`${this.baseUrl}AddPost/${userId}`, formData, {
      headers: this.createHeader(userId)
    });
  }

  UpdatePost(postDto: PostInputDto, userId: string): Observable<ResponseWrapper<PostResponseDTO>> {
    const formData = this.buildFormData(postDto); // Convert to FormData

    return this._http.put<ResponseWrapper<PostResponseDTO>>(`${this.baseUrl}UpdatePost/${userId}`, formData, {
      headers: this.createHeader(userId)
    });
  }

  DeletePost(postId: string, userId: string): Observable<ResponseWrapper<PostResponseDTO>> {
    return this._http.delete<ResponseWrapper<PostResponseDTO>>(`${this.baseUrl}DeletePost/${postId}/${userId}`, {
      headers: this.createHeader(userId)
    });
  }

  // ---------------- Fetch Posts Aggregation ----------------

  private AggregationBaseUrl = `${environment.apiBaseUrl}/api/public/Posts/`;

  GetProfilePosts(OtherId: string, userId: string, next?: string): Observable< PaginationResponseWrapper<PostAggregationResponse[]>> {
    let params: string = '';
    if (next !== undefined) {
      params += `&next=${next}`;
    }
    return this._http.get< PaginationResponseWrapper<PostAggregationResponse[]>>(`${this.AggregationBaseUrl}user/${OtherId}?${params}`, {
      headers: this.createHeader(userId)
    });
  }

  GetReactedPosts(userId: string, next?: string): Observable<ResponseWrapper<PostAggregationResponse[]>> {
    let params: string = '';
    if (next !== undefined) {
      params += `&next=${next}`;
    }
    return this._http.get<ResponseWrapper<PostAggregationResponse[]>>(`${this.AggregationBaseUrl}reacted/${userId}?${params}`, {
      headers: this.createHeader(userId)
    });
  }

  GetSinglePost(postId: string, userId: string): Observable<ResponseWrapper<PostAggregationResponse>> {
    return this._http.get<ResponseWrapper<PostAggregationResponse>>(`${this.AggregationBaseUrl}/${postId}/${userId}`, {
      headers: this.createHeader(userId)
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

  /**
   * Here, key is inferred as string, but postDto is typed as PostInputDto, 
   * so postDto[key] gives a type error because TypeScript can't guarantee that key is a valid key of PostInputDto.
   * Also, formData.append(key, postDto[key]) may give a type error because postDto[key] could be of any type, not just string | Blob.
   */

  //   private buildFormData(postDto: PostInputDto): FormData {
  //   const formData = new FormData();
  //   for (const key in postDto) {
  //     if (postDto[key] !== undefined && postDto[key] !== null) {
  //       formData.append(key, postDto[key]);
  //     }
  //   }
  //   return formData;
  // }

}