import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewPostComponent } from '../../../Shared/new-post/new-post.component';
import { Post, STATIC_POSTS } from '../../../../Interfaces/feed/post';
import { SimpleUserProfile } from '../../../../Interfaces/post/simple-user-profile';
import { CommentModalComponent } from '../../../Shared/comment-modal/comment-modal.component';
import { AggregatedComment, STATIC_COMMENTS } from '../../../../Interfaces/Comment/aggregated-comment';
import { v4 as uuidv4 } from 'uuid';
import { FeedService } from '../../../../Services/feed.service';
import { CommentService } from '../../../../Services/comment.service';
import { GetPagedCommentRequest } from '../../../../Interfaces/Comment/get-paged-comment-request';
import { ReactionService } from '../../../../Services/reaction.service';

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

  constructor(private feedService: FeedService, private commentService: CommentService, private reactionService : ReactionService) {}

  toggleLike(post: Post) {
    // Simulate userId for demo; replace with real userId in production
    const userId = localStorage.getItem('userId') || 'current-user-id';
    if (!post.isLiked) {
      // Like the post
      post.isLiked = true;
      post.reactsCount = (post.reactsCount || 0) + 1;
      // Call API if needed
      this.reactionService.addReactionComment({ postId: post.postId, reactionType: 0 }, userId).subscribe({
        next: () => {},
        error: () => {
          // Rollback UI if error
          post.isLiked = false;
          post.reactsCount = Math.max(0, (post.reactsCount || 1) - 1);
        }
      });
    } else {
      // Unlike the post
      post.isLiked = false;
      post.reactsCount = Math.max(0, (post.reactsCount || 1) - 1);
      // Call API if needed
      this.reactionService.deleteReactionComment({ postId: post.postId }, userId).subscribe({
        next: () => {},
        error: () => {
          // Rollback UI if error
          post.isLiked = true;
          post.reactsCount = (post.reactsCount || 0) + 1;
        }
      });
    }
  }

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
        console.log('Selected comments:', this.selectedComments);
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

    this.reactionService.getUsersReacted({ PostId: postId, Next: "" }).subscribe({
      next: (data) => {
        this.selectedReactions = data.data;
        console.log('Reactions loaded:', data);
        console.log('Selected reactions:', this.selectedReactions);
      },
      error: (err) => {
        console.error('Error loading reactions:', err);
      }
    });
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
      commentId: uuidv4(),
      postId: this.selectedPostId,
      authorId: 'current-user-id', // Static placeholder
      commentContent: commentText,
      createdAt: new Date(),
      isEdited: false,
      reactionsCount: 0,
      isLiked: false,
      commentAuthor: { // Static placeholder for current user
        userId: 'current-user-id', // Corrected property name to match interface
        userName: 'current_user',
        displayName: 'Current User',
        profilePictureUrl: 'assets/default-avatar.png',
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
