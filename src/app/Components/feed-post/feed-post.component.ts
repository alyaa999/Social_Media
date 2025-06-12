import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostAuthorProfileComponent } from '../post-author-profile/post-author-profile.component';
import { Post } from '../../Interfaces/feed/post';

@Component({
  selector: 'app-feed-post',
  standalone: true,
  imports: [CommonModule, PostAuthorProfileComponent],
  templateUrl: './feed-post.component.html'
})
export class FeedPostComponent {
  @Input() post!: Post;
} 