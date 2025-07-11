import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileService } from '../../../../Services/profile.service';
import { Profile } from '../../../../Interfaces/Profile/profile';
import { HttpErrorResponse } from '@angular/common/http';
import { EditProfileModalComponent } from '../edit-profile-modal/edit-profile-modal.component';
import { FollowModalComponent } from '../../../Shared/follow-modal/follow-modal.component';
import { FollowService } from '../../../../Services/follow.service';
import { ProfileAggregation } from '../../../../Interfaces/Profile/profile-aggrigation';

@Component({
  selector: 'app-profile-header',
  standalone: true,
  imports: [CommonModule, EditProfileModalComponent, FollowModalComponent],
  templateUrl: './profile-header.component.html',
  styleUrl: './profile-header.component.scss'
})
export class ProfileHeaderComponent implements OnInit {
  profile: Profile | null = null;
  isCurrentUser: boolean = false;
  error: string | null = null;
  isLoading: boolean = true;
  showEditModal: boolean = false;

  // Follow Modal state
  showFollowModal: boolean = false;
  followModalTitle: string = '';
  followModalUsers: ProfileAggregation[] = [];
  isLoadingFollowList: boolean = false;

  constructor(
    private profileService: ProfileService,
    private followService: FollowService
  ) {}

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

  openEditModal() {
    this.showEditModal = true;
  }

  closeEditModal() {
    this.showEditModal = false;
  }

  onProfileUpdated(updatedProfile: Profile) {
    this.profile = updatedProfile;
    this.showEditModal = false;
  }

  openFollowModal(type: 'followers' | 'following') {
    if (!this.profile?.userId) return;

    this.isLoadingFollowList = true;
    this.showFollowModal = true;
    this.followModalTitle = type === 'followers' ? 'Followers' : 'Following';

    if (type === 'followers') {
      const request = {
        OtherId: this.profile.userId,
        next: ''
      };

      this.followService.getFollowers(request, this.profile.userId).subscribe({
        next: (response) => {
          this.followModalUsers = response.data;
          this.isLoadingFollowList = false;
        },
        error: (error) => {
          console.error(`Error loading ${type}:`, error);
          this.isLoadingFollowList = false;
        }
      });
    } else {
      const request = {
        OtherId: this.profile.userId,
        next: ''
      };

      this.followService.getFollowing(request).subscribe({
        next: (response) => {
          this.followModalUsers = response.data;
          this.isLoadingFollowList = false;
        },
        error: (error) => {
          console.error(`Error loading ${type}:`, error);
          this.isLoadingFollowList = false;
        }
      });
    }
  }

  closeFollowModal() {
    this.showFollowModal = false;
    this.followModalUsers = [];
  }
}

