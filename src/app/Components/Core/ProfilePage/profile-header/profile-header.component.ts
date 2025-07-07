import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileService } from '../../../../Services/profile.service';
import { Profile } from '../../../../Interfaces/Profile/profile';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-profile-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-header.component.html',
  styleUrl: './profile-header.component.scss'
})
export class ProfileHeaderComponent implements OnInit {
  profile: Profile | null = null;
  isCurrentUser: boolean = false;
  error: string | null = null;
  isLoading: boolean = true;

  constructor(private profileService: ProfileService) {}

  ngOnInit() {
    this.loadProfile();
  }

  loadProfile() {
    this.isLoading = true;
    this.error = null;
    const userId = localStorage.getItem('userId');
    if (!userId) {
      this.error = 'No user ID found in local storage';
      this.isLoading = false;
      return;
    }
    this.profileService.GetProfileByUserId(userId)
      .subscribe({
        next: (response) => {
          if (response && response.data) {
            this.profile = response.data;
            this.isCurrentUser = true;
          } else {
            this.error = 'Failed to load profile';
          }
          this.isLoading = false;
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error loading profile:', error);
          this.error = 'Failed to load profile. Please try again.';
          this.isLoading = false;
        }
      });
  }
}

