import { MediaItem } from "./media-item";
import { Privacy } from "./enums";
import { AuthorProfile } from "./author";

export interface Post {
    postId: string;
    content: string;
    mediaList: MediaItem[];
    reactsCount: number;
    commentsCount: number;
    isEdited: boolean;
    isLiked: boolean;
    createdAt: Date;
    authorProfile: AuthorProfile;
    privacy: Privacy;
}