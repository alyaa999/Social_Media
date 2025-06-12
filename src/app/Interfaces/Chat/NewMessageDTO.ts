import { MediaType } from "./MediaType";


export interface NewMessageDTO {
    conversationId: string;
    senderId: string;
    content?: string |null;
    media: File|null; 
    mediaType: MediaType|null;
  }