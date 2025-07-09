import { Injectable } from '@angular/core';
import { environment } from '../../enviroment/enviroment';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, switchMap, map } from 'rxjs/operators';
import { ProfileService } from './profile.service';
import { v4 as uuidv4 } from 'uuid';
import { ResponseWrapper } from '../Interfaces/response-wrapper/response-wrapper';
import { PostResponseDTO } from '../Interfaces/post/post-response-dto';
import { PostInputDto } from '../Interfaces/post/post-input-dto';
import { PostCreateDto } from '../Interfaces/post/post-create-dto';
import { PostAggregationResponse } from '../Interfaces/post/post-aggrigation-response';
import { PaginationResponseWrapper } from '../Interfaces/response-wrapper/PaginationResponseWrapper';
import { GetPagedCommentRequest } from '../Interfaces/Comment/get-paged-comment-request';
import { SimpleUserProfile } from '../Interfaces/post/simple-user-profile';
import { MediaType, Privacy } from '../Interfaces/feed/enums';
import { Media } from '../Interfaces/post/media';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private baseUrl = environment.apiBaseUrl;


  constructor(
    private _http: HttpClient,
    private profileService: ProfileService
  ) { }

  AddPost(postDto: PostCreateDto): Observable<ResponseWrapper<PostResponseDTO>> {
    const formData = this.buildFormData(postDto);
    const userId = localStorage.getItem('userId');
    
    if (!userId) {
      return throwError(() => new Error('User not logged in'));
    }

    // Ensure HasMedia is always sent
    formData.append('HasMedia', String(postDto.Media && postDto.Media.length > 0));

    return this._http.post<ResponseWrapper<PostResponseDTO>>(
      `${this.baseUrl}post`,
      formData
    ).pipe(
      switchMap(response => {
        // After post is created, get the user profile
        return this.profileService.GetProfileByUserIdMin(userId).pipe(
          map(profileResponse => {
            // Combine the post response with the user profile
            return {
              ...response,
              data: {
                ...response.data,
                author: profileResponse.data
              }
            };
          })
        );
      }),
      tap(response => {
        console.log('Post created successfully with author:', response);
      }),
      catchError((error) => {
        console.error('--- Full Error Response ---');
        console.error(error);

        // Log detailed validation errors if they exist
        if (error.error && error.error.errors) {
          console.error('--- Backend Validation Errors ---');
          console.error(error.error.errors);
        }
        
        return throwError(() => error);
      })
    );
  }

  UpdatePost(postDto: PostInputDto, userId: string): Observable<ResponseWrapper<PostResponseDTO>> {
    const formData = this.buildUpdateFormData(postDto);

    return this._http.put<ResponseWrapper<PostResponseDTO>>(`${this.baseUrl}post`, formData, {});
  }

  DeletePost(postId: string, userId: string): Observable<ResponseWrapper<PostResponseDTO>> {
    return this._http.delete<ResponseWrapper<PostResponseDTO>>(`${this.baseUrl}DeletePost/${postId}/${userId}`, {
    });
  }

  // ---------------- Fetch Posts Aggregation ----------------

  private AggregationBaseUrl = `${environment.apiBaseUrl}`;

  GetProfilePosts(userId: string, next?: string): Observable<PaginationResponseWrapper<PostAggregationResponse[]>> {
    let params: string = '';
    if (next !== undefined) {
      params += `&next=${next}`;
    }
    return this._http.get<PaginationResponseWrapper<PostAggregationResponse[]>>(`${this.AggregationBaseUrl}post/user/${userId}`, {
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
  private buildUpdateFormData(postDto: PostInputDto): FormData {
    const formData = new FormData();

    // Append all fields from the PostInputDto for the update operation
    formData.append('PostId', postDto.PostId);
    formData.append('AuthorId', postDto.AuthorId);
    formData.append('Content', postDto.Content);
    formData.append('Privacy', String(postDto.Privacy));
    formData.append('MediaType', String(postDto.MediaType));
    formData.append('HasMedia', String(postDto.HasMedia));

    if (postDto.Media && postDto.Media.length > 0) {
      postDto.Media.forEach((media: Media, index: number) => {
        if ((media as any).file instanceof File) {
          formData.append(`MediaFiles`, (media as any).file);
        } else if (media.MediaUrl) {
          formData.append(`MediaUrls[${index}]`, media.MediaUrl);
        }
      });
    }

    return formData;
  }

  private buildFormData(postDto: any): FormData {
    const formData = new FormData();
    formData.append('Content', postDto.Content);
    formData.append('Privacy', String(postDto.Privacy));
    formData.append('MediaType', String(postDto.MediaType));
    
    const mediaArr = postDto.Media;
    if (mediaArr && mediaArr.length > 0) {
      mediaArr.forEach((media: any, index: number) => {
        if (media.File instanceof File) {
          formData.append('Media', media.File);
        }
      });
    }
    
    // Log the FormData for debugging
    console.log('--- FormData Contents ---');
    formData.forEach((value, key) => {
      console.log(key, value);
    });
    console.log('-------------------------');
    return formData;
  }
}