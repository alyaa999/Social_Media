import { MediaItem } from "./media-item";
import { AuthorProfile } from "./author";
import { Privacy } from "./enums";

export interface Post {
    postId: string;
    content: string;
    mediaList: MediaItem[];
    reactsCount: number;
    commentsCount: number;
    isEdited: boolean;
    isLiked: boolean;
    createdAt: string;
    authorProfile: AuthorProfile;
    privacy: Privacy;
}