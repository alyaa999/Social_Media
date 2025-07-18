import { Component, EventEmitter, Output } from '@angular/core';
import { SignupService } from '../signup.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-step3-personal-details',
  templateUrl: './step3-personal-details.component.html',
  imports: [CommonModule, FormsModule],
  styleUrls: ['./step3-personal-details.component.css']
})
export class Step3PersonalDetailsComponent {
  @Output() next = new EventEmitter<void>();
  @Output() prev = new EventEmitter<void>();

  constructor(public signupService: SignupService) {}

  validateAndProceed(form: any) {
    if (form.valid) {
      this.next.emit();
    } else {
      Object.keys(form.controls).forEach(key => {
        form.controls[key].markAsTouched();
      });
    }
  }
}
