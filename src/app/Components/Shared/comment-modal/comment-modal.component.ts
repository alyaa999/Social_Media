import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AggregatedComment } from '../../../Interfaces/Comment/aggregated-comment';
import { SimpleUserProfile } from '../../../Interfaces/post/simple-user-profile';
import { FormsModule } from '@angular/forms';

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
  @Output() close = new EventEmitter<void>();
  @Output() commentSubmitted = new EventEmitter<string>();

  newCommentText: string = '';

  onClose() {
    this.close.emit();
  }

  onBackdropClick(event: MouseEvent) {
    this.onClose();
  }

  onPostComment() {
    if (this.newCommentText.trim()) {
      this.commentSubmitted.emit(this.newCommentText);
      this.newCommentText = '';
    }
  }
}
