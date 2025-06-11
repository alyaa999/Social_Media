import { MediaType } from "express";
import { Privacy } from "../feed/enums";
import { Media } from "./media";

export interface PostInputDto {
    PostId: string;
    AuthorId: string;
    Content: string;
    Privacy: Privacy;
    MediaType: MediaType; 
    MediaUrls: string[];
    HasMedia: boolean;
    Media: Media[];
}
