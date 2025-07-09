import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AggregatedComment } from '../../../Interfaces/Comment/aggregated-comment';
import { SimpleUserProfile } from '../../../Interfaces/post/simple-user-profile';
import { FormsModule } from '@angular/forms';
import { CommentService } from '../../../Services/comment.service';
import { CreateCommentRequest } from '../../../Interfaces/Comment/create-comment-request';

@Component({
  selector: 'app-comment-modal',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './comment-modal.component.html',
  styleUrl: './comment-modal.component.scss'
})
export class CommentModalComponent {
  @Input() comments: AggregatedComment[] = [];
  @Input() reactions: SimpleUserProfile[] = [];
  @Input() visible: boolean = false;
  @Input() mode: 'comments' | 'reactions' = 'comments';
  @Input() loading: boolean = false;
  @Input() postId!: string;
  @Output() close = new EventEmitter<void>();
  @Output() commentSubmitted = new EventEmitter<string>();

  newCommentText: string = '';
  submitting: boolean = false;

  constructor(private commentService: CommentService) {}

  onClose() {
    this.close.emit();
  }

  onBackdropClick(event: MouseEvent) {
    this.onClose();
  }

  onPostComment() {
    if (!this.newCommentText.trim() || !this.postId) return;
    this.submitting = true;
    const req: CreateCommentRequest = {
      PostId: this.postId,
      Content: this.newCommentText,
      HasMedia: false,
      MediaType: 0,
      Media: undefined
    };
    this.commentService.CreateComment(req).subscribe({
      next: () => {
        this.commentSubmitted.emit(this.newCommentText);
        this.newCommentText = '';
        this.submitting = false;
      },
      error: () => {
        // Optionally handle error
        this.submitting = false;
      }
    });
  }
}
