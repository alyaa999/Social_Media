import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-post',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './new-post.component.html',
  styleUrl: './new-post.component.scss'
})
export class NewPostComponent {
  showModal = false;
  postContent = '';
  selectedImage: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;

  toggleModal() {
    this.showModal = !this.showModal;
    if (!this.showModal) {
      this.resetForm();
    }
  }

  onImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedImage = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(this.selectedImage);
    }
  }

  onSubmit() {
    // Handle post submission here
    console.log('Post content:', this.postContent);
    if (this.selectedImage) {
      console.log('Image selected:', this.selectedImage.name);
    }
    this.toggleModal();
  }

  resetForm() {
    this.postContent = '';
    this.selectedImage = null;
    this.imagePreview = null;
  }
}
