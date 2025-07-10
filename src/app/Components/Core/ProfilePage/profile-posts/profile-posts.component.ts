import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostService } from '../../../../Services/post.service';
import { PostAggregationResponse } from '../../../../Interfaces/post/post-aggrigation-response';
import { CommentModalComponent } from '../../../Shared/comment-modal/comment-modal.component';
import { EditPostComponent } from '../../../Shared/edit-post/edit-post.component';
import { CommentService } from '../../../../Services/comment.service';
import { GetPagedCommentRequest } from '../../../../Interfaces/Comment/get-paged-comment-request';
import { MediaType } from '../../../../Interfaces/Comment/media-enum-type';
import { FormsModule } from '@angular/forms';
import { ReactionService } from '../../../../Services/reaction.service';

@Component({
  selector: 'app-profile-posts',
  templateUrl: './profile-posts.component.html',
  styleUrls: ['./profile-posts.component.scss'],
  standalone: true,
  imports: [CommonModule, CommentModalComponent, EditPostComponent, FormsModule]
})
export class ProfilePostsComponent implements OnInit {
  userId: string = localStorage.getItem('userId') || '';
  isLoading: boolean = false;
  error: string | null = null;
  posts: PostAggregationResponse[] = [];
  selectedComments: any[] = [];
  selectedReactions: any[] = [];
  showModal: boolean = false;
  modalMode: 'comments' | 'reactions' = 'comments';
  nextPage: string = '1';
  selectedPostId: string | null = null;
  newCommentText: string = '';
  modalLoading: boolean = false;
  showEditModal: boolean = false;
  selectedPost: PostAggregationResponse | null = null;

  constructor(
    private postService: PostService,
    private commentService: CommentService,
    private reactionService: ReactionService
  ) {}

  openCommentsModal(postId: string) {
    this.selectedPostId = postId;
    this.modalMode = 'comments';
    this.showModal = true;
    this.modalLoading = true;
    const req: GetPagedCommentRequest = {
      PostId: postId,
      Next: ""
    };
    this.commentService.GetCommentList(req).subscribe({
      next: (data) => {
        this.selectedComments = data.data;
        this.modalLoading = false;
        console.log('Comments loaded:', data);
      },
      error: (err) => {
        this.modalLoading = false;
        console.error('Error loading comments:', err);
      }
    });
  }

  onCloseModal() {
    this.showModal = false;
    this.selectedPostId = null;
    this.selectedComments = [];
    this.selectedReactions = [];
    this.modalLoading = false;
  }

  onCommentSubmitted(commentText: string) {
    if (!this.selectedPostId || !commentText.trim()) return;

    const commentData = {
      PostId: this.selectedPostId,
      Content: commentText,
      HasMedia: false,
      MediaType: MediaType.None,
      UserId: this.userId
    };

    this.commentService.CreateComment(commentData).subscribe({
      next: (response) => {
        if (this.selectedPostId) {
          this.openCommentsModal(this.selectedPostId);
        }
      },
      error: (err) => {
        console.error('Error posting comment:', err);
      }
    });
  }

  ngOnInit(): void {
    if (!this.userId) {
      console.error('User ID is required to load profile posts');
      return;
    }
    this.loadProfilePosts();
  }
  loadProfilePosts(): void {
    this.isLoading = true;
    this.error = null;
    this.postService.GetProfilePosts(this.userId, this.nextPage)
      .subscribe({
        next: (response) => {
          console.log('Profile posts response:', response);
          this.posts = (response.data || []).map((post: any) => ({
            ...post,
            media: (post.media || []).map((media: any) => ({
              ...media,
              Type: media.Type !== undefined ? media.Type : media.type,
              Url: media.Url !== undefined ? media.Url : media.url
            }))
          }));
          this.nextPage = response.next;
          this.error = null;
          this.isLoading = false;
          console.log('Loaded posts:', this.posts);
        },
        error: (error) => {
          this.posts = [];
          console.error('Error loading posts:', error);
          this.error = 'Failed to load posts. Please try again.';
          this.isLoading = false;
        }
      });
  }

  loadMore(): void {
    if (this.nextPage) {
      this.loadProfilePosts();
    }
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString();
  }

  openReactionsModal(postId: string): void {
    this.modalMode = 'reactions';
    this.showModal = true;
    this.selectedReactions = []; // Placeholder for reactions data
  }

  isCurrentUserPost(post: PostAggregationResponse): boolean {
    return post.authorId === this.userId;
  }

  editPost(post: PostAggregationResponse): void {
    this.selectedPost = post;
    this.showEditModal = true;
  }

  onCloseEditModal(): void {
    this.showEditModal = false;
    this.selectedPost = null;
  }

  onPostUpdated(updatedPost: PostAggregationResponse): void {
    const index = this.posts.findIndex(p => p.postId === updatedPost.postId);
    if (index !== -1) {
      this.posts[index] = { ...this.posts[index], ...updatedPost };
    }
    this.onCloseEditModal();
  }

  toggleLike(post: PostAggregationResponse) {
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

