import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NewPostComponent } from '../../../Shared/new-post/new-post.component';
import { SimpleUserProfile } from '../../../../Interfaces/post/simple-user-profile';
import { CommentModalComponent } from '../../../Shared/comment-modal/comment-modal.component';
import { AggregatedComment, STATIC_COMMENTS } from '../../../../Interfaces/Comment/aggregated-comment';
import { v4 as uuidv4 } from 'uuid';
import { FeedService } from '../../../../Services/feed.service';
import { CommentService } from '../../../../Services/comment.service';
import { GetPagedCommentRequest } from '../../../../Interfaces/Comment/get-paged-comment-request';
import { ReactionService } from '../../../../Services/reaction.service';
import { Post } from '../../../../Interfaces/feed/post';

@Component({
  selector: 'app-feed-content',
  standalone: true,
  imports: [CommonModule, RouterModule, NewPostComponent, CommentModalComponent],
  templateUrl: './feed-content.component.html',
  styleUrls: ['./feed-content.component.scss']
})
export class FeedContentComponent implements OnInit {
  posts: Post[] = [];
  isLoading = true;
  error: string | null = null;

  showCommentsModal: boolean = false;
  showModal: boolean = false;
  modalMode: 'comments' | 'reactions' = 'comments';
  selectedComments: AggregatedComment[] = [];
  selectedReactions: SimpleUserProfile[] = [];
  selectedPostId: string | null = null;
  modalLoading: boolean = false;

  constructor(private feedService: FeedService, private commentService: CommentService, private reactionService : ReactionService) {}

  toggleLike(post: Post) {
    if (post.isLikeLoading) return; // Prevent double-clicking while loading
    
    // Simulate userId for demo; replace with real userId in production
    const userId = localStorage.getItem('userId') || 'current-user-id';
    const wasLiked = post.isLiked;
    
    // Set loading state
    post.isLikeLoading = true;
    
    if (!wasLiked) {
      // Optimistic UI update for like
      post.isLiked = true;
      post.reactsCount = (post.reactsCount || 0) + 1;
      
      // Call API
      this.reactionService.addReaction({ postId: post.postId}).subscribe({
        next: (response) => {
          if (response.statusCode === 200 || response.statusCode === 201) {
            post.isLikeLoading = false;
          } else {
            // Rollback UI if status code indicates failure
            post.isLiked = false;
            post.reactsCount = Math.max(0, (post.reactsCount || 1) - 1);
            post.isLikeLoading = false;
          }
        },
        error: () => {
          // Rollback UI if error
          post.isLiked = false;
          post.reactsCount = Math.max(0, (post.reactsCount || 1) - 1);
          post.isLikeLoading = false;
        }
      });
    } else {
      // Optimistic UI update for unlike
      post.isLiked = false;
      post.reactsCount = Math.max(0, (post.reactsCount || 1) - 1);
      
      // Call API
      this.reactionService.deleteReaction({ postId: post.postId }).subscribe({
        next: (response) => {
          if (response.statusCode === 200 || response.statusCode === 204) {
            post.isLikeLoading = false;
          } else {
            // Rollback UI if status code indicates failure
            post.isLiked = true;
            post.reactsCount = (post.reactsCount || 0) + 1;
            post.isLikeLoading = false;
          }
        },
        error: () => {
          // Rollback UI if error
          post.isLiked = true;
          post.reactsCount = (post.reactsCount || 0) + 1;
          post.isLikeLoading = false;
        }
      });
    }
  }

  openCommentsModal(postId: string) {
    this.selectedReactions = []; // Clear reactions before opening comments
    this.modalLoading = true;
    this.selectedComments = [];
    this.modalMode = 'comments';
    this.showCommentsModal = true;
    this.selectedPostId = postId;

    const req : GetPagedCommentRequest = {
      PostId: postId,
      Next: ""
    }

    this.commentService.GetCommentList(req).subscribe({
      next: (data) => {
        this.selectedComments = data.data;
        this.modalLoading = false;
        console.log('Comments loaded:', data);
        console.log('Selected comments:', this.selectedComments);
      },
      error: (err) => {
        this.modalLoading = false;
        console.error('Error loading comments:', err);
      }
    });
  }

  openReactionsModal(postId: string) {
    this.selectedComments = []; // Clear comments before opening reactions
    this.modalLoading = true;
    this.selectedReactions = [];
    this.modalMode = 'reactions';
    this.showCommentsModal = true;
    this.selectedPostId = postId;

    this.reactionService.getUsersReacted({ PostId: postId, Next: "" }).subscribe({
      next: (data) => {
        this.selectedReactions = data.data;
        this.modalLoading = false;
        console.log('Reactions loaded:', data);
        console.log('Selected reactions:', this.selectedReactions);
      },
      error: (err) => {
        this.modalLoading = false;
        console.error('Error loading reactions:', err);
      }
    });
  }

  closeCommentsModal() {
    this.showCommentsModal = false;
    this.selectedComments = [];
    this.selectedReactions = [];
    this.selectedPostId = null;
    this.modalLoading = false;
  }

  handleCommentSubmission(newComment: AggregatedComment) {
    if (!this.selectedPostId) return;

    // Add to the currently displayed comments in the modal
    this.selectedComments.unshift(newComment);

    // Update the post's comment count
    const post = this.posts.find(p => p.postId === this.selectedPostId);
    if (post) {
      post.commentsCount = (post.commentsCount || 0) + 1;
    }
  }

  handleCommentDeletion() {
    const post = this.posts.find(p => p.postId === this.selectedPostId);
    if (post && post.commentsCount > 0) {
      post.commentsCount--;
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
