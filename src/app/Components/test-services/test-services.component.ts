import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedService } from '../../Services/feed.service';

@Component({
  selector: 'app-test-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './test-services.component.html',
  styleUrl: './test-services.component.scss'
})
export class TestServicesComponent implements OnInit {
  constructor(private feedService: FeedService) {}

  ngOnInit() {
    this.testFeedService();
  }

  testFeedService() {
    const testUserId = '12'; // Test user ID
    console.log(`Testing FeedService with user ID: ${testUserId}`);
    
    this.feedService.GetTimeline(testUserId).subscribe({
      next: (response) => {
        console.log('FeedService response:', response);
      },
      error: (error) => {
        console.error('Error in FeedService:', error);
      }
    });
  }
}
