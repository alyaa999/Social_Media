import { MediaType } from "./media-enum-type";

export interface EditCommentRequest {
    CommentId: string;
    Content: string;
    Media?: File;
    MediaUrl?: string;
    UserId?: string;
    HasMedia: boolean;
    MediaType: MediaType;
}
