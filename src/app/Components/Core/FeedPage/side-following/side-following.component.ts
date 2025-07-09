import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProfileAggregation } from '../../../../Interfaces/Profile/profile-aggrigation';
import { FollowService } from '../../../../Services/follow.service';
import { FollowingListRequest } from '../../../../Interfaces/Follow/Follow';

@Component({
  selector: 'app-side-following',
  imports: [CommonModule, RouterModule],
  templateUrl: './side-following.component.html',
  styleUrl: './side-following.component.scss'
})
export class SideFollowingComponent {
  followingList: ProfileAggregation[] = [];

  constructor(_followService : FollowService) {

    const request: FollowingListRequest = {
      OtherId: localStorage.getItem('userId') || '',
      next: "" 
    }

    _followService.getFollowing(request).subscribe({
      next: (data) => {
        console.log('Following list response:', data);
        this.followingList = data.data;
        console.log('Following list loaded:', this.followingList);
      },
      error: (err) => {
        console.error('Error loading following list:', err);
      }
    });

  }
}
