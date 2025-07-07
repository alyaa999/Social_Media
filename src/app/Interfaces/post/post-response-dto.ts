import { MediaDTO } from "./media-dto";

export interface PostResponseDTO {
    authorId: string;
    postId: string;
    postContent: string;
    privacy: string; 
    hasMedia: boolean;
    media: MediaDTO[];
    createdAt: Date;
    isEdited: boolean;
    numberOfLikes: number;
    numberOfComments: number;
}
