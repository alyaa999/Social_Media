import { FeedPageComponent } from './Components/Core/FeedPage/feed-page/feed-page.component';
import { TailwindTestComponent } from './Components/Testing/TailwindTest/tailwind-test.component';
import { ProfilePageComponent } from './Components/Core/ProfilePage/profile-page/profile-page.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/Core/login/login.component';
import { ThryveLandingComponent } from './Components/Core/thryve-landing/thryve-landing.component';
import { Routes } from '@angular/router';
import { authGuard } from './Guards/auth.guard';
import { FollowingsComponent } from './Components/Shared/followings/followings/followings.component';
import { FollowersComponent } from './Components/Shared/followers/followers/followers.component';
import { OtherProfileComponent } from './Components/Shared/OtherProfile/other-profile/other-profile.component';
import { SignupComponent } from './Components/Core/signup/signup.component';

export const routes: Routes = [
  { path: '', redirectTo: '/feed', pathMatch: 'full' },
  { path: 'feed', component: FeedPageComponent, canActivate: [authGuard] },
  { path: 'profile', component: ProfilePageComponent, canActivate: [authGuard] },
  { path: 'other/:otherId', component: OtherProfileComponent, canActivate: [authGuard] },
  { path: 'tailwindtest', component: TailwindTestComponent, canActivate: [authGuard] },
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  { path: 'following', component: FollowingsComponent, canActivate: [authGuard]},
  { path: 'followers', component: FollowersComponent, canActivate: [authGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent},
  { path: 'landing', component: ThryveLandingComponent },
  { path: '**', redirectTo: '/feed' }
];