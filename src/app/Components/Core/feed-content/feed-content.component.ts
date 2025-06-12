import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewPostComponent } from '../../Shared/new-post/new-post.component';
import { FeedService } from '../../../Services/feed.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-feed-content',
  standalone: true,
  imports: [CommonModule, NewPostComponent, HttpClientModule],
  templateUrl: './feed-content.component.html',
  styleUrls: ['./feed-content.component.scss']
})
export class FeedContentComponent implements OnInit {
  constructor(private feedService: FeedService) {}

  ngOnInit() {
    this.loadFeedData();
  }

  private loadFeedData() {
    const userId = 'u02';
    this.feedService.GetTimeline(userId).subscribe({
      next: (data: any) => {
        console.log('Feed Data:', data);
      },
      error: (error: any) => {
        console.error('Error fetching feed:', error);
      }
    });
  }

}
