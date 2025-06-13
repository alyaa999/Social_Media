import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Post {
  postId: string;
  content: string;
  createdAt: string;
  authorProfile: {
    displayName: string;
    profilePictureUrl: string;
  };
  mediaList?: { url: string }[];
  reactsCount: number;
  commentsCount: number;
}

@Component({
  selector: 'app-profile-posts',
  templateUrl: './profile-posts.component.html',
  styleUrls: ['./profile-posts.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class ProfilePostsComponent implements OnInit {
  isLoading: boolean = false;
  error: string | null = null;
  posts: Post[] = [];
  selectedComments: any[] = [];
  selectedReactions: any[] = [];
  showModal: boolean = false;
  modalMode: 'comments' | 'reactions' = 'comments';

  private mockPosts: Post[] = [
    {
      postId: '1',
      content: 'Just finished a great workout! 💪 #fitness #health',
      createdAt: '2024-03-15T10:30:00',
      authorProfile: {
        displayName: 'John Doe',
        profilePictureUrl: 'https://i.pravatar.cc/150?img=1'
      },
      mediaList: [
        { url: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438' }
      ],
      reactsCount: 42,
      commentsCount: 5
    },
    {
      postId: '2',
      content: 'Beautiful sunset at the beach today! 🌅',
      createdAt: '2024-03-14T18:45:00',
      authorProfile: {
        displayName: 'John Doe',
        profilePictureUrl: 'https://i.pravatar.cc/150?img=1'
      },
      mediaList: [
        { url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e' }
      ],
      reactsCount: 89,
      commentsCount: 12
    },
    {
      postId: '3',
      content: 'Working on some exciting new projects! #coding #development',
      createdAt: '2024-03-13T15:20:00',
      authorProfile: {
        displayName: 'John Doe',
        profilePictureUrl: 'https://i.pravatar.cc/150?img=1'
      },
      reactsCount: 27,
      commentsCount: 3
    }
  ];

  constructor() {}

  ngOnInit(): void {
    this.loadProfilePosts();
  }

  loadProfilePosts(): void {
    this.isLoading = true;
    this.error = null;
    
    // Simulate API call with timeout
    setTimeout(() => {
      this.posts = this.mockPosts;
      this.isLoading = false;
    }, 1000);
  }

  formatDate(date: string): string {
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
