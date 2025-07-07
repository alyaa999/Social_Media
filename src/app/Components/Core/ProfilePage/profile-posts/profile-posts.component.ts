import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostService } from '../../../../Services/post.service';
import { PostAggregationResponse } from '../../../../Interfaces/post/post-aggrigation-response';

@Component({
  selector: 'app-profile-posts',
  templateUrl: './profile-posts.component.html',
  styleUrls: ['./profile-posts.component.scss'],
  standalone: true,
  imports: [CommonModule]
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

  constructor(private postService: PostService) {
    // No fetching here, only in ngOnInit
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

  openCommentsModal(postId: string): void {
    this.modalMode = 'comments';
    this.showModal = true;
    this.selectedComments = []; // Placeholder for comments data
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedComments = [];
    this.selectedReactions = [];
  }

  handleCommentSubmission(comment: any): void {
    console.log('New comment:', comment);
  }
}
