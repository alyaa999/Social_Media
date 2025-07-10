import { Component } from '@angular/core';
import { SignupService } from '../signup.service';

@Component({
  selector: 'app-step5-welcome-screen',
  templateUrl: './step5-welcome-screen.component.html',
  styleUrls: ['./step5-welcome-screen.component.css']
})
export class Step5WelcomeScreenComponent {
  constructor(public signupService: SignupService) {}
}
