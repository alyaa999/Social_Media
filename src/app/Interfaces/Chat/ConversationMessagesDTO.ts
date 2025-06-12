import { MessageDTO } from "./MessageDTO";


export interface ConversationMessagesDTO {
  conversationId: string;
  messages: MessageDTO[];
  next: string|null;
}
