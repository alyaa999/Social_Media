import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewPostComponent } from '../../../Shared/new-post/new-post.component';
import { Post, STATIC_POSTS } from '../../../../Interfaces/feed/post';
import { SimpleUserProfile, STATIC_REACTIONS } from '../../../../Interfaces/post/simple-user-profile';
import { CommentModalComponent } from '../../../Shared/comment-modal/comment-modal.component';
import { AggregatedComment, STATIC_COMMENTS } from '../../../../Interfaces/Comment/aggregated-comment';
import { v4 as uuidv4 } from 'uuid';
import { FeedService } from '../../../../Services/feed.service';
import { CommentService } from '../../../../Services/comment.service';
import { GetPagedCommentRequest } from '../../../../Interfaces/Comment/get-paged-comment-request';

@Component({
  selector: 'app-feed-content',
  standalone: true,
  imports: [CommonModule, NewPostComponent, CommentModalComponent],
  templateUrl: './feed-content.component.html',
  styleUrls: ['./feed-content.component.scss']
})
export class FeedContentComponent implements OnInit {
  posts: Post[] = [];
  isLoading = true;
  error: string | null = null;

  showModal: boolean = false;
  modalMode: 'comments' | 'reactions' = 'comments';
  selectedComments: AggregatedComment[] = [];
  selectedReactions: SimpleUserProfile[] = [];
  selectedPostId: string | null = null;

  constructor(private feedService: FeedService, private commentService: CommentService) {}

  openCommentsModal(postId: string) {
    this.selectedReactions = []; // Clear reactions before opening comments

    const req : GetPagedCommentRequest = {
      PostId: postId,
      Next: ""
    }

    this.commentService.GetCommentList(req).subscribe({
      next: (data) => {
        this.selectedComments = data.data;
        console.log('Comments loaded:', data);
      },
      error: (err) => {
        console.error('Error loading comments:', err);
      }
    });

    this.modalMode = 'comments';
    this.showModal = true;
    this.selectedPostId = postId;
  }

  openReactionsModal(postId: string) {
    this.selectedComments = []; // Clear comments before opening reactions
    // For demo, use STATIC_REACTIONS for all posts
    // In real app, filter by postId
    this.selectedReactions = STATIC_REACTIONS;
    this.modalMode = 'reactions';
    this.showModal = true;
    this.selectedPostId = postId;
  }

  closeModal() {
    this.showModal = false;
    this.selectedComments = [];
    this.selectedReactions = [];
    this.selectedPostId = null;
  }

  handleCommentSubmission(commentText: string) {
    if (!this.selectedPostId) return;

    const newComment: AggregatedComment = {
      CommentId: uuidv4(),
      PostId: this.selectedPostId,
      AuthorId: 'current-user-id', // Static placeholder
      CommentContent: commentText,
      CreatedAt: new Date(),
      IsEdited: false,
      ReactionsCount: 0,
      IsLiked: false,
      CommentAuthor: { // Static placeholder for current user
        UserId: 'current-user-id', // Corrected property name to match interface
        UserName: 'current_user',
        DisplayName: 'Current User',
        ProfilePictureUrl: 'assets/default-avatar.png',
      },
    };

    // Add to the master static array
    STATIC_COMMENTS.unshift(newComment);

    // Add to the currently displayed comments in the modal
    this.selectedComments.unshift(newComment);

    // Update the post's comment count
    const post = this.posts.find(p => p.postId === this.selectedPostId);
    if (post) {
      post.commentsCount = (post.commentsCount || 0) + 1;
    }
  }

  ngOnInit() {
    this.loadFeedData();
  }

  loadFeedData() {
    this.isLoading = true;
    this.error = null;

    this.feedService.getTimeline().subscribe({
      next: (data: Post[]) => {this.posts = data;},
      error: (err) => {
        console.error('Error loading feed data:', err);}});

    this.isLoading = false;
  }

  formatDate(dateString: string | Date): string {
    const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  }
}
