import { ProfileDTO } from './ProfileDTO';
import { Attachment } from './Attachment';

export interface MessageDTO {
  id: string;
  conversationId: string;
  senderId: string;
  senderProfile: ProfileDTO;
  content?: string;
  hasAttachment: boolean;
  attachment?: Attachment;
  read: boolean;
}
