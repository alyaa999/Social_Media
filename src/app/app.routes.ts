import { FeedPageComponent } from './Components/Core/FeedPage/feed-page/feed-page.component';
import { TailwindTestComponent } from './Components/Testing/TailwindTest/tailwind-test.component';
import { ProfilePageComponent } from './Components/Core/ProfilePage/profile-page/profile-page.component';
import { HomeComponent } from './Components/home/home.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/feed', pathMatch: 'full' },
  { path: 'feed', component: FeedPageComponent },
  { path: 'profile', component: ProfilePageComponent },
  { path: 'tailwindtest', component: TailwindTestComponent },
  { path: 'home', component: HomeComponent },
  { path: '**', redirectTo: '/feed' } // Redirect any unknown routes to /feed
];
