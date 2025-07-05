import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedPostComponent } from '../feed-post/feed-post.component';
import { FeedService } from '../../Services/feed.service';
import { Post } from '../../Interfaces/feed/post';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FeedPostComponent],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  posts: Post[] = [];
  loading: boolean = true;
  error: string | null = null;

  constructor(private feedService: FeedService) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.loading = true;
    this.error = null;

    this.feedService.getTimeline().subscribe({
      next: (posts) => {
        console.log('Feed Response:', posts);
        this.posts = posts;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading posts:', err);
        this.error = 'Failed to load posts. Please try again.';
        this.loading = false;
      }
    });
  }
} 