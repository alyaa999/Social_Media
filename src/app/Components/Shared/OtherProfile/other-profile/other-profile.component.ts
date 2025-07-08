import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../../../Services/post.service';
import { ProfileService } from '../../../../Services/profile.service';

@Component({
  selector: 'app-other-profile',
  imports: [CommonModule, DatePipe],
  templateUrl: './other-profile.component.html',
  styleUrl: './other-profile.component.css'
})
export class OtherProfileComponent {
  profile: any = null;
  posts: any[] = [];
  isLoadingProfile = false;
  isLoadingPosts = false;
  errorProfile: string | null = null;
  errorPosts: string | null = null;
  isCurrentUser = false; // You can update this logic as needed

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private profileService: ProfileService
  ) {
    this.route.params.subscribe(params => {
      const otherId = params['otherId'];
      if (otherId) {
        this.loadProfile(otherId);
        this.loadPosts(otherId);
      }
    });
  }

  loadProfile(otherId: string) {
    this.isLoadingProfile = true;
    this.errorProfile = null;
    this.profileService.GetProfileByUserId(otherId).subscribe({
      next: (profile) => {
        this.profile = profile;
        this.isLoadingProfile = false;
      },
      error: (err) => {
        this.errorProfile = 'Failed to load profile.';
        this.isLoadingProfile = false;
      }
    });
  }

  loadPosts(otherId: string) {
    this.isLoadingPosts = true;
    this.errorPosts = null;
    this.postService.GetProfilePosts(otherId).subscribe({
      next: (response) => {
        // Assuming response is PaginationResponseWrapper<PostAggregationResponse[]>
        this.posts = response?.data || [];
        this.isLoadingPosts = false;
      },
      error: (err) => {
        this.errorPosts = 'Failed to load posts.';
        this.isLoadingPosts = false;
      }
    });
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
  }

  onImgError(event: Event, fallback: string) {
    const target = event.target as HTMLImageElement | null;
    if (target) {
      target.src = fallback;
    }
  }
}
