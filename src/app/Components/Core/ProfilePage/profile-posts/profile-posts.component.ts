import { Component, OnInit, Input } from '@angular/core';
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
  @Input() userId: string = 'user-123'; // Default value, should be passed from parent
  
  isLoading: boolean = false;
  error: string | null = null;
  posts: PostAggregationResponse[] = [];
  selectedComments: any[] = [];
  selectedReactions: any[] = [];
  showModal: boolean = false;
  modalMode: 'comments' | 'reactions' = 'comments';
  nextPage: string  = '1';

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.loadProfilePosts();
  }

  loadProfilePosts(): void {
    this.isLoading = true;
    this.error = null;
    
    this.postService.GetProfilePosts(this.userId, this.userId, this.nextPage)
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.posts = response.data;
            this.nextPage = response.next;
          } else {
            this.error = response.message || 'Failed to load posts';
          }
          this.isLoading = false;
        },
        error: (error) => {
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
