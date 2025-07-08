import { Component, EventEmitter, Output } from '@angular/core';
import { SignupService } from '../signup.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-step4-customize-profile',
  templateUrl: './step4-customize-profile.component.html',
  imports:[CommonModule, FormsModule],
  styleUrls: ['./step4-customize-profile.component.css']
})
export class Step4CustomizeProfileComponent {
  @Output() prev = new EventEmitter<void>();
  profilePreview: string | ArrayBuffer | null = null;

  constructor(public signupService: SignupService) {}

  goBack() {
    this.prev.emit();
  }

  onImageSelected(event: any) {
    const file = event.target.files[0];
    this.signupService.formData.profileImage = file;

    const reader = new FileReader();
    reader.onload = e => this.profilePreview = reader.result;
    reader.readAsDataURL(file);
  }

  submitForm() {
    console.log('Final signup data:', this.signupService.formData);
    alert('🎉 Signup completed!');
  }
}
