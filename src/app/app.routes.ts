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
import { ChatComponent } from './Components/Core/chat/chat.component';
import { MainLayoutComponent } from './Components/Layouts/main-layout/main-layout.component';
import { EmptyLayoutComponent } from './Components/Layouts/empty-layout/empty-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: '/feed', pathMatch: 'full' },
      { path: 'feed', component: FeedPageComponent },
      { path: 'profile', component: ProfilePageComponent },
      { path: 'other/:otherId', component: OtherProfileComponent },
      { path: 'tailwindtest', component: TailwindTestComponent },
      { path: 'home', component: HomeComponent },
      { path: 'following', component: FollowingsComponent },
      { path: 'followers', component: FollowersComponent },
      { path: 'chat/:otherId', component: ChatComponent },
      { path: 'chat', component: ChatComponent },
    ]
  },
  {
    path: '',
    component: EmptyLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'landing', component: ThryveLandingComponent }
    ]
  },
  { path: '**', redirectTo: '/feed' }
];
