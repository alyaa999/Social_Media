import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../enviroment/enviroment';
import { ResponseWrapper } from '../Interfaces/response-wrapper/response-wrapper';
import { Profile } from '../Interfaces/Profile/profile';
import { SimpleUserProfile } from '../Interfaces/Profile/simple-user-profile';
import { ProfileRequest } from '../Interfaces/Profile/profile-request';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private headers = new HttpHeaders()
    .set("Authorization", environment.token)
    .set("Accept", "application/json");

  private baseUrl = `${environment.apiBaseUrl}/api/public/profile/`;  

  constructor(private _http: HttpClient) {}

  private createHeader(userId: string,  Email?:string){
    if(Email !== undefined)
    {
      return this.headers.set("userId", userId).set("Email", Email);
    }
    return this.headers.set("userId", userId);
  }

  GetProfileByUserId(userId: string){
    return this._http.get<ResponseWrapper<Profile>>(`${this.baseUrl}id/${userId}`);
  }

  GetProfileByUserName(userName: string){
    return this._http.get<ResponseWrapper<Profile>>(`${this.baseUrl}username/${userName}`);
  }

  GetProfileByUserIdMin(userId: string){
    return this._http.get<ResponseWrapper<SimpleUserProfile>>(`${this.baseUrl}min/id/${userId}`);
  }

  GetProfileByUserNameMin(userName: string){
    return this._http.get<ResponseWrapper<SimpleUserProfile>>(`${this.baseUrl}/min/username/${userName}`);
  }

  AddProfile(userId: string, Email: string, profile: ProfileRequest){
    const headers = this.createHeader(userId, Email);

    const formData = new FormData();
    formData.append("BirthDate", String(profile.BirthDate));

    if(profile.FirstName)
      formData.append("FirstName", profile.FirstName);

    if(profile.LastName)
      formData.append("LastName", profile.LastName);

    if(profile.UserName)
      formData.append("UserName", profile.UserName);

    if(profile.Address)
      formData.append("Address", profile.Address);

    if(profile.MobileNo)
      formData.append("MobileNo", profile.MobileNo);

    if(profile.Bio)
      formData.append("Bio", profile.Bio);

    if(profile.ProfilePic)
      formData.append("ProfilePic", profile.ProfilePic);

    if(profile.CoverPic)
      formData.append("CoverPic", profile.CoverPic);

    return this._http.post<ResponseWrapper<Profile>>(this.baseUrl, formData, {headers});

  }

  UpdateProfile(Email: string, userId: string,  profile:ProfileRequest){
    const headers = this.createHeader(userId, Email);

    const formData = new FormData();
    formData.append("BirthDate", String(profile.BirthDate));

    if(profile.FirstName)
      formData.append("FirstName", profile.FirstName);

    if(profile.LastName)
      formData.append("LastName", profile.LastName);

    if(profile.UserName)
      formData.append("UserName", profile.UserName);

    if(profile.Address)
      formData.append("Address", profile.Address);

    if(profile.MobileNo)
      formData.append("MobileNo", profile.MobileNo);

    if(profile.Bio)
      formData.append("Bio", profile.Bio);

    if(profile.ProfilePic)
      formData.append("ProfilePic", profile.ProfilePic);

    if(profile.CoverPic)
      formData.append("CoverPic", profile.CoverPic);

    return this._http.patch<ResponseWrapper<Profile>>(this.baseUrl, formData, {headers});
  }

  DeleteProfile(userId: string){
    const headers = this.createHeader(userId);
    
    return this._http.delete<ResponseWrapper<boolean>>(this.baseUrl, {headers});
  }
}
