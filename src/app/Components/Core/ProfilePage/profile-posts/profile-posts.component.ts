import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostService } from '../../../../Services/post.service';
import { PostAggregationResponse } from '../../../../Interfaces/post/post-aggrigation-response';
import { CommentModalComponent } from '../../../Shared/comment-modal/comment-modal.component';
import { CommentService } from '../../../../Services/comment.service';
import { GetPagedCommentRequest } from '../../../../Interfaces/Comment/get-paged-comment-request';
import { MediaType } from '../../../../Interfaces/Comment/media-enum-type';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile-posts',
  templateUrl: './profile-posts.component.html',
  styleUrls: ['./profile-posts.component.scss'],
  standalone: true,
  imports: [CommonModule, CommentModalComponent, FormsModule]
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
  nextPage: string  = '1';
  selectedPostId: string | null = null;
  newCommentText: string = '';

  constructor(
    private postService: PostService,
    private commentService: CommentService
  ) {}

  openCommentsModal(postId: string) {
    this.selectedReactions = []; // Clear reactions before opening comments
    this.selectedPostId = postId;
    this.modalMode = 'comments';
    this.showModal = true;

    const req: GetPagedCommentRequest = {
      PostId: postId,
      Next: ""
    };

    this.commentService.GetCommentList(req).subscribe({
      next: (data) => {
        this.selectedComments = data.data;
        console.log('Comments loaded:', data);
      },
      error: (err) => {
        console.error('Error loading comments:', err);
      }
    });
  }

  onCloseModal() {
    this.showModal = false;
    this.selectedPostId = null;
    this.selectedComments = [];
    this.selectedReactions = [];
  }

  onCommentSubmitted(commentText: string) {
    if (!this.selectedPostId || !commentText.trim()) return;
    
    const commentData = {
      PostId: this.selectedPostId,
      Content: commentText,
      HasMedia: false,
      MediaType: MediaType.None, // Using the correct enum value for no media
      UserId: this.userId
    };

    this.commentService.CreateComment(commentData).subscribe({
      next: (response) => {
        // Refresh comments after posting
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
          console.log('Profile posts response:', response); // Log the response
          // Map media properties to match the interface (ignore TS errors for backend fields)
          this.posts = (response.data || []).map(post => ({
            ...post,
            media: (post.media || []).map(media => {
              const anyMedia = media as any;
              return {
                ...media,
                Type: media.Type !== undefined ? media.Type : anyMedia.type,
                Url: media.Url !== undefined ? media.Url : anyMedia.url
              };
            })
          }));
          this.nextPage = response.next;
          this.error = null;
          this.isLoading = false;
          console.log('Loaded posts:', this.posts); // Log posts
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
}
