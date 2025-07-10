import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Profile } from '../../../../Interfaces/Profile/profile';
import { ProfileService } from '../../../../Services/profile.service';
import { ProfileRequest } from '../../../../Interfaces/Profile/profile-request';

@Component({
  selector: 'app-edit-profile-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-profile-modal.component.html',
  styleUrl: './edit-profile-modal.component.scss'
})
export class EditProfileModalComponent {
  @Input() profile!: Profile;
  @Input() show: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Output() profileUpdated = new EventEmitter<Profile>();

  editedProfile: Partial<ProfileRequest> = {};
  profilePicFile?: File;
  coverPicFile?: File;
  isSubmitting = false;
  error: string | null = null;
  profilePicPreview: string | null = null;
  coverPicPreview: string | null = null;

  constructor(private profileService: ProfileService) {}

  ngOnInit() {
    // Initialize the form with current profile data
    this.editedProfile = {
      FirstName: this.profile.firstName,
      LastName: this.profile.lastName,
      UserName: this.profile.userName,
      Bio: this.profile.bio,
      Address: this.profile.address,
      MobileNo: this.profile.mobileNo
    };
  }

  onProfilePicChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.profilePicFile = file;
      this.editedProfile.ProfilePic = file;
      this.profilePicPreview = window.URL.createObjectURL(file);
    }
  }

  onCoverPicChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.coverPicFile = file;
      this.editedProfile.CoverPic = file;
      this.coverPicPreview = window.URL.createObjectURL(file);
    }
  }

  getProfilePicUrl(): string {
    return this.profilePicPreview || this.profile.profileUrl || 'assets/default-avatar.jpg';
  }

  getCoverPicUrl(): string {
    return this.coverPicPreview || this.profile.coverUrl || 'assets/default-cover.jpg';
  }

  ngOnDestroy() {
    // Clean up object URLs to prevent memory leaks
    if (this.profilePicPreview) {
      window.URL.revokeObjectURL(this.profilePicPreview);
    }
    if (this.coverPicPreview) {
      window.URL.revokeObjectURL(this.coverPicPreview);
    }
  }

  async onSubmit() {
    this.isSubmitting = true;
    this.error = null;

    try {
      const response = await this.profileService.UpdateProfile(this.editedProfile).toPromise();
      if (response && response.data) {
        this.profileUpdated.emit(response.data);
        this.close.emit();
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      this.error = 'Failed to update profile. Please try again.';
    } finally {
      this.isSubmitting = false;
    }
  }

  onClose() {
    this.close.emit();
  }
}
