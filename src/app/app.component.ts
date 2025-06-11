import { Component } from '@angular/core';
import { NotificationsComponent } from "./Components/notifications/notifications.component";

@Component({
  selector: 'app-root',
  imports: [NotificationsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Social_Media';
}
