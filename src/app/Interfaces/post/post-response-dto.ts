import { MediaDTO } from "./media-dto";

export interface PostResponseDTO {
    AuthorId: string;
    PostId: string;
    PostContent: string;
    Privacy: string; 
    HasMedia: boolean;
    Media: MediaDTO[];
    CreatedAt: Date;
    IsEdited: boolean;
    NumberOfLikes: number;
    NumberOfComments: number;

}
