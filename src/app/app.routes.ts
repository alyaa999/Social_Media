import { FeedPageComponent } from './Components/Core/FeedPage/feed-page/feed-page.component';
import { TailwindTestComponent } from './Components/Testing/TailwindTest/tailwind-test.component';
import { ProfilePageComponent } from './Components/Core/ProfilePage/profile-page/profile-page.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/Core/login/login.component';
import { ThryveLandingComponent } from './Components/Core/thryve-landing/thryve-landing.component';
import { Routes } from '@angular/router';
import { authGuard } from './Guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/feed', pathMatch: 'full' },
  { path: 'feed', component: FeedPageComponent, canActivate: [authGuard] },
  { path: 'profile', component: ProfilePageComponent, canActivate: [authGuard] },
  { path: 'tailwindtest', component: TailwindTestComponent, canActivate: [authGuard] },
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'landing', component: ThryveLandingComponent },
  { path: '**', redirectTo: '/feed' }
];