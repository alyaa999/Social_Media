import { SimpleUserProfile } from '../Profile/simple-user-profile';

export interface AggregatedComment {
    CommentId: string;
    PostId: string;
    AuthorId: string;
    CommentContent: string;
    MediaUrl?: string;
    CreatedAt: Date;
    IsEdited: boolean;
    ReactionsCount: number;
    IsLiked: boolean;
    CommentAuthor: SimpleUserProfile;
}
