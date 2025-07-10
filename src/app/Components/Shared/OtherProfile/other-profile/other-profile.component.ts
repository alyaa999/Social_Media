import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../../../Services/post.service';
import { ProfileService } from '../../../../Services/profile.service';
import { CommentModalComponent } from '../../../Shared/comment-modal/comment-modal.component';
import { CommentService } from '../../../../Services/comment.service';
import { GetPagedCommentRequest } from '../../../../Interfaces/Comment/get-paged-comment-request';
import { ReactionService } from '../../../../Services/reaction.service';

@Component({
  selector: 'app-other-profile',
  imports: [CommonModule, DatePipe, CommentModalComponent],
  templateUrl: './other-profile.component.html',
  styleUrl: './other-profile.component.css'
})
export class OtherProfileComponent {
  profile: any = null;
  posts: any[] = [];
  isLoadingProfile = false;
  isLoadingPosts = false;
  errorProfile: string | null = null;
  errorPosts: string | null = null;
  isCurrentUser = false; // You can update this logic as needed

  // Modal state
  showModal: boolean = false;
  modalMode: 'comments' | 'reactions' = 'comments';
  selectedComments: any[] = [];
  selectedReactions: any[] = [];
  modalLoading: boolean = false;
  selectedPostId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private profileService: ProfileService,
    private commentService: CommentService,
    private reactionService: ReactionService
  ) {
    this.route.params.subscribe(params => {
      const otherId = params['otherId'];
      if (otherId) {
        this.loadProfile(otherId);
        this.loadPosts(otherId);
      }
    });
  }

  private loadComments(postId: string) {
    this.modalLoading = true;
    const req: GetPagedCommentRequest = {
      PostId: postId,
      Next: ""
    };
    this.commentService.GetCommentList(req).subscribe({
      next: (data) => {
        this.selectedComments = data.data;
        this.modalLoading = false;
      },
      error: (err) => {
        this.modalLoading = false;
        console.error('Error loading comments:', err);
      }
    });
  }

  openCommentsModal(postId: string) {
    this.selectedReactions = [];
    this.selectedComments = [];
    this.selectedPostId = postId;
    this.modalMode = 'comments';
    this.showModal = true;
    this.loadComments(postId);
  }

  onCommentSubmitted(commentText: string) {
    // Find the post and update its comment count
    const post = this.posts.find(p => p.postId === this.selectedPostId);
    if (post) {
      post.numberOfComments = (post.numberOfComments || 0) + 1;
    }
    
    // Reload comments to show the new comment immediately
    if (this.selectedPostId) {
      this.loadComments(this.selectedPostId);
    }
  }

  closeModal() {
    this.showModal = false;
    this.selectedComments = [];
    this.selectedReactions = [];
    this.selectedPostId = null;
    this.modalLoading = false;
  }

  loadProfile(otherId: string) {
    this.isLoadingProfile = true;
    this.errorProfile = null;
    this.profileService.GetProfileByUserId(otherId).subscribe({
      next: (profile) => {
        this.profile = profile;
        this.isLoadingProfile = false;
      },
      error: (err) => {
        this.errorProfile = 'Failed to load profile.';
        this.isLoadingProfile = false;
      }
    });
  }

  loadPosts(otherId: string) {
    this.isLoadingPosts = true;
    this.errorPosts = null;
    this.postService.GetProfilePosts(otherId).subscribe({
      next: (response) => {
        // Assuming response is PaginationResponseWrapper<PostAggregationResponse[]>
        this.posts = response?.data || [];
        this.isLoadingPosts = false;
      },
      error: (err) => {
        this.errorPosts = 'Failed to load posts.';
        this.isLoadingPosts = false;
      }
    });
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
  }

  onImgError(event: Event, fallback: string) {
    const target = event.target as HTMLImageElement | null;
    if (target) {
      target.src = fallback;
    }
  }

  toggleLike(post: any) {
    if (post.isLikeLoading) return; // Prevent double-clicking while loading
    
    // Set loading state
    post.isLikeLoading = true;
    
    if (!post.isLiked) {
      // Optimistic UI update for like
      post.isLiked = true;
      post.numberOfLikes = (post.numberOfLikes || 0) + 1;
      
      // Call API
      this.reactionService.addReaction({ postId: post.postId }).subscribe({
        next: (response) => {
          if (response.statusCode === 200 || response.statusCode === 201) {
            post.isLikeLoading = false;
          } else {
            // Rollback UI if status code indicates failure
            post.isLiked = false;
            post.numberOfLikes = Math.max(0, (post.numberOfLikes || 1) - 1);
            post.isLikeLoading = false;
          }
        },
        error: () => {
          // Rollback UI if error
          post.isLiked = false;
          post.numberOfLikes = Math.max(0, (post.numberOfLikes || 1) - 1);
          post.isLikeLoading = false;
        }
      });
    } else {
      // Optimistic UI update for unlike
      post.isLiked = false;
      post.numberOfLikes = Math.max(0, (post.numberOfLikes || 1) - 1);
      
      // Call API
      this.reactionService.deleteReaction({ postId: post.postId }).subscribe({
        next: (response) => {
          if (response.statusCode === 200 || response.statusCode === 204) {
            post.isLikeLoading = false;
          } else {
            // Rollback UI if status code indicates failure
            post.isLiked = true;
            post.numberOfLikes = (post.numberOfLikes || 0) + 1;
            post.isLikeLoading = false;
          }
        },
        error: () => {
          // Rollback UI if error
          post.isLiked = true;
          post.numberOfLikes = (post.numberOfLikes || 0) + 1;
          post.isLikeLoading = false;
        }
      });
    }
  }
}
