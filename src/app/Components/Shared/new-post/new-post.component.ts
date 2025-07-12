import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PostService } from '../../../Services/post.service';
import { Media } from '../../../Interfaces/post/media';
import { MediaType, Privacy } from '../../../Interfaces/feed/enums';
import { PostCreateDto } from '../../../Interfaces/post/post-create-dto';
import { RewriteAiService, ToneType } from '../../../Services/rewrite-ai.service';

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
  
  // Rewrite AI related properties
  isRewriting = false;
  selectedTone: ToneType = 'friendly';
  toneOptions: ToneType[] = ['formal', 'friendly', 'excited', 'angry', 'professional', 'casual'];

  constructor(
    private postService: PostService,
    private rewriteAiService: RewriteAiService
  ) {}

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

    const hasMedia = !!this.selectedImage;
    const postData: PostCreateDto = {
      Content: content,
      Privacy: Privacy.PUBLIC,
      MediaType: hasMedia ? MediaType.IMAGE : MediaType.UNKNOWN,
      Media: hasMedia ? [{
        Id: '',
        MediaType: MediaType.IMAGE,
        MediaUrl: '',
        File: this.selectedImage // Will be handled by buildFormData
      } as any] : []
    };

    console.log('Creating post with DTO:', postData);

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

  rewriteContent() {
    if (!this.postContent.trim()) {
      this.error = 'Please enter some content to rewrite';
      return;
    }

    this.isRewriting = true;
    this.error = null;

    this.rewriteAiService.rewrite(this.postContent, 'post', this.selectedTone)
      .subscribe({
        next: (rewrittenText) => {
          this.postContent = rewrittenText;
          this.isRewriting = false;
        },
        error: (error) => {
          console.error('Error rewriting content:', error);
          this.error = 'Failed to rewrite content. Please try again.';
          this.isRewriting = false;
        }
      });
  }

  onToneChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.selectedTone = select.value as ToneType;
  }

  resetForm() {
    this.postContent = '';
    this.selectedImage = null;
    this.imagePreview = null;
    this.error = null;
    this.isLoading = false;
    this.selectedTone = 'friendly';
    this.isRewriting = false;
  }
}
