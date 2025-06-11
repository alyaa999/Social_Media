import { ConversationDTO } from "./ConversationDTO";

export interface UserConversationsDTO {
  conversations: ConversationDTO[];
  next?: string;
}
