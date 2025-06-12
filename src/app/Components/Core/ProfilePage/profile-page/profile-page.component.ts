import { Component } from '@angular/core';
import { ProfileHeaderComponent } from '../profile-header/profile-header.component';
import { ProfilePostsComponent } from '../profile-posts/profile-posts.component';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [ProfileHeaderComponent, ProfilePostsComponent],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent {}
