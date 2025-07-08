import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PostService } from '../../../Services/post.service';
import { Media } from '../../../Interfaces/post/media';
import { MediaType, Privacy } from '../../../Interfaces/feed/enums';
import { PostCreateDto } from '../../../Interfaces/post/post-create-dto';

@Component({
  selector: 'app-new-post',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './new-post.component.html',
  styleUrl: './new-post.component.scss'
})
export class NewPostComponent {
  @Output() postCreated = new EventEmitter<void>();
  
  showModal = false;
  postContent = '';
  selectedImage: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  isLoading = false;
  error: string | null = null;

  constructor(private postService: PostService) {}

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
    const content = this.postContent.trim();
    if (!content) {
      this.error = 'Post content cannot be empty';
      return;
    }
    this.isLoading = true;
    this.error = null;

    // Create post data using the new DTO
    const hasMedia = !!this.selectedImage;
    const postData: any = {
      content: content,
      privacy: Privacy.PUBLIC,
      mediaType: hasMedia ? MediaType.IMAGE : MediaType.UNKNOWN,
      media: hasMedia ? [{
        id: '',
        mediaType: MediaType.IMAGE,
        mediaUrl: '',
        file: this.selectedImage
      } as any] : [],
      hasMedia: hasMedia
    };

    console.log('Creating post with new DTO:', postData);

    this.postService.AddPost(postData).subscribe({
      next: (response: any) => {
        console.log('Post created successfully:', response);
        this.postCreated.emit(); // Notify parent component
        this.toggleModal();
      },
      error: (error: any) => {
        console.error('Error creating post:', error);
        this.error = error.error?.message || 'Failed to create post. Please try again.';
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  resetForm() {
    this.postContent = '';
    this.selectedImage = null;
    this.imagePreview = null;
    this.error = null;
    this.isLoading = false;
  }
}
