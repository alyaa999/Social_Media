import { Component, EventEmitter, Output } from '@angular/core';
import { SignupService } from '../signup.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-step2-profile-info',
  imports: [FormsModule, CommonModule],
  templateUrl: './step2-profile-info.component.html',
  styleUrls: ['./step2-profile-info.component.css']
})
export class Step2ProfileInfoComponent {
  @Output() next = new EventEmitter<void>();
  @Output() prev = new EventEmitter<void>();

  constructor(public signupService: SignupService) {}

  goNext() {
    this.next.emit();
  }

  goBack() {
    this.prev.emit();
  }
}
