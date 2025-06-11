import { MediaType } from "./enums";

export interface MediaItem {
    type: MediaType;
    url: string;
    thumbnailUrl?: string; // Optional, as not all media may have a thumbnail
}