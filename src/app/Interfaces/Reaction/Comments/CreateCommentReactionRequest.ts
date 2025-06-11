import { ReactionType } from "../ReactionType";

export interface CreateCommentReactionRequest {
    commentId: string;
    reactionType: ReactionType;
  }