export interface CommentResponse {
    CommentId: string;
    PostId: string;
    AuthorId: string;
    CommentContent:string;
    MediaUrl?: string;
    CreatedAt: Date;
    IsEdited: boolean;
    ReactionsCount: number;
}
