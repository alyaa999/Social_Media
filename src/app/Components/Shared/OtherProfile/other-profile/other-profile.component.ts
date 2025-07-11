import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PostService } from '../../../../Services/post.service';
import { ProfileService } from '../../../../Services/profile.service';
import { CommentService } from '../../../../Services/comment.service';
import { ReactionService } from '../../../../Services/reaction.service';
import { FollowService } from '../../../../Services/follow.service';
import { ChatService } from '../../../../Services/chat.service';
import { CommentModalComponent } from '../../../Shared/comment-modal/comment-modal.component';
import { FollowModalComponent } from '../../../Shared/follow-modal/follow-modal.component';
import { MediaType } from '../../../../Interfaces/Chat/MediaType';
import { GetPagedCommentRequest } from '../../../../Interfaces/Comment/get-paged-comment-request';
import { ProfileAggregation } from '../../../../Interfaces/Profile/profile-aggrigation';
import { ConversationDTO } from '../../../../Interfaces/Chat/ConversationDTO';
import { UserConversationsDTO } from '../../../../Interfaces/Chat/UserConversationsDTO';

@Component({
  selector: 'app-other-profile',
  standalone: true,
  imports: [CommonModule, DatePipe, CommentModalComponent, FollowModalComponent, RouterModule],
  templateUrl: './other-profile.component.html',
  styleUrl: './other-profile.component.css'
})
export class OtherProfileComponent {
  profile: any = null;
  posts: any[] = [];
  isLoadingProfile = false;
  isLoadingPosts = false;
  errorProfile: string | null = null;
  errorPosts: string | null = null;
  isCurrentUser = false; // You can update this logic as needed
  MediaType = MediaType; // Expose enum to template

  // Modal state
  showModal: boolean = false;
  modalMode: 'comments' | 'reactions' = 'comments';
  selectedComments: any[] = [];
  selectedReactions: any[] = [];
  modalLoading: boolean = false;
  selectedPostId: string | null = null;

  // Follow state
  isFollowingUser: boolean = false;
  isFollowerUser: boolean = false;
  isFollowLoading: boolean = false;

  // Follow Modal state
  showFollowModal: boolean = false;
  followModalTitle: string = '';
  followModalUsers: ProfileAggregation[] = [];
  isLoadingFollowList: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private profileService: ProfileService,
    private commentService: CommentService,
    private reactionService: ReactionService,
    private followService: FollowService,
    private chatService: ChatService
    
  ) {
    this.route.params.subscribe(params => {
      const otherId = params['otherId'];
      if (otherId) {
        this.loadProfile(otherId);
        this.loadPosts(otherId);
        this.checkFollowStatus(otherId);
      }
    });
  }

  private loadComments(postId: string) {
    this.modalLoading = true;
    const req: GetPagedCommentRequest = {
      PostId: postId,
      Next: ""
    };
    this.commentService.GetCommentList(req).subscribe({
      next: (data) => {
        this.selectedComments = data.data;
        this.modalLoading = false;
      },
      error: (err) => {
        this.modalLoading = false;
        console.error('Error loading comments:', err);
      }
    });
  }

  openCommentsModal(postId: string) {
    this.selectedReactions = [];
    this.selectedComments = [];
    this.selectedPostId = postId;
    this.modalMode = 'comments';
    this.showModal = true;
    this.loadComments(postId);
  }

  onCommentSubmitted(commentText: string) {
    // Find the post and update its comment count
    const post = this.posts.find(p => p.postId === this.selectedPostId);
    if (post) {
      post.numberOfComments = (post.numberOfComments || 0) + 1;
    }
    
    // Reload comments to show the new comment immediately
    if (this.selectedPostId) {
      this.loadComments(this.selectedPostId);
    }
  }

  closeModal() {
    this.showModal = false;
    this.selectedComments = [];
    this.selectedReactions = [];
    this.selectedPostId = null;
    this.modalLoading = false;
  }

  loadProfile(otherId: string) {
    this.isLoadingProfile = true;
    this.errorProfile = null;
    this.profileService.GetProfileByUserId(otherId).subscribe({
      next: (profile) => {
        this.profile = profile;
        this.isLoadingProfile = false;
      },
      error: (err) => {
        this.errorProfile = 'Failed to load profile.';
        this.isLoadingProfile = false;
      }
    });
  }

  loadPosts(otherId: string) {
    this.isLoadingPosts = true;
    this.errorPosts = null;
    this.postService.GetProfilePosts(otherId).subscribe({
      next: (response) => {
        // Assuming response is PaginationResponseWrapper<PostAggregationResponse[]>
        this.posts = response?.data || [];
        console.log('Loaded posts:', this.posts);
        this.isLoadingPosts = false;
      },
      error: (err) => {
        this.errorPosts = 'Failed to load posts.';
        this.isLoadingPosts = false;
      }
    });
  }

  checkFollowStatus(otherId: string) {
    const request = { otherId: otherId };
    
    // Check if current user is following the profile
    this.followService.isFollowing(request).subscribe({
      next: (response) => {
        this.isFollowingUser = response.data;
      },
      error: (error) => {
        console.error('Error checking following status:', error);
      }
    });

    // Check if current user is followed by the profile
    this.followService.isFollower(request).subscribe({
      next: (response) => {
        this.isFollowerUser = response.data;
      },
      error: (error) => {
        console.error('Error checking follower status:', error);
      }
    });
  }

  toggleFollow() {
    if (this.isFollowLoading || !this.profile?.data?.userId) return;
    
    this.isFollowLoading = true;
    const request = { otherId: this.profile.data.userId };

    if (!this.isFollowingUser) {
      // Follow request
      this.followService.follow(request).subscribe({
        next: (response) => {
          if (response.data) {
            this.isFollowingUser = true;
            // Update follower count
            if (this.profile?.data) {
              this.profile.data.noFollowers = (this.profile.data.noFollowers || 0) + 1;
            }
          }
          this.isFollowLoading = false;
        },
        error: (error) => {
          console.error('Error following user:', error);
          this.isFollowLoading = false;
        }
      });
    } else {
      // Unfollow request
      this.followService.unfollow(request).subscribe({
        next: (response) => {
          if (response.data) {
            this.isFollowingUser = false;
            // Update follower count
            if (this.profile?.data) {
              this.profile.data.noFollowers = Math.max(0, (this.profile.data.noFollowers || 1) - 1);
            }
          }
          this.isFollowLoading = false;
        },
        error: (error) => {
          console.error('Error unfollowing user:', error);
          this.isFollowLoading = false;
        }
      });
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
  }

  onImgError(event: Event, fallback: string) {
    const target = event.target as HTMLImageElement | null;
    if (target) {
      target.src = fallback;
    }
  }

  getCoverPhotoAltText(): string {
    return (this.profile?.data?.userName || 'User') + ' cover photo';
  }

  getProfilePictureAltText(): string {
    return (this.profile?.data?.userName || 'User') + ' profile picture';
  }

  getPostImageAltText(post: any): string {
    return 'Image for post by ' + post.postAuthorProfile?.displayName;
  }

  getPostAuthorProfilePictureAltText(post: any): string {
    return post.postAuthorProfile?.displayName + ' profile picture';
  }

  toggleLike(post: any) {
    if (post.isLikeLoading) return; // Prevent double-clicking while loading
    
    // Set loading state
    post.isLikeLoading = true;
    
    if (!post.isLiked) {
      // Optimistic UI update for like
      post.isLiked = true;
      post.numberOfLikes = (post.numberOfLikes || 0) + 1;
      
      // Call API
      this.reactionService.addReaction({ postId: post.postId }).subscribe({
        next: (response) => {
          if (response.statusCode === 200 || response.statusCode === 201) {
            post.isLikeLoading = false;
          } else {
            // Rollback UI if status code indicates failure
            post.isLiked = false;
            post.numberOfLikes = Math.max(0, (post.numberOfLikes || 1) - 1);
            post.isLikeLoading = false;
          }
        },
        error: () => {
          // Rollback UI if error
          post.isLiked = false;
          post.numberOfLikes = Math.max(0, (post.numberOfLikes || 1) - 1);
          post.isLikeLoading = false;
        }
      });
    } else {
      // Optimistic UI update for unlike
      post.isLiked = false;
      post.numberOfLikes = Math.max(0, (post.numberOfLikes || 1) - 1);
      
      // Call API
      this.reactionService.deleteReaction({ postId: post.postId }).subscribe({
        next: (response) => {
          if (response.statusCode === 200 || response.statusCode === 204) {
            post.isLikeLoading = false;
          } else {
            // Rollback UI if status code indicates failure
            post.isLiked = true;
            post.numberOfLikes = (post.numberOfLikes || 0) + 1;
            post.isLikeLoading = false;
          }
        },
        error: () => {
          // Rollback UI if error
          post.isLiked = true;
          post.numberOfLikes = (post.numberOfLikes || 0) + 1;
          post.isLikeLoading = false;
        }
      });
    }
  }

  conversations:UserConversationsDTO={
    conversations:[],
    next:''
  }

  existingConversation:ConversationDTO={
    adminId:'',
    createdAt:"",
    groupImageUrl:"",
    groupName:"",
    id:"",
    isGroup:false,
    messages:[],
    participants:[]
  }

  openChat() {

    

    // const conversationsReq: ConversationsPageRequestDTO = {
    //   next:'',
    //   pageSize:20,
    // };
    // this.chatService.getUserConversations(conversationsReq).subscribe({
    //   next: (response) => {
    //     this.conversations = response;
    //     const otherUserId = this.profile?.data?.userId;
    //     if (otherUserId) {
    //       const existingConversation = this.conversations.conversations.find(c => c.participants.includes(otherUserId));
    //       if (existingConversation && !existingConversation.isGroup) {
    //         this.existingConversation = existingConversation;
    //       } else {
    //         const newConversation: NewConversationDTO = {
    //           participants: [otherUserId],
    //           groupImage:undefined,
    //           isGroup: false,
    //           groupName:null,
    //           userId:''
    //         };
    //         this.chatService.createConversation(newConversation).subscribe({
    //           next: (createdConv) => {
    //             this.existingConversation = createdConv;
    //           },
    //           error: (error) => {
    //             console.error('Error creating conversation:', error);
    //           }
    //         });
    //       }
    //     }
    //   },
    //   error: (error) => {
    //     console.error('Error loading conversations:', error);
    //   }
    // });
  }

  openFollowModal(type: 'followers' | 'following') {
    if (!this.profile?.data?.userId) return;

    this.isLoadingFollowList = true;
    this.showFollowModal = true;
    this.followModalTitle = type === 'followers' ? 'Followers' : 'Following';

    if (type === 'followers') {
      const request = {
        OtherId: this.profile.data.userId,
        next: ''
      };

      this.followService.getFollowers(request, this.profile.data.userId).subscribe({
        next: (response) => {
          this.followModalUsers = response.data;
          this.isLoadingFollowList = false;
        },
        error: (error) => {
          console.error(`Error loading ${type}:`, error);
          this.isLoadingFollowList = false;
        }
      });
    } else {
      const request = {
        OtherId: this.profile.data.userId,
        next: ''
      };

      this.followService.getFollowing(request).subscribe({
        next: (response) => {
          this.followModalUsers = response.data;
          this.isLoadingFollowList = false;
        },
        error: (error) => {
          console.error(`Error loading ${type}:`, error);
          this.isLoadingFollowList = false;
        }
      });
    }
  }

  closeFollowModal() {
    this.showFollowModal = false;
    this.followModalUsers = [];
  }
}
