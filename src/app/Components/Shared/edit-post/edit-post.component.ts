import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PostService } from '../../../Services/post.service';
import { MediaType, Privacy } from '../../../Interfaces/feed/enums';
import { PostInputDto } from '../../../Interfaces/post/post-input-dto';
import { PostAggregationResponse } from '../../../Interfaces/post/post-aggrigation-response';
import { Media } from '../../../Interfaces/post/media';

@Component({
  selector: 'app-edit-post',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-post.component.html',
  styleUrl: './edit-post.component.scss'
})
export class EditPostComponent implements OnInit {
  @Input() visible = false;
  @Input() post!: PostAggregationResponse;
  @Output() close = new EventEmitter<void>();
  @Output() postUpdated = new EventEmitter<PostAggregationResponse>();

  editedContent: string = '';
  selectedImage: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  isLoading = false;
  error: string | null = null;

  constructor(private postService: PostService) {}

  ngOnInit() {
    if (this.post) {
      this.editedContent = this.post.postContent;
      if (this.post.media?.length > 0) {
        this.imagePreview = this.post.media[0].Url;
      }
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

  closeModal() {
    this.close.emit();
    this.resetForm();
  }

  onSubmit() {
    if (!this.post || !this.editedContent.trim()) {
      this.error = 'Post content cannot be empty';
      return;
    }

    this.isLoading = true;
    this.error = null;

    const userId = localStorage.getItem('userId');
    if (!userId) {
      this.error = 'User not logged in';
      this.isLoading = false;
      return;
    }

    const hasMedia = !!this.selectedImage || (this.post.media?.length > 0 && !this.selectedImage);
    
    const postData: PostInputDto = {
      PostId: this.post.postId,
      AuthorId: userId,
      Content: this.editedContent.trim(),
      Privacy: (this.post.privacy as unknown) as Privacy || Privacy.PUBLIC,
      MediaType: hasMedia ? MediaType.IMAGE : MediaType.UNKNOWN,
      HasMedia: hasMedia,
      Media: [],
      MediaUrls: []
    };

    if (this.selectedImage) {
      const formData = new FormData();
      formData.append('media', this.selectedImage);
      // Set the current media array empty as we'll send a new image
      postData.Media = [];
      // Set the URLs from the current media
      postData.MediaUrls = [];
    } else if (this.post.media?.length > 0) {
      // Keep the existing media
      postData.Media = [];
      postData.MediaUrls = this.post.media.map(m => m.Url);
    }

    this.postService.UpdatePost(postData, userId).subscribe({
      next: (response) => {
        console.log('Post updated successfully:', response);
        // Convert PostResponseDTO to PostAggregationResponse
        const updatedPost: PostAggregationResponse = {
          ...response.data,
          isLiked: this.post.isLiked,
          postAuthorProfile: this.post.postAuthorProfile
        };
        this.postUpdated.emit(updatedPost);
        this.closeModal();
      },
      error: (error) => {
        console.error('Error updating post:', error);
        this.error = error.message || 'Failed to update post. Please try again.';
        this.isLoading = false;
      }
    });
  }

  resetForm() {
    this.editedContent = '';
    this.selectedImage = null;
    this.imagePreview = null;
    this.error = null;
    this.isLoading = false;
  }
}
