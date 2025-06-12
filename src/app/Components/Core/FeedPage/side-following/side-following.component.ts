import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileAggregation } from '../../../../Interfaces/Profile/profile-aggrigation';

@Component({
  selector: 'app-side-following',
  imports: [CommonModule],
  templateUrl: './side-following.component.html',
  styleUrl: './side-following.component.scss'
})
export class SideFollowingComponent {
  followingList: ProfileAggregation[] = [
    {
      userId: '1',
      displayName: 'Alex Johnson',
      userName: 'alexj',
      profilePictureUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
      isFollowing: true,
      isFollower: true
    },
    {
      userId: '2',
      displayName: 'Maria Garcia',
      userName: 'mariag',
      profilePictureUrl: 'https://randomuser.me/api/portraits/women/2.jpg',
      isFollowing: true,
      isFollower: false
    },
    {
      userId: '3',
      displayName: 'James Wilson',
      userName: 'jamesw',
      profilePictureUrl: 'https://randomuser.me/api/portraits/men/3.jpg',
      isFollowing: true,
      isFollower: true
    },
    {
      userId: '4',
      displayName: 'Sarah Lee',
      userName: 'sarahlee',
      profilePictureUrl: 'https://randomuser.me/api/portraits/women/4.jpg',
      isFollowing: true,
      isFollower: false
    },
    {
      userId: '5',
      displayName: 'David Kim',
      userName: 'davidk',
      profilePictureUrl: 'https://randomuser.me/api/portraits/men/5.jpg',
      isFollowing: true,
      isFollower: true
    }
  ];
}
