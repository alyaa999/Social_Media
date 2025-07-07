import { PostResponseDTO } from "./post-response-dto";
import { SimpleUserProfile } from "./simple-user-profile";

export interface PostAggregationResponse extends PostResponseDTO {
    isLiked: boolean;
    postAuthorProfile: SimpleUserProfile;
}