import { MediaType } from "./MediaType";


export interface NewMessageDTO {
    conversationId: string;
    senderId: string;
    content?: string;
    media?: File; 
    mediaType?: MediaType;
  }