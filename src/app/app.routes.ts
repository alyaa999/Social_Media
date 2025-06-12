import { Routes } from '@angular/router';
import { FeedPageComponent } from './Components/Core/FeedPage/feed-page/feed-page.component';

export const routes: Routes = [
  { path: '', redirectTo: '/feed', pathMatch: 'full' },
  { path: 'feed', component: FeedPageComponent },
  { path: '**', redirectTo: '/feed' } // Redirect any unknown routes to /feed
];
