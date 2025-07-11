import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroment/enviroment';
import { FollowingListRequest, FollowListRequest } from '../Interfaces/Follow/Follow';
import { PaginationResponseWrapper } from '../Interfaces/response-wrapper/PaginationResponseWrapper';
import { ProfileAggregation } from '../Interfaces/Profile/profile-aggrigation';
import { Observable } from 'rxjs';
import { ResponseWrapper } from '../Interfaces/response-wrapper/response-wrapper';
import { IsFollowRequest } from '../Interfaces/Follow/IsFollow';

@Injectable({
  providedIn: 'root'
})
export class FollowService {
  private baseUrl = `${environment.apiBaseUrl}`; // adjust path as needed

  constructor(private http: HttpClient) {}

  private createHeader(userId: string) {
    return new HttpHeaders({
      'Authorization': environment.token,
      'Accept': 'application/json',
      'userId': userId
    });
  }

  getFollowers(request: FollowListRequest, userId: string): Observable<PaginationResponseWrapper<ProfileAggregation[]>> {
    return this.http.post<PaginationResponseWrapper<ProfileAggregation[]>>(
      `${this.baseUrl}followers`,
      request,
      { headers: this.createHeader(userId) }
    );
  }

  getFollowing(request: FollowingListRequest): Observable<PaginationResponseWrapper<ProfileAggregation[]>> {
    return this.http.post<PaginationResponseWrapper<ProfileAggregation[]>>(
      `${this.baseUrl}follow/following`,
      request
    );
  }

  follow(request : IsFollowRequest): Observable<ResponseWrapper<boolean>> {
    return this.http.post<ResponseWrapper<boolean>>(
      `${this.baseUrl}follow/follow`,
      request
    );
  }

  unfollow(request : IsFollowRequest): Observable<ResponseWrapper<boolean>> {
    return this.http.delete<ResponseWrapper<boolean>>(
      `${this.baseUrl}follow/unfollow`,
      {
        body : request,
      }
    );
  }

  isFollower(request : IsFollowRequest) : Observable<ResponseWrapper<boolean>> {
    return this.http.post<ResponseWrapper<boolean>>(
      `${this.baseUrl}follow/is-follower`,
      request
    );
  }

  isFollowing(request : IsFollowRequest) : Observable<ResponseWrapper<boolean>> {
    return this.http.post<ResponseWrapper<boolean>>(
      `${this.baseUrl}follow/is-following`,
      request
    );
  }
}
