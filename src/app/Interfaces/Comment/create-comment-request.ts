import { MediaType } from "./media-enum-type";

export interface CreateCommentRequest {
    PostId: string;
    Content: string;
    Media?: File;
    UserId?: string;
    HasMedia: boolean;
    MediaType: MediaType;
}
