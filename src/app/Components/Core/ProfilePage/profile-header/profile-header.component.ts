import { Component, Input } from '@angular/core';
import { Profile } from '../../../../Interfaces/Profile/profile';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-profile-header',
  imports: [CommonModule],
  templateUrl: './profile-header.component.html',
  styleUrl: './profile-header.component.scss'
})
export class ProfileHeaderComponent {
  @Input() profile: Profile | null = null;
  @Input() isCurrentUser: boolean = false;
  @Input() isFollower: boolean = false;
}
