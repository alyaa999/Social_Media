import { Component, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AggregatedComment } from '../../../Interfaces/Comment/aggregated-comment';
import { SimpleUserProfile } from '../../../Interfaces/post/simple-user-profile';
import { FormsModule } from '@angular/forms';
import { CommentService } from '../../../Services/comment.service';
import { ProfileService } from '../../../Services/profile.service';
import { CreateCommentRequest } from '../../../Interfaces/Comment/create-comment-request';
import { CommentResponse } from '../../../Interfaces/Comment/comment-response';
import { EditCommentRequest } from '../../../Interfaces/Comment/edit-comment-request';

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
  @Output() commentSubmitted = new EventEmitter<AggregatedComment>();
  @Output() commentDeleted = new EventEmitter<void>();

  newCommentText: string = '';
  submitting: boolean = false;
  currentUserId: string | null = null;
  currentUserDisplayName: string | null = null;
  currentUserUserName: string | null = null;
  currentUserProfilePictureUrl: string | null = null;
  activeMenuCommentId: string | null = null;
  editingCommentId: string | null = null;
  editedCommentContent: string = '';

  constructor(
    private commentService: CommentService,
    private profileService: ProfileService,
    private cdr: ChangeDetectorRef
  ) {
    if (typeof localStorage !== 'undefined') {
      this.currentUserId = localStorage.getItem('userId');
    }
  }

  toggleMenu(commentId: string) {
    this.activeMenuCommentId = this.activeMenuCommentId === commentId ? null : commentId;
  }

  deleteComment(commentId: string) {
    this.commentService.DeleteComment(commentId).subscribe({
      next: () => {
        this.comments = this.comments.filter(c => c.commentId !== commentId);
        this.commentDeleted.emit(); // Notify parent component
        this.activeMenuCommentId = null;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Failed to delete comment', err)
    });
  }

  startEdit(comment: AggregatedComment) {
    this.editingCommentId = comment.commentId;
    this.editedCommentContent = comment.commentContent;
    this.activeMenuCommentId = null;
  }

  saveEdit(comment: AggregatedComment) {
    if (!this.editedCommentContent.trim()) return;

    const req: EditCommentRequest = {
      CommentId: comment.commentId,
      Content: this.editedCommentContent,
      HasMedia: !!comment.mediaUrl,
      MediaType: 0, // Assuming 0 for now, adjust if needed
    };

    this.commentService.EditComment(req).subscribe({
      next: () => {
        // Update local comment data for immediate UI feedback
        comment.commentContent = this.editedCommentContent;
        comment.isEdited = true;
        this.cancelEdit();
        this.cdr.detectChanges(); // Manually trigger change detection
      },
      error: (err) => console.error('Failed to edit comment', err)
    });
  }

  cancelEdit() {
    this.editingCommentId = null;
    this.editedCommentContent = '';
  }

  reportComment(commentId: string) {
    // Placeholder for report logic
    console.log(`Comment ${commentId} reported.`);
    this.activeMenuCommentId = null;
  }

  onClose() {
    this.close.emit();
  }

  onBackdropClick(event: MouseEvent) {
    this.onClose();
  }

  private mapCommentResponseToAggregated(response: CommentResponse, author: SimpleUserProfile): AggregatedComment {
    return {
      commentId: response.CommentId,
      postId: response.PostId,
      authorId: response.AuthorId,
      commentContent: response.CommentContent,
      mediaUrl: response.MediaUrl,
      createdAt: new Date(response.CreatedAt),
      isEdited: response.IsEdited,
      reactionsCount: response.ReactionsCount,
      isLiked: false,
      
      commentAuthor: author
    };
  }

  onPostComment() {
    if (!this.newCommentText.trim() || !this.postId) return;
    this.submitting = true;
    const commentText = this.newCommentText.trim(); // Store the comment text
    const req: CreateCommentRequest = {
      PostId: this.postId,
      Content: commentText,
      HasMedia: false,
      MediaType: 0,
      Media: undefined
    };
    this.commentService.CreateComment(req).subscribe({
      next: (commentResponse) => {
        if (commentResponse.data && this.currentUserId) {
          this.profileService.GetProfileByUserIdMin(this.currentUserId).subscribe({
            next: (profileResponse) => {
              if (profileResponse.data) {
                const newComment: AggregatedComment = {
                  commentId: commentResponse.data.CommentId,
                  postId: commentResponse.data.PostId,
                  authorId: commentResponse.data.AuthorId,
                  commentContent: commentText,
                  mediaUrl: commentResponse.data.MediaUrl,
                  createdAt: new Date(), // Optimistic update
                  isEdited: commentResponse.data.IsEdited,
                  reactionsCount: commentResponse.data.ReactionsCount,
                  isLiked: false,
                  commentAuthor: profileResponse.data,
                };

                this.comments = [newComment, ...this.comments];
                this.newCommentText = '';
                this.commentSubmitted.emit(newComment);
                this.cdr.detectChanges();
              }
              this.submitting = false;
            },
            error: (profileError) => {
              console.error('Error fetching profile for comment:', profileError);
              this.submitting = false;
            }
          });
        } else {
          this.submitting = false;
        }
      },
      error: (commentError) => {
        console.error('Error posting comment:', commentError);
        this.submitting = false;
      }
    });
  }
}
