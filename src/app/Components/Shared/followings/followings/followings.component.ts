import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FollowService } from '../../../../Services/follow.service';
import { ProfileAggregation } from '../../../../Interfaces/Profile/profile-aggrigation';
import { FollowingListRequest } from '../../../../Interfaces/Follow/Follow';
import { Router } from '@angular/router';

@Component({
  selector: 'app-followings',
  imports: [CommonModule],
  templateUrl: './followings.component.html',
  styleUrls: ['./followings.component.css']
})
export class FollowingsComponent {
  followingsUsers: ProfileAggregation[] = [];
  loading: boolean = false;
  request: FollowingListRequest = {
    OtherId: localStorage.getItem('userId') || '',
    next: ''
  };

  constructor(private followService: FollowService, private router: Router) {
    this.loadFollowings();
  }

  private loadFollowings() {
    this.loading = true;
    this.followService.getFollowing(this.request).subscribe({
      next: (response) => {
        this.followingsUsers = response.data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading followings:', error);
        this.loading = false;
      }
    });
  }

  viewProfile(userId: string) {
    this.router.navigate(['/other', userId]);
  }
}