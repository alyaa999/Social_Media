import { ProfileDTO } from './ProfileDTO';
import { Attachment } from './Attachment';

export interface MessageDTO {
  id: string;
  conversationId: string;
  senderId: string;
  senderProfile: ProfileDTO;
  content: string |null;
  hasAttachment: boolean;
  attachment: Attachment|null;
  read: boolean;
  timeStamp: string;
}