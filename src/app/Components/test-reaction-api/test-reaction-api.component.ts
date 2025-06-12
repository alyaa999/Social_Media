// import { Component } from '@angular/core';
// import { ReactionCommentService } from '../../Services/reaction.service';


// @Component({
//   selector: 'app-test-reaction',
//   templateUrl: './test-reaction.component.html',
// })
// export class TestReactionComponent {
//   userId = 'test-user-id'; // Replace or make it dynamic if needed

//   constructor(private reactionService: ReactionCommentService) {}

//   addCommentReaction() {
//     const request: CreateCommentReactionRequest = {
//       commentId: 'comment123',
//       reactionType: 0, // Assuming 0 = Like, adjust to your enum
//     };

//     this.reactionService.addReaction(request, this.userId).subscribe({
//       next: res => console.log('Add Comment Reaction Success:', res),
//       error: err => console.error('Error:', err),
//     });
//   }

//   deleteCommentReaction() {
//     const request: DeleteCommentReactionRequest = {
//       commentId: 'comment123',
//     };

//     this.reactionService.deleteReaction(request, this.userId).subscribe({
//       next: res => console.log('Delete Comment Reaction Success:', res),
//       error: err => console.error('Error:', err),
//     });
//   }

//   addPostReaction() {
//     const request: CreatePostReactionRequest = {
//       postId: 'post123',
//       reactionType: 0,
//     };

//     this.reactionService.addReactionComment(request, this.userId).subscribe({
//       next: res => console.log('Add Post Reaction Success:', res),
//       error: err => console.error('Error:', err),
//     });
//   }

//   deletePostReaction() {
//     const request: DeletePostReactionRequest = {
//       postId: 'post123',
//     };

//     this.reactionService.deleteReactionComment(request, this.userId).subscribe({
//       next: res => console.log('Delete Post Reaction Success:', res),
//       error: err => console.error('Error:', err),
//     });
//   }
// }
