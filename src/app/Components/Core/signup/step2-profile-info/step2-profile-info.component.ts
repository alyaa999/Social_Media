import { Component, EventEmitter, Output } from '@angular/core';
import { SignupService } from '../signup.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-step2-profile-info',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './step2-profile-info.component.html',
  styleUrls: ['./step2-profile-info.component.css']
})
export class Step2ProfileInfoComponent {
  @Output() prev = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();

  constructor(public signupService: SignupService) {}

  submitForm() {
    const { firstName, lastName, username } = this.signupService.formData;
    if (firstName && lastName && username) {
      this.next.emit();
    }
  }
}
