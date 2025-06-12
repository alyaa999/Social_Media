import { ReactionType } from "../ReactionType";

export interface CreatePostReactionRequest {
    postId: string;
    reactionType: ReactionType;
  }