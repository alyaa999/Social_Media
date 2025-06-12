import { Component } from '@angular/core';
import { SideActionsComponent } from '../side-actions/side-actions.component';
import { SideFollowingComponent } from '../side-following/side-following.component';
import { CommonModule } from '@angular/common';
import { FeedContentComponent } from '../../feed-content/feed-content.component';

@Component({
  selector: 'app-feed-page',
  standalone: true,
  imports: [CommonModule, SideActionsComponent, SideFollowingComponent, FeedContentComponent],
  templateUrl: './feed-page.component.html',
  styleUrl: './feed-page.component.scss'
})
export class FeedPageComponent {
  showSideActions = false;

  toggleSideActions() {
    this.showSideActions = !this.showSideActions;
  }
}
