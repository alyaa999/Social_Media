import { MediaItem } from "./media-item";
import { AuthorProfile } from "./author";
import { Privacy, MediaType } from "./enums";

export interface Post {
    postId: string;
    content: string;
    mediaList: MediaItem[];
    reactsCount: number;
    commentsCount: number;
    isEdited: boolean;
    isLiked: boolean;
    isLikeLoading?: boolean;
    createdAt: Date;
    authorProfile: AuthorProfile;
    privacy: Privacy;
}