import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SignupService {
  formData: any = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    username: '',
    birthdate: '',
    address: '',
    mobileNo: '',
    bio: '',
    profilePic: null,
    coverPhoto: null
  };

  resetData() {
    this.formData = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      username: '',
      birthdate: '',
      address: '',
      mobileNo: '',
      bio: '',
      profilePic: null,
      coverPhoto: null
    };
  }
}
