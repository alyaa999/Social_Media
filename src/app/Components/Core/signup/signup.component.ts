import { Component } from '@angular/core';
import { SignupService } from './signup.service';
import { Step1InitialAccountComponent } from './step1-initial-account/step1-initial-account.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  imports: [Step1InitialAccountComponent]
})
export class SignupComponent {
  step = 1;

  constructor(public signup: SignupService) {}

  next() {
    this.step++;
  }

  prev() {
    this.step--;
  }

  reset() {
    this.step = 1;
    this.signup.resetData();
  }
}
