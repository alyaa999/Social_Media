import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewPostComponent } from '../../Shared/new-post/new-post.component';

@Component({
  selector: 'app-feed-content',
  standalone: true,
  imports: [CommonModule, NewPostComponent],
  templateUrl: './feed-content.component.html',
  styleUrls: ['./feed-content.component.scss']
})
export class FeedContentComponent {

}
