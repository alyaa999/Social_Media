import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NotificationsComponent } from "./Components/notifications/notifications.component";
import { TestChatApiComponent } from "./Components/test-chat-api/test-chat-api.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NotificationsComponent, TestChatApiComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Social_Media';
}
