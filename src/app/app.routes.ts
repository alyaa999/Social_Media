import { Routes } from '@angular/router';
import { TestChatApiComponent } from './Components/test-chat-api/test-chat-api.component';
import { HomeComponent } from './Components/home/home.component';

export const routes: Routes = [
   { path: 'test-chat', component: TestChatApiComponent },
   { path: 'feed', component: HomeComponent },
   { path: '', redirectTo: '/feed', pathMatch: 'full' }
];
