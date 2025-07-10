import { Component, EventEmitter, Output } from '@angular/core';
import { SignupService } from '../signup.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfileRequest } from '../../../../Interfaces/Profile/profile-request';

@Component({
  selector: 'app-step2-profile-info',
  templateUrl: './step2-profile-info.component.html',
  styleUrls: ['./step2-profile-info.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class Step2ProfileInfoComponent {
  @Output() next = new EventEmitter<Partial<ProfileRequest>>();
  @Output() prev = new EventEmitter<void>();

  formData = {
    FirstName: '',
    LastName: '',
    UserName: '',
    Bio: ''
  };

  constructor(public signupService: SignupService) {}

  validateAndProceed(form: any) {
    if (form.valid) {
      const profileData: Partial<ProfileRequest> = {
        FirstName: this.formData.FirstName,
        LastName: this.formData.LastName,
        UserName: this.formData.UserName,
        Bio: this.formData.Bio
      };
      this.next.emit(profileData);
    } else {
      Object.keys(form.controls).forEach(key => {
        form.controls[key].markAsTouched();
      });
    }
  }
}
