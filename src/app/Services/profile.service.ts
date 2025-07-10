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

  private baseUrl = environment.apiBaseUrl;  

  constructor(private _http: HttpClient) {}

  

  GetProfileByUserId(userId: string){
    return this._http.get<ResponseWrapper<Profile>>(`${this.baseUrl}profile/${userId}`);
  }

  GetProfileByUserName(userName: string){
    return this._http.get<ResponseWrapper<Profile>>(`${this.baseUrl}username/${userName}`);
  }

  GetProfileByUserIdMin(userId: string){
    return this._http.get<ResponseWrapper<SimpleUserProfile>>(`${this.baseUrl}profile/min/${userId}`);
  }

  GetProfileByUserNameMin(userName: string){
    return this._http.get<ResponseWrapper<SimpleUserProfile>>(`${this.baseUrl}/min/username/${userName}`);
  }

  AddProfile(Email: string, profile: ProfileRequest){

    const formData = new FormData();
    const birthDate = new Date(profile.BirthDate).toISOString().split('T')[0];
    formData.append("BirthDate", birthDate);

    // Append UserName and Email as they are required for initial profile
    if(profile.UserName) {
      formData.append("UserName", profile.UserName);
    }
    
    if(profile.Email) {
      formData.append("Email", profile.Email);
    }

    // Add profile and cover pictures if they exist
    if(profile.ProfilePic) {
      formData.append("ProfilePic", profile.ProfilePic);
    }
    
    if(profile.CoverPic) {
      formData.append("CoverPic", profile.CoverPic);
    }

    return this._http.post<ResponseWrapper<Profile>>(`${this.baseUrl}profile`, formData);
  }

  UpdateProfile(profile:Partial<ProfileRequest>){
    const formData = new FormData();
    
    // Only append BirthDate if it exists
    if (profile.BirthDate) {
      const birthDate = new Date(profile.BirthDate).toISOString().split('T')[0];
      formData.append("BirthDate", birthDate);
    }

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

    if(profile.Email)
      formData.append("Email", profile.Email);

    if(profile.ProfilePic)
      formData.append("ProfilePic", profile.ProfilePic);

    if(profile.CoverPic)
      formData.append("CoverPic", profile.CoverPic);

    // Let the browser set the appropriate Content-Type for FormData
    return this._http.patch<ResponseWrapper<Profile>>(`${this.baseUrl}profile`, formData);
  }

  DeleteProfile(userId: string){
    return this._http.delete<ResponseWrapper<boolean>>(this.baseUrl);
  }
}
