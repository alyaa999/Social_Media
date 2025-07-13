import { Component, Input, Output, EventEmitter } from '@angular/core';
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
  @Output() like = new EventEmitter<Post>();
  @Output() comments = new EventEmitter<string>();
  @Output() reactions = new EventEmitter<string>();

  toggleLike(post: Post) {
    this.like.emit(post);
  }

  openCommentsModal(postId: string) {
    this.comments.emit(postId);
  }

  openReactionsModal(postId: string) {
    this.reactions.emit(postId);
  }
}
