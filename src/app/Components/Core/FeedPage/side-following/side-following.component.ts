import { AfterContentInit, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProfileAggregation } from '../../../../Interfaces/Profile/profile-aggrigation';
import { FollowService } from '../../../../Services/follow.service';
import { FollowingListRequest } from '../../../../Interfaces/Follow/Follow';
import { AuthService } from '../../../../Services/auth.service';

@Component({
  selector: 'app-side-following',
  imports: [CommonModule, RouterModule],
  templateUrl: './side-following.component.html',
  styleUrl: './side-following.component.scss'
})
export class SideFollowingComponent implements AfterContentInit {
  followingList: ProfileAggregation[] = [];
  isLoading: boolean = false;

  constructor(private _followService: FollowService, private _authService: AuthService) { }

  ngAfterContentInit(): void {
    this.isLoading = true;
    this._authService.verify().subscribe({
      next: (response) => {
        const request: FollowingListRequest = {
          OtherId: response.id,
          next: ""
        };

        this._followService.getFollowing(request).subscribe({
          next: (data) => {
            console.log("followingRequest:" , request);
            console.log('Following list response:', data);
            this.followingList = data.data;
            console.log('Following list loaded:', this.followingList);
            this.isLoading = false;
          },
          error: (err) => {
            console.error('Error loading following list:', err);
            this.isLoading = false;
          }
        });
      },
      error: (err) => {
        console.error('Error verifying user:', err);
        this.isLoading = false;
      }
    });
  }
}
