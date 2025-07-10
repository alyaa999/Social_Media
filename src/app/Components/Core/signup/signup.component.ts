import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SignupService } from './signup.service';
import { Step1InitialAccountComponent } from './step1-initial-account/step1-initial-account.component';

export interface SignupData {
  email: string;
  password: string;
}
import { Step2ProfileInfoComponent } from "./step2-profile-info/step2-profile-info.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Step3PersonalDetailsComponent } from "./step3-personal-details/step3-personal-details.component";
import { Step4CustomizeProfileComponent } from "./step4-customize-profile/step4-customize-profile.component";
import { Step5WelcomeScreenComponent } from "./step5-welcome-screen/step5-welcome-screen.component";
import { AuthService } from '../../../Services/auth.service';
import { ProfileService } from '../../../Services/profile.service';
import { ProfileRequest } from '../../../Interfaces/Profile/profile-request';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  standalone: true,
  imports: [
    Step1InitialAccountComponent, 
    Step2ProfileInfoComponent, 
    CommonModule, 
    FormsModule, 
    Step3PersonalDetailsComponent, 
    Step4CustomizeProfileComponent, 
    Step5WelcomeScreenComponent
  ]
})
export class SignupComponent {
  step = 1;
  userEmail: string = '';
  
  // Track profile data through steps
  profileData: ProfileRequest = {
    BirthDate: new Date(),
    Email: '',
    UserName: '',
    FirstName: '',
    LastName: '',
    Bio: '',
    Address: '',
    MobileNo: ''
  };

  private authService = inject(AuthService);
  private profileService = inject(ProfileService);
  private router = inject(Router);

  constructor(public signup: SignupService) {}

  async handleInitialSignup(data: SignupData) {
    try {
      if (!data?.email || !data?.password) {
        throw new Error('Email and password are required');
      }

      // Register the user (this returns no content)
      await firstValueFrom(this.authService.register({ 
        email: data.email, 
        password: data.password 
      }));
      
      // After successful registration, login to get the token
      await firstValueFrom(this.authService.login({ 
        email: data.email, 
        password: data.password 
      }));
      
      // Store email and create initial profile
      this.userEmail = data.email;
      const username = data.email.split('@')[0];
      
      this.profileData = {
        ...this.profileData,
        UserName: username,
        Email: data.email
      };
      
      await firstValueFrom(this.profileService.AddProfile(data.email, this.profileData));
      
      // Move to next step
      this.next();
    } catch (error) {
      console.error('Registration error:', error);
      // TODO: Add proper error handling
      if (error instanceof Error) {
        // You can add error handling logic here, for example:
        // this.errorMessage = error.message;
      }
    }
  }

  async handleProfileUpdate(stepData: Partial<ProfileRequest>) {
    try {
      // Merge the new data with existing profile data
      this.profileData = { ...this.profileData, ...stepData };

      if (this.step === 4) {
        // On the final step, send all collected data
        await firstValueFrom(this.profileService.UpdateProfile(this.profileData));
        this.next(); // Move to welcome screen
      } else {
        // Just move to next step if not final
        this.next();
      }
    } catch (error) {
      console.error('Profile update error:', error);
      // Handle error (show message to user)
    }
  }

  next() {
    this.step++;
  }

  prev() {
    this.step--;
  }

  reset() {
    this.step = 1;
    this.signup.resetData();
  }

  async completeSignup() {
    try {
      // Final profile update with all collected data
      await firstValueFrom(this.profileService.UpdateProfile(this.profileData));
      this.step = 5; // move to welcome screen
      
      // Navigate to feed after a short delay to show welcome screen
      setTimeout(() => {
        this.router.navigate(['/feed']);
      }, 2000);
    } catch (error) {
      console.error('Final profile update error:', error);
      // Handle error
    }
  }
}
