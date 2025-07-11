import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProfileAggregation } from '../../../Interfaces/Profile/profile-aggrigation';
import { FollowService } from '../../../Services/follow.service';
import { IsFollowRequest } from '../../../Interfaces/Follow/IsFollow';

@Component({
  selector: 'app-follow-modal',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './follow-modal.component.html',
  styleUrl: './follow-modal.component.css'
})
export class FollowModalComponent {
  @Input() users: ProfileAggregation[] = [];
  @Input() title: string = '';
  @Input() visible: boolean = false;
  @Input() isLoading: boolean = false;
  @Output() close = new EventEmitter<void>();

  constructor(private followService: FollowService) { }

  onClose() {
    this.close.emit();
  }

  toggleFollow(user: ProfileAggregation) {
    const request: IsFollowRequest = {
      otherId: user.userId
    };

    if (user.isFollowing) {
      this.followService.unfollow(request).subscribe({
        next: (response) => {
          if (response.data) {
            user.isFollowing = false;
          }
        },
        error: (error) => {
          console.error('Error unfollowing user:', error);
        }
      });
    } else {
      this.followService.follow(request).subscribe({
        next: (response) => {
          if (response.data) {
            user.isFollowing = true;
          }
        },
        error: (error) => {
          console.error('Error following user:', error);
        }
      });
    }
  }
}
