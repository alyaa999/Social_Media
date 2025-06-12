import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { NewPostComponent } from '../../../Shared/new-post/new-post.component';
import { FeedService } from '../../../../Services/feed.service';
import { HttpClientModule } from '@angular/common/http';
import { Post } from '../../../../Interfaces/feed/post';
import { catchError, finalize, of } from 'rxjs';

@Component({
  selector: 'app-feed-content',
  standalone: true,
  imports: [CommonModule, NewPostComponent, HttpClientModule],
  templateUrl: './feed-content.component.html',
  styleUrls: ['./feed-content.component.scss']
})
export class FeedContentComponent implements OnInit {
  posts: Post[] = [];
  isLoading = true;
  error: string | null = null;

  constructor(private feedService: FeedService) {}

  ngOnInit() {
    this.loadFeedData();
  }

  loadFeedData() {
    const userId = 'u02'; // TODO: Get this from auth service
    this.isLoading = true;
    this.error = null;
    
    this.feedService.GetTimeline(userId)
      .pipe(
        catchError(error => {
          console.error('Error fetching feed:', error);
          this.error = 'Failed to load posts. Please try again later.';
          return of([]); // Return empty array on error
        }),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: (data: Post[]) => {
          this.posts = data || [];
        }
      });
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
