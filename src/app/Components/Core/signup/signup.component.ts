import { Component } from '@angular/core';
import { SignupService } from './signup.service';
import { Step1InitialAccountComponent } from './step1-initial-account/step1-initial-account.component';
import { Step2ProfileInfoComponent } from "./step2-profile-info/step2-profile-info.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  imports: [Step1InitialAccountComponent, Step2ProfileInfoComponent, CommonModule, FormsModule]
})
export class SignupComponent {
  step = 1;

  constructor(public signup: SignupService) {}

  next() {
    console.log("hal anta tasma3oni???");
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
