import { ProfileAggregation } from './../../../../Interfaces/Profile/profile-aggrigation';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FollowService } from '../../../../Services/follow.service';
import { FollowingListRequest } from '../../../../Interfaces/Follow/Follow';

@Component({
  selector: 'app-followers',
  imports: [CommonModule],
  templateUrl: './followers.component.html',
  styleUrl: './followers.component.css'
})
export class FollowersComponent {
  request: FollowingListRequest = {
    OtherId: localStorage.getItem('userId') || '',
    next: ""
  };
  loading: boolean = false;
  followingsUsers: ProfileAggregation[] = [];

  constructor(private followService: FollowService) {
    this.loadFollowers();
  }

  private loadFollowers(): void {
    this.loading = true;
    this.followService.getFollowing(this.request).subscribe({
      next: (response: { data: ProfileAggregation[] }) => {
        this.followingsUsers = response.data;
        this.loading = false;
      },
      error: (error: any) => {
        console.error('Error loading followings:', error);
        this.loading = false;
      }
    });
  }
}
